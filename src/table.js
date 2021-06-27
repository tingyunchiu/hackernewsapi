import React from 'react';
import Row from './row.js'

function Table({items, onDelete}) {
const rows = [];
items.forEach(item => {
	rows.push(
		<Row item = {item}
		key={item.objectID}
		onDelete = {onDelete}/>
	)
})
return(
	<div style = {{width: '100%', overflowX: 'auto'}}>
        <table style = {{width: '100%'}}>
            <thead style={{backgroundColor: "grey"}}>
              <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Comments</th>
                <th>Title</th>
                <th style = {{wordBreak: 'break-all'}}>URL</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div>
);
}
export default Table;