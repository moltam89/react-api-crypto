import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Table from  './Table';
import RechartsDemo from  './RechartsDemo';
import HighChartsDemo from  './HighChartsDemo';
import HighChartsWithOwnData from  './HighChartsWithOwnData';

/*<HighChartsDemo coinIds={["bitcoin"]}/>
              <HighChartsDemo coinIds={["ethereum"]}/>
              <HighChartsDemo coinIds={["matic-network"]}/>

              <HighChartsDemo coinIds={["bitcoin"]}/>
              <HighChartsDemo coinIds={["ethereum"]}/>
              <HighChartsDemo coinIds={["binancecoin"]}/>
              <HighChartsDemo coinIds={["solana"]}/>
              <HighChartsDemo coinIds={["ripple"]}/>
              <HighChartsDemo coinIds={["terra-luna"]}/>
              <HighChartsDemo coinIds={["cardano"]}/>
              <HighChartsDemo coinIds={["avalanche-2"]}/>
              <HighChartsDemo coinIds={["polkadot"]}/>
              <HighChartsDemo coinIds={["dogecoin"]}/>
              <HighChartsDemo coinIds={["shiba-inu"]}/>
              <HighChartsDemo coinIds={["cosmos"]}/>
              <HighChartsDemo coinIds={["chainlink"]}/>
              <HighChartsDemo coinIds={["uniswap"]}/>
              <HighChartsDemo coinIds={["vechain"]}/>
              <HighChartsDemo coinIds={["monero"]}/>
              <HighChartsDemo coinIds={["internet-computer"]}/>
              <HighChartsDemo coinIds={["fantom"]}/>
              <HighChartsDemo coinIds={["apecoin"]}/>
              <HighChartsDemo coinIds={["tezos"]}/>
              <HighChartsDemo coinIds={["thorchain"]}/>

              <HighChartsDemo coinIds={["musd", "dai", "tether", "usd-coin"]}/>
              <HighChartsDemo coinIds={["musd","dai", "tether", "usd-coin", "bitcoin", "ethereum", "binancecoin", "matic-network", "monero", "tezos", "tezos", , "solana", "ripple", "terra-luna", "dogecoin", "apecoin", "thorchain"]}/>
              <HighChartsDemo coinIds={["dai", "bitcoin", "ethereum", "binancecoin", "matic-network", "monero", "tezos", "tezos", "solana", "ripple", "terra-luna", "dogecoin", "thorchain"]}/>


     */
              

function App() {


  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Table/>}/>
          <Route path="/test" element={<RechartsDemo/>}/>
          
          <Route exact path="/HighCharts" element={
            <>
              <HighChartsWithOwnData interval={2000}/>
              
  
              
            </>}
            />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
  