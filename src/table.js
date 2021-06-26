import React, { useState,useEffect } from 'react';
import Row from './row.js'

function Table({items, onDelete}) {
const rows = [];
items.map(item => {
	rows.push(
		<Row item = {item}
		key={item.objectID}
		onDelete = {onDelete}/>
	)
})
return(
	<table>
        <thead style={{backgroundColor: "grey"}}>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Comments</th>
            <th>Title</th>
            <th>URL</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
);
}
export default Table;