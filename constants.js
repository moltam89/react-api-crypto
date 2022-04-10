const ALCHEMY = "https://polygon-mainnet.g.alchemy.com/v2/mr6F4rbVud_UtuyXkvTtHi7H7XzN76P6";
const GAS_API_URL = "https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata";

const DAI_POLYGON = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";
const USDC_POLYGON = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const USDT_POLYGON = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";

const DAI_MAINNET = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDC_MAINNET = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDT_MAINNET = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const MY_ADDRESS = "0xC891db965E43C4fbfccc9e7Ef3546AB692C4053F";
const MY_TEST_ADDRESS = "0x8c9d11ce64289701efeb6a68c16e849e9a2e781d";

const CHAIN_ID_POLYGON = "137";
const CHAIN_ID_MAINNET = "1";

const TOKEN_MAP_POLYGON = new Map([
  ['DAI', {address:DAI_POLYGON, decimals:18}],
  ['USDC', {address:USDC_POLYGON, decimals:6}],
  ['USDT', {address:USDT_POLYGON, decimals:6}]
]);

const TOKEN_MAP_MAINNET = new Map([
  ['DAI', {address:DAI_MAINNET, decimals:18}],
  ['USDC', {address:USDC_MAINNET, decimals:6}],
  ['USDT', {address:USDT_MAINNET, decimals:6}]
]);

const getTokenAddress = (symbol, chainId) => {
  return getTokenData(symbol, chainId, "address");
}

const getTokenDecimals = (symbol, chainId) => {
  return getTokenData(symbol, chainId, "decimals");
}

const getTokenData = (symbol, chainId, data) => {
  let map = new Map();

  if (chainId == CHAIN_ID_MAINNET) {
    map = TOKEN_MAP_MAINNET
  }
  if (chainId == CHAIN_ID_POLYGON) {
    map = TOKEN_MAP_POLYGON
  }

  return map.get(symbol)[data];
}


module.exports = {
  ALCHEMY,
  GAS_API_URL,
  DAI_POLYGON,
  USDC_POLYGON,
  USDT_POLYGON,
  DAI_MAINNET,
  USDC_MAINNET,
  USDT_MAINNET,
  MY_ADDRESS,
  MY_TEST_ADDRESS,
  getTokenAddress,
  getTokenDecimals,
  CHAIN_ID_POLYGON,
  CHAIN_ID_MAINNET
}