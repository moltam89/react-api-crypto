import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { format, parseISO, subDays } from "date-fns";
import {fetchMarketChartRange, coinsAll} from  './CoinGeckoApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { InputNumber } from 'antd';
const axios = require("axios");
const { BigNumber, ethers, utils, Wallet } = require("ethers");
const { ALCHEMY, MY_ADDRESS, MY_TEST_ADDRESS, getTokenAddress, CHAIN_ID_POLYGON, CHAIN_ID_MAINNET} = require('./constants');

const {NullaX} = require('./NullaX');

const nullaX_Mainnet = new NullaX(CHAIN_ID_MAINNET);
const nullaX_Polygon = new NullaX(CHAIN_ID_POLYGON);


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
      },
      {
        data: []
      }
    ]
  });

  useEffect(async() => {
    let amount = 10000;
    let responseMainnet = await nullaX_Mainnet.getQuote("USDC", "WBTC", amount, undefined, undefined, MY_TEST_ADDRESS, true);
    let responsePolygon = await nullaX_Polygon.getQuote("USDC", "WBTC", amount, undefined, undefined, MY_TEST_ADDRESS, true);
    
    let data = options.series[0].data;
    let price = Number(responseMainnet.parsedResponse.price.toFixed(2))

    console.log(price);

    data.push(price);

    let series = options.series;
    series[0].data = data;
    series[0].name = "Mainnet WBTC";

    let data1 = options.series[1].data;
    let price1 = Number(responsePolygon.parsedResponse.price.toFixed(2))

    console.log(price1);


    data1.push(price1);

    series[1].data = data1;
    series[1].name = "Polygon WBTC";

    console.log("series[0]", series[0]);


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