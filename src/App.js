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

              <HighChartsDemo coinIds={["bitcoin", "binance-bitcoin", "wrapped-bitcoin", "renbtc", "sbtc"]}/>
              

              <HighChartsDemo coinIds={["bitcoin", "ethereum"]}/>
              <HighChartsDemo coinIds={["musd","dai", "tether", "usd-coin", "bitcoin", "ethereum", "binancecoin", "matic-network", "monero", "tezos", "tezos", "solana", "ripple", "terra-luna", "dogecoin", "apecoin", "thorchain"]}/>

              <HighChartsDemo coinIds={["bitcoin", "binance-bitcoin", "wrapped-bitcoin", "renbtc", "sbtc"]}/>
              <HighChartsWithOwnData interval={60000} tokens={["WBTC", "renBTC", "sBTC"]} polygon={false}/>
              <HighChartsWithOwnData interval={10000} tokens={["DAI", "USDC", "USDT"]} polygon={true} toFixed={6}/>
              <HighChartsDemo coinIds={["musd", "dai", "tether", "usd-coin"]}/>

  <Route path="/coins/bitcoin" element={<HighChartsDemo coinIds={["bitcoin"]}/>}/>
     */
       
const COIN_IDS = ["bitcoin","ethereum","tether","binancecoin","usd-coin","ripple","solana","cardano","binance-usd","dogecoin","polkadot","avalanche-2","staked-ether","wrapped-bitcoin","shiba-inu","terrausd","tron","dai","near","matic-network","crypto-com-chain","litecoin","leo-token","bitcoin-cash","ftx-token","chainlink","okb","cosmos","algorand","stellar","ethereum-classic","monero","uniswap","vechain","frax","elrond-erd-2","hedera-hashgraph","internet-computer","apecoin","filecoin","terra-luna","compound-ether","the-sandbox","theta-fuel","magic-internet-money","tezos","defichain","axie-infinity","eos","theta-token","the-graph","decentraland","pancakeswap-token","flow","maker","aave","chain-2","compound-usd-coin","kucoin-shares","bittorrent","true-usd","klay-token","huobi-token","thorchain","huobi-btc","bitcoin-cash-sv","convex-finance","fantom","zcash","helium","ecash","waves","iota","cdai","radix","paxos-standard","neo","zilliqa","stepn","quant-network","arweave","celo","nexo","frax-share","gatechain-token","neutrino","bitdao","kusama","dash","compound-usdt","curve-dao-token","gala","enjincoin","osmosis","chiliz","maiar-dex","basic-attention-token","harmony","havven","xdce-crowd-sale"];

function App() {
  const getRoute =  (coinId) => {
    return (
       <Route path={"/coins/" + coinId} element={<HighChartsDemo coinIds={[coinId]}/>}/>
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
  