import React, {useState, useEffect} from 'react';
import CoinGeckoButton from  './CoinGeckoButton';

const ActiveButtonWrapper = ({ buttons }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
	<>
		{buttons.map(({ active, displayStyle, name, setDisplayStyle }, index) => {
			let className;
	            
		    if(index == 0) {
		      className = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
		    } else if(index == buttons.length - 1) {
		      className = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-r-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white graph-stats-btn";
		    } else {
		      className = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
		    }

		    if (index == activeIndex) {
				className += " active buttonSelected";
			}

			return <CoinGeckoButton
						key={index}
						displayStyle={displayStyle}
						index={index}
						setActiveIndex={setActiveIndex}
						name={name}
						setDisplayStyle={setDisplayStyle}
						className={className}
					/>
					
		})}
	</>
	);
}
  
export default ActiveButtonWrapper;