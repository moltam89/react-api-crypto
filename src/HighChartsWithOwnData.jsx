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

let amount = 10000;
let bases = [];

export default function HighChartsWithOwnData({interval, tokens, polygon = true, mainnet = true, percentage = false, toFixed = 2}) {
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
      },
      {
        data: []
      },
      {
        data: []
      },
      {
        data: []
      },
      {
        data: []
      }
     ]
  });

  

  useEffect(async() => {
    let series = options.series;
    let date = new Date();
    
    tokens.forEach(async token => {
      let responseMainnet;
      let responsePolygon;

      try {
        if (mainnet) {
          responseMainnet = await nullaX_Mainnet.getQuote("USDC", token, amount, undefined, undefined, MY_TEST_ADDRESS, true);
        }
        
        if (polygon) {
          responsePolygon = await nullaX_Polygon.getQuote("USDC", token, amount, undefined, undefined, MY_TEST_ADDRESS, true);    
        }
      }
      catch (error) {
        //console.log("Coudn't fetch price", error)
        return;
      }
      
      let responses = [];
      if (responseMainnet) {
        responses.push(responseMainnet);
      }
      if (responsePolygon) {
        responses.push(responsePolygon);
      }

      responses.forEach(response => {
        let seriesIndex = tokens.indexOf(token) * 2 + responses.indexOf(response);

        let data = options.series[seriesIndex]?.data;

        let price = Number(response.parsedResponse.price.toFixed(toFixed))
        if (percentage) {
          if (bases[seriesIndex] === undefined) {
            bases[seriesIndex] = price;
            price = 1;
          }
          else {
            price = price / bases[seriesIndex];
          }
        }

        data.push([date.toISOString(), price]);    

        series[seriesIndex].data = data;

        let chain = "Mainnet";
        if (responses.indexOf(response) == 1) {
          chain = "Polygon";
        }
        series[seriesIndex].name = chain + token;

        
      })      
    })

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