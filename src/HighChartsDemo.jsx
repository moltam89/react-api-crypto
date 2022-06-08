import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { format, parseISO, subDays } from "date-fns";
import {fetchMarketChartRange, coinsAll} from  './CoinGeckoApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { InputNumber } from 'antd';

import {
  useParams
} from "react-router-dom";

const HighChartsDemo = ({coinIds, percentage = false}) => {
  let { coinId } = useParams();

  useEffect(() => {
    if (coinIds) {
      setDisplayedCoinIds(coinIds);
    }
    else {
     setDisplayedCoinIds([coinId]); 
    }

  }, [coinIds, coinId]);

  const [displayedCoinIds, setDisplayedCoinIds] = useState([]);

  //console.log("displayedCoinIds", displayedCoinIds ? displayedCoinIds : "");

  const [coinGeckoData, setCoinGeckoData] = useState([]);
  const [queryNumberOfDays, setQueryNumberOfDays] = useState(1);
  
  const getPastDate = (pastDays) => {
	  let date = new Date();

	  date.setDate(date.getDate() - pastDays);

	  return date;
  }

	const getUnixTimeStampFromDate = (date) => {
	  return Math.floor((date.getTime() / 1000));
	}

	const getDateFromTimeStamp = (timeStamp) => {
	  return new Date(timeStamp);
	}
	  
  const queryNumberOfDaysOnChange = (value) => {
    if (value > 0) {
      setQueryNumberOfDays(value);  
    }
  }

  const [to, setTo] = useState(getUnixTimeStampFromDate(new Date()));
  const toOnchange = (value) => {
    if (value > 0) {
      setTo(value);  
    }
  }

  const [displayStyle, setDisplayStyle] = useState("prices");

  const [options, setOptions] = useState(
      {
    	  series: [],
        chart: {
          type: 'spline'
        },
        plotOptions: {
          series: {
              compare: 'percent',
              showInNavigator: true
          },
        },
        title: {
          text: displayedCoinIds
        },
      	xAxis: {
            type: 'datetime',
      	   labels: {
              format: '{value:%Y-%m-%d <br/> %l:%M}',
            }
          }
      }
    );

  useEffect(async() => {
    const params = {};
    params.vs_currency = "usd";
    
    if (queryNumberOfDays > 100000) {
      params.from = queryNumberOfDays;
    }
    else {
      params.from = getUnixTimeStampFromDate(getPastDate(queryNumberOfDays));  
    }

    params.to = to;

    let series = [];

    for (let i = 0; i < displayedCoinIds.length; i++) {
      let response = await fetchMarketChartRange(displayedCoinIds[i], params);
      let responseArray = response.data[displayStyle];

      let dataArray = [];

      let base = undefined;

      responseArray.forEach(element => {
        let date = element[0];
        let price = element[1];

        if (!base) {
          base = price;
        }

        if (price > 1000) {
          price = Math.floor(price);
        }
        
        if (percentage) {
          price = price / base
        }

        dataArray.push(
          [date, price]
         );
      });

      series.push({name: displayedCoinIds[i], data: dataArray});
    }

    setOptions({
      ...options, 
      series: series,
      title: {
        text: displayedCoinIds
      },
    });

  }, [displayedCoinIds, queryNumberOfDays, to]);

  return (
    <div>
      HighChartsDemo
      <HighchartsReact highcharts={Highcharts}  options={options} />
      <InputNumber placeholder="from"defaultValue={1} onChange={queryNumberOfDaysOnChange} />
      <InputNumber placeholder="to"  onChange={toOnchange} />
    </div>
  );
}

export default HighChartsDemo;