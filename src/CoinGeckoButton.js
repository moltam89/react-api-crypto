import React, {useState, useEffect} from 'react';

const CoinGeckoButton = ({name, className, handleOnClick }) => {
	return (
		<button onClick={() => handleOnClick()} type="button" className={className}>
            {name}
        </button>
	);
}
  
export default CoinGeckoButton;