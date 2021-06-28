import React from 'react';

function Row({item, onDelete}) {
return(
	<tr>
  		<td style={{width: '15%', wordBreak: 'break-all'}}>{item.objectID}</td>
  		<td style={{width: '15%', wordBreak: 'break-all'}}>{item.author}</td>
  		<td style={{width: '15%', wordBreak: 'break-all'}}>{item.num_comments}</td>
  		<td style={{width: '20%', wordBreak: 'word-break'}}>{item.title}</td>
  		<td style = {{wordBreak: 'break-all'}}>{item.url}</td>
  		<td style={{width: '65px'}}><button  id={item.objectID} onClick={(e) => onDelete(e.target.id)}> Delete </button></td>
  	</tr>

)
}
export default Row;