const { utils } = require("ethers");

const axios = require("axios"); 

const API_URL_POLYGON = "https://polygon.api.0x.org/"
const API_URL_MAINNET = "https://api.0x.org/"
const API_URL_QUUTE = "swap/v1/quote/"

const NULLA_X_CONTRACT_ADDRESS = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

const { DAI, USDC, USDT, DAI_MAINNNET, USDC_MAINNNET, USDT_MAINNNET, CHAIN_ID_MAINNET, CHAIN_ID_POLYGON, getTokenAddress, getTokenDecimals} = require('./constants');



class NullaX {
	constructor(chainId) {
		this.chainId = chainId;

		this.apiURL = API_URL_MAINNET;

		if (this.chainId == CHAIN_ID_POLYGON) {
			this.apiURL = API_URL_POLYGON;
		}
	}

	async getQuote(sellTokenSymbol, buyTokenSymbol, sellAmount, buyAmount, profitQueryRatioBigNumber, takerAddress, skipValidation) {
		let sellTokenAddress = getTokenAddress(sellTokenSymbol, this.chainId);
		let buyTokenAddress = getTokenAddress(buyTokenSymbol, this.chainId);


		let slippage = "0";

		if (profitQueryRatioBigNumber) {
			slippage = this.getSlippage(profitQueryRatioBigNumber);
		}

		let params = {
			sellToken: sellTokenAddress,
			buyToken: buyTokenAddress,
			slippagePercentage: slippage,
			takerAddress: takerAddress,
			skipValidation: skipValidation,
		};

		if (sellAmount) {
			params.sellAmount = utils.parseUnits(sellAmount.toString(), getTokenDecimals(sellTokenSymbol, this.chainId));
		}
		if (buyAmount) {
			params.buyAmount = utils.parseUnits(buyAmount.toString(), getTokenDecimals(sellTokenSymbol, this.chainId));
		}

		let URL = this.apiURL + API_URL_QUUTE + "?" + (new URLSearchParams(params)).toString();
		console.log(URL);

		let time = new Date();
		
		let response = await axios.get(URL);

		console.log("NullaTime", new Date() - time)

		let decimalDiff = getTokenDecimals(sellTokenSymbol, this.chainId) - getTokenDecimals(buyTokenSymbol, this.chainId);

		let data = response.data;
		let parsedResponse = {
			sellAmount: data.sellAmount,
			buyAmount: data.buyAmount,
			sellAmountFormatted: (Number(utils.formatUnits(data.sellAmount, getTokenDecimals(sellTokenSymbol, this.chainId))).toFixed(2)).toLocaleString("de-DE"),
			buyAmountFormatted_: Number(utils.formatUnits(data.buyAmount, getTokenDecimals(buyTokenSymbol, this.chainId))).toFixed(2).toLocaleString("de-DE"),
			price: data.sellAmount / data.buyAmount / Math.pow(10, decimalDiff)
		}

		return {response:response, parsedResponse:parsedResponse};
	}

	getSlippage(profitQueryRatioBigNumber) {
		let prefix = "0."

		let ratioString = profitQueryRatioBigNumber.toString();
		ratioString = ratioString.substring(1);

		let slippage = prefix + ratioString;

		return slippage;
	}

}

module.exports = {
	NullaX
}