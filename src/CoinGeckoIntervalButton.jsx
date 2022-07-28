import React, {useState, useEffect} from 'react';

const CoinGeckoIntervalButton = ({ days, setQueryNumberOfDays }) => {
	return (
		<div className="tw-h-8 tw-mb-2 md:tw-mb-0 tw-relative tw-z-0 tw-inline-flex tw-shadow-sm tw-rounded-md chart-selector left-0" data-target="price-chart.toolbar">

	        {days.map(
	          (day, index) => {
	            let cssClass;
	            
	            if(index == 0) {
	              cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-l-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
	            } else if(index == days.length-1) {
	              cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-r-md tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white graph-stats-btn";
	            } else {
	              cssClass = "tw-bg-white dark:tw-bg-white dark:tw-bg-opacity-5 dark:tw-text-white tw-h-8 tw--ml-px tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border-solid tw-border tw-cursor-pointer tw-border-gray-300 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 dark:hover:tw-bg-opacity-10 focus:tw-z-10 focus:tw-outline-none focus:tw-bg-gray-200 dark:tw-border-opacity-10 dark:focus:tw-bg-opacity-10 dark:hover:tw-text-white";
	            }

	            let title = day + "d";
	            if (day == 1) {
	              title = "24h"
	            } else if (day == 365) {
	              title = "1y"
	            }

	            return (
	              <a 
	                key={title}
	                className={cssClass}
	                href="#"
	                onClick={() => setQueryNumberOfDays(day)}
	                >
	                  {title}
	                </a>
	            )
	          })
	        }
	    </div>
    );
}
  
export default CoinGeckoIntervalButton;