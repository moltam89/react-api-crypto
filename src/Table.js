import './App.css';
import React, {useState, useEffect} from 'react';
import Coin from  './Coin';
import {getCoinGeckoMarketData} from  './CoinGeckoApi';

function Table() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(async() => {    

    const params = {};
    params.vs_currency = "usd";
    params.order = "market_cap_desc";
    params.per_page = "100";
    params.page = "1";
    params.sparkline = "false";

    let response = await getCoinGeckoMarketData(params);
    setCoins(response.data);

    /*
    console.log(response.data);

    let coinIds = [];
    response.data.forEach(coin => {
      console.log(coin.id)
      coinIds.push(coin.id);
    })
    console.log(coinIds)
    */
    
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(
    coin => coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>

        </form>
      </div>

    {filteredCoins.map(
      coin => {
        return (
          <Coin 
          key={coin.id}
          id={coin.id}
          name={coin.name} 
          img={coin.image} 
          symbol={coin.symbol} 
          volume={coin.total_volume} 
          price={coin.current_price} 
          priceChange={coin.price_change_percentage_24h} 
          marketCap={coin.market_cap} 
          />
        )
      })
    }


    </div>
  );
}

export default Table;
