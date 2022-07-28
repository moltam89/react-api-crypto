import React, {useState, useEffect} from 'react';

const CoinGeckoButton = ({active, displayStyle, index, setActiveIndex, name, setDisplayStyle, className }) => {
	const handleOnClick = () => {
 		setDisplayStyle(displayStyle);
 		setActiveIndex(index);
	};

 	if (active) {
		className += " active buttonSelected";
	}


	return (
		<button onClick={() => handleOnClick()} type="button" className={className}>
            {name}
        </button>
	);
}
  
export default CoinGeckoButton;