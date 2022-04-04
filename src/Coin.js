import React from 'react';
import './Coin.css';
import { Link } from "react-router-dom";

const Coin = ({id, name, img, symbol, price, volume, priceChange, marketCap}) => {

	return (
   <div className="coin-container">
   		<div className="coin-row">
  			<div className="coin">
  			 	<img src={img}/>
                 <Link to={`/coins/${id}`}>
  			 	    <h1> {name}</h1>
                 </Link>
  			 	<p className="coin-symbol">{symbol}</p>
    		</div>

    		<div className="coin-data">
  			 	<p className="coin-price">${price}</p>
  			 	<p className="coin-volume">${volume.toLocaleString()}</p>
  			 	{priceChange < 0 
  			 		? 
  			 		(<p className="coin-percent red">{priceChange.toFixed(2)}%</p>)
  			 		:
  			 		(<p className="coin-percent green">{priceChange.toFixed(2)}%</p>)

  			 	}
  			 	<p className="coin-marketCap">
  			 		Mkt cap: ${marketCap.toLocaleString()}
  			 	</p>


    		</div>
    	</div>
    </div>
  );
}

export default Coin;