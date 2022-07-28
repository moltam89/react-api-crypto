import React, {useState, useEffect} from 'react';

const CoinGeckoButton = ({displayStyle, index, setActiveIndex, name, setDisplayStyle, className }) => {
	const handleOnClick = () => {
 		setDisplayStyle(displayStyle);
 		setActiveIndex(index);
	};

	return (
		<button onClick={() => handleOnClick()} type="button" className={className}>
            {name}
        </button>
	);
}
  
export default CoinGeckoButton;