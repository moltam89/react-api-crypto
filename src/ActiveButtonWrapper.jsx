import React, {useState, useEffect} from 'react';

const ActiveButtonWrapper = ({buttons}) => {
	
	return (
	<>
		{buttons.map((button) => {
			return button;
		})}
	</>
	);
}
  
export default ActiveButtonWrapper;