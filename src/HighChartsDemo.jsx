import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { format, parseISO, subDays } from "date-fns";
import {fetchMarketChartRange} from  './CoinGeckoApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function HighChartsDemo() {
  const [coinGeckoData, setCoinGeckoData] = useState([]);
  const [coinId, setCoinId] = useState("ethereum");
  const [queryNumberOfDays, setQueryNumberOfDays] = useState(100);
  const [displayNumberOfDays, setDisplayNumberOfDays] = useState(7);
  // prices, market_caps, total_volumes
  const [displayStyle, setDisplayStyle] = useState("prices");

  const [options, setOptions] = useState({
    chart: {
      type: 'spline'
    },
    title: {
      text: coinId
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  });

  useEffect(async() => {
    const params = {};
    params.vs_currency = "usd";
    
    params.from = getUnixTimeStampFromDate(getPastDate(queryNumberOfDays));
    params.to = getUnixTimeStampFromDate(new Date());

    let response = await fetchMarketChartRange(coinId, params);
    let responseArray = response.data[displayStyle];

    let dataArray = [];

    responseArray.slice(queryNumberOfDays - displayNumberOfDays).forEach(element => {
      let date = getDateFromTimeStamp(element[0]);
      let price = element[1];

      dataArray.push(
        [date.toISOString().substr(0, 10), Math.floor(price)]
       );
    });

    setOptions({ 
      series: [
          { data: dataArray}
        ]
    })

    setCoinGeckoData(dataArray);
  }, [coinId, queryNumberOfDays, displayNumberOfDays]);

  return (
    <div>
      HighChartsDemo
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}


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