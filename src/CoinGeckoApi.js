import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

export const getCoinGeckoMarketData = async (params) => {
	return await CoinGeckoClient.coins.markets(params);
}