import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Table from  './Table';
import RechartsDemo from  './RechartsDemo';
import HighChartsDemo from  './HighChartsDemo';

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
              <HighChartsDemo coinIds={["bitcoin", "ethereum"]}/>
              
  
              <HighChartsDemo coinIds={["dai", "tether", "usd-coin"]}/>
            </>}
            />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
  