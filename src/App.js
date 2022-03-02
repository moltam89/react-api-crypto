import './App.css';
import axios from  'axios';
import React, {useState, useEffect} from 'react';

let COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";


function App() {

  const [coins, setCoins] = useState([])

  useEffect(() => {
    axios.get(COINGECKO_API_URL)
      .then(res => {
        setCoins(res.data);
    })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>API</h1>

    </div>
  );
}

export default App;
