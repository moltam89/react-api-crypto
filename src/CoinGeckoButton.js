import React, {useState, useEffect} from 'react';

const CoinGeckoButton = ({active, displayStyle, index, setActiveIndex, name, setDisplayStyle }) => {
	const handleOnClick = () => {
 		setDisplayStyle(displayStyle);
 		setActiveIndex(index);
	};

	let className = '"tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10" data-action="click->price-chart#updateChart" data-action-type="type-price"';

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