import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

export const getCoinGeckoMarketData = async () => {
	// ?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
	const params = {};
	params.vs_currency = "usd";
	params.order = "market_cap_desc";
	params.per_page = "100";
	params.page = "1";
	params.sparkline = "false";

	return await CoinGeckoClient.coins.markets(params);

}