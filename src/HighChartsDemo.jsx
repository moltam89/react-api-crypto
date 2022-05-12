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

const HighChartsDemo = ({coinIds, displayNumberOfDays = 0, percentage = false}) => {
  let { id } = useParams();

  if (!coinIds) {
    coinIds = [id];
  }

  console.log("coinIds", coinIds);

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

  const [options, setOptions] = useState({
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
      text: coinIds
    },
  	xAxis: {
        type: 'datetime',
  	   labels: {
          format: '{value:%Y-%m-%d <br/> %l:%M}',
        }
      }
  });

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

    for (let i = 0; i < coinIds.length; i++) {
      let response = await fetchMarketChartRange(coinIds[i], params);
      let responseArray = response.data[displayStyle];

      let dataArray = [];

      if (displayNumberOfDays > 0) {
        responseArray = responseArray.slice(queryNumberOfDays - displayNumberOfDays);
      }

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

      series.push({name: coinIds[i], data: dataArray});
    }

    setOptions({
      ...options, 
      series: series
    });

  }, [coinIds, queryNumberOfDays, displayNumberOfDays, to]);

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