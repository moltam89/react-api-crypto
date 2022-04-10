import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { format, parseISO, subDays } from "date-fns";
import {fetchMarketChartRange, coinsAll} from  './CoinGeckoApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { InputNumber } from 'antd';



export default function HighChartsWithOwnData({interval}) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(Date.now()), interval);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [options, setOptions] = useState({
    chart: {
      type: 'spline'
    },
    plotOptions: {
      series: {
          compare: 'percent',
          showInNavigator: true
      }
    },
    title: {
      text: "coinIds"
    },
    series: [
      {
        data: []
      }
    ]
  });

  useEffect(async() => {
    let data = options.series[0].data;
    console.log(data);

    data.push(getRandomInt(10));

    let series = options.series;
    series[0].data = data;


    setOptions({
      ...options, 
      series: series
    });



  }, [time]);

  return (
    <div>
      
      <HighchartsReact highcharts={Highcharts}  options={options} />
    
    </div>
  );
}


const getRandomInt = max => {
  return Math.floor(Math.random() * max);
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