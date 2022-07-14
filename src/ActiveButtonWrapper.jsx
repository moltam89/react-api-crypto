import React, {useState, useEffect} from 'react';
import CoinGeckoButton from  './CoinGeckoButton';

const ActiveButtonWrapper = ({buttons}) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
	<>
		{buttons.map(({ active, displayStyle, name, setDisplayStyle }, index) => {
			return <CoinGeckoButton
						key={index}
						active={index == activeIndex}
						displayStyle={displayStyle}
						index={index}
						setActiveIndex={setActiveIndex}
						name={name}
						setDisplayStyle={setDisplayStyle}>
					</CoinGeckoButton>;
		})}
	</>
	);
}
  
export default ActiveButtonWrapper;