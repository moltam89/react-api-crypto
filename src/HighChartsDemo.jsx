import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { format, parseISO, subDays } from "date-fns";
import {fetchMarketChartRange, coinsAll} from  './CoinGeckoApi';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, InputNumber } from 'antd';

import {
  useParams
} from "react-router-dom";

const HighChartsDemo = ({coinIds, percentage = false, days = [1, 7, 14, 30, 180, 365]}) => {
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
  console.log("displayStyle", displayStyle);

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
      console.log("response", response);
      console.log("displayStyle", displayStyle);
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

  }, [displayedCoinIds, queryNumberOfDays, to, displayStyle]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="row no-gutters md:tw-mt-6">
    <div className="col-lg-8 pr-md-3">
      <h1 className="tw-flex dark:tw-text-white tw-items-center tw-mt-4 tw-mb-2 tw-text-lg md:tw-text-2xl tw-font-bold dark:tw-text-white dark:tw-text-opacity-87">
      {capitalizeFirstLetter(coinId)} Price Chart (BTC/<span data-target="currency.currencyCode">USD</span>)
      </h1>

      <p className="tw-text-sm tw-text-gray-500 tw-mt-1 dark:tw-text-gray-400">
        Last updated 09 June 2022, 08:01AM UTC. Currency in <span data-target="currency.currencyCode">USD</span>.
      </p>
    
      <div className="filter-chart tw-flex tw-flex-wrap flex-column flex-md-row tw-justify-center justify-content-md-between" data-target="price-chart.filterChart">
        <div className="tw-flex left-0 tw-mb-2">
          <div className="tw-relative tw-z-0 tw-inline-flex tw-shadow-sm tw-rounded-md chart-selector" data-target="price-chart.chartMode">
            <button onClick={() => setDisplayStyle("prices")} type="button" className="tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 active" data-action="click->price-chart#updateChart" data-action-type="type-price">
            Price
            </button>
            <button onClick={() => setDisplayStyle("market_caps")} type="button" className="tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10" data-target="price-chart.marketCapButton" data-action="click->price-chart#updateChart" data-action-type="type-market-cap">
            Market Cap
            </button>
            <button onClick={() => setDisplayStyle("total_volumes")} type="button" className="tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-r-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10" id="chart-toggle-trading-view" data-action="click->price-chart#updateChart" data-action-type="type-trading-view">
            Total volumes
            </button>
          </div>
        </div>

        <div className="tw-h-8 tw-mb-2 md:tw-mb-0 tw-relative tw-z-0 tw-inline-flex tw-shadow-sm tw-rounded-md chart-selector left-0" data-target="price-chart.toolbar">

            {days.map(
              (day, index) => {
                let cssClass;
                
                if(index == 0) {
                  cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
                } else if(index == days.length-1) {
                  cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-r-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white graph-stats-btn";
                } else {
                  cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
                }

                let title = day + "d";
                if (day == 1) {
                  title = "24h"
                } else if (day == 365) {
                  title = "1y"
                }

                return (
                  <a 
                    key={title}
                    className={cssClass}
                    href="#"
                    onClick={() => setQueryNumberOfDays(day)}
                    >
                      {title}
                    </a>
                )
              })
            }
        </div>
      </div>
      <div className="filter-chart tw-flex tw-justify-between md:tw-justify-end">
        <div className="tailwind-reset tw-relative tw-z-0 tw-inline-flex tw-shadow-sm tw-rounded-md chart-selector tw-mb-2" data-target="price-chart.chartModeButtonGroup">
          <button type="button" className="tw-bg-white dark:tw-bg-white hover:tw-bg-gray-50 dark:tw-bg-opacity-5 dark:tw-text-white dark:hover:tw-bg-opacity-10 tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 active">
            <i className="fas fa-chart-line"></i>
          </button>
          <button type="button" className="btn btn-icon shadow-none tw-bg-white dark:tw-bg-white hover:tw-bg-gray-50 dark:tw-bg-opacity-5 dark:hover:tw-bg-opacity-10 tw-rounded-md tw-rounded-l-none md:tw-rounded-none tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 dark:tw-border-opacity-10 center tw-w-11 dark:focus:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:focus:tw-bg-opacity-10">
            <i className="fas fa-chart-line"></i>
          </button>
          <a className="tw-hidden d-md-inline-block tw-bg-white hover:tw-bg-gray-50 dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-r-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 hover:tw-bg-gray-50 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white coingecko tw-px-2 tw-pt-1.5" 
              data-target="currency.currencyLink" href="https://www.coingecko.com/en/coins/bitcoin/usd#panel">
            <i className="far fa-expand-arrows"></i>
          </a>
          </div>
      </div>

      <HighchartsReact highcharts={Highcharts}  options={options} />
      <InputNumber placeholder="from"defaultValue={1} onChange={queryNumberOfDaysOnChange} />
      <InputNumber placeholder="to"  onChange={toOnchange} />
    </div>
    </div>
  );
}

export default HighChartsDemo;