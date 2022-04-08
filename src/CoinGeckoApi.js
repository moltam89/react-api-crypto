import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

export const getCoinGeckoMarketData = async (params) => {
	return await CoinGeckoClient.coins.markets(params);
}

export const fetchMarketChartRange = async (coinId, params) => {
	return await CoinGeckoClient.coins.fetchMarketChartRange(coinId, params);
}

export const coinsAll = async () => {
	return await CoinGeckoClient.coins.all();
}