import React, { useState } from 'react';

function SearchBox({onSearchChange}) {
	const [searchInBox, setSearchInBox] = useState('');
	const handleKeyDown = (event) => {
    	if (event.key === 'Enter') {
      		onSearchChange(searchInBox)
    	}
  	}

	return(
		<div>
			<input type="text"
				   value={searchInBox}
	    		   onChange={(event) => setSearchInBox(event.target.value)}
	    		   onKeyDown={(event) => handleKeyDown(event)}
	    	/>
	    	<button onClick={() =>onSearchChange(searchInBox)}> Search </button>
		</div>
	)
}

export default SearchBox;