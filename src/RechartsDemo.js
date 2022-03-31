import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import React, {useState, useEffect} from 'react';

import {fetchMarketChartRange} from  './CoinGeckoApi';

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random(),
  });
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


export default function RechartsDemo() {

  const [coinGeckoData, setCoinGeckoData] = useState([]);
  const [coinId, setCoinId] = useState("bitcoin");
  const [queryNumberOfDays, setQueryNumberOfDays] = useState(100);
  const [displayNumberOfDays, setDisplayNumberOfDays] = useState(7);


  useEffect(async() => {
    const params = {};
    params.vs_currency = "usd";
    
    params.from = getUnixTimeStampFromDate(getPastDate(queryNumberOfDays));
    params.to = getUnixTimeStampFromDate(new Date());


    let response = await fetchMarketChartRange(coinId, params);
    //setCoins(response.data);
    console.log(response.data.prices);

    let pricesArray = response.data.prices;

    let dataArray = [];

    pricesArray.slice(queryNumberOfDays - displayNumberOfDays).forEach(element => {
      let date = getDateFromTimeStamp(element[0]);
      let price = element[1];

      dataArray.push({
        date: date.toISOString().substr(0, 10),
        value: Math.floor(price),
      });

      //console.log(time, date, price);
    });

    console.log("dataArray", dataArray)

    setCoinGeckoData(dataArray);
  }, [coinId, queryNumberOfDays, displayNumberOfDays]);

  console.log("coinGeckoData", coinGeckoData)


  
  return (
    <ResponsiveContainer width="100%" height={400}>
      
      <AreaChart data={coinGeckoData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
      </div>
    );
  }
  return null;
}
