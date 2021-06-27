import React from 'react';

function Row({item, onDelete}) {
return(
	<tr>
  		<td>{item.objectID}</td>
  		<td>{item.author}</td>
  		<td>{item.num_comments}</td>
  		<td>{item.title}</td>
  		<td style = {{wordBreak: 'break-all'}}>{item.url}</td>
  		<td><button  id={item.objectID} onClick={(e) => onDelete(e.target.id)}> Delete </button></td>
  	</tr>

)
}
export default Row;