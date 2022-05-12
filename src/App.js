import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Table from  './Table';
import RechartsDemo from  './RechartsDemo';
import HighChartsDemo from  './HighChartsDemo';
import HighChartsWithOwnData from  './HighChartsWithOwnData';

const COIN_IDS = ["bitcoin","ethereum","tether","binancecoin","usd-coin","ripple","solana","cardano","binance-usd","dogecoin","polkadot","avalanche-2","staked-ether","wrapped-bitcoin","shiba-inu","terrausd","tron","dai","near","matic-network","crypto-com-chain","litecoin","leo-token","bitcoin-cash","ftx-token","chainlink","okb","cosmos","algorand","stellar","ethereum-classic","monero","uniswap","vechain","frax","elrond-erd-2","hedera-hashgraph","internet-computer","apecoin","filecoin","terra-luna","compound-ether","the-sandbox","theta-fuel","magic-internet-money","tezos","defichain","axie-infinity","eos","theta-token","the-graph","decentraland","pancakeswap-token","flow","maker","aave","chain-2","compound-usd-coin","kucoin-shares","bittorrent","true-usd","klay-token","huobi-token","thorchain","huobi-btc","bitcoin-cash-sv","convex-finance","fantom","zcash","helium","ecash","waves","iota","cdai","radix","paxos-standard","neo","zilliqa","stepn","quant-network","arweave","celo","nexo","frax-share","gatechain-token","neutrino","bitdao","kusama","dash","compound-usdt","curve-dao-token","gala","enjincoin","osmosis","chiliz","maiar-dex","basic-attention-token","harmony","havven","xdce-crowd-sale"];

function App() {
  const getRoute =  (coinId) => {
    return (
       <Route key={coinId} path={"/coins/" + coinId} element={<HighChartsDemo coinIds={[coinId]}/>}/>
    );
  }

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table/>}/>
          <Route path="/test" element={<RechartsDemo/>}/>

          {COIN_IDS.map(coinId => {
              return getRoute(coinId);
            })
          }
          
          <Route exact path="/HighCharts" element={
            <>
              
              <HighChartsDemo percentage={true} coinIds={["musd","dai", "tether", "usd-coin", "bitcoin", "ethereum", "binancecoin", "matic-network", "monero", "tezos", "tezos", "solana", "ripple", "terra-luna", "dogecoin", "apecoin", "thorchain"]}/>
              <HighChartsDemo percentage={true} coinIds={["bitcoin"]}/>

              <HighChartsWithOwnData interval={5000} tokens={["WBTC", "renBTC", "sBTC"]} polygon={false}/>
            </>}
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
  