import React from 'react';
import Row from './row.js'

function Table({items, onDelete}) {
    const rows = items.map(item =>
    	<Row item = {item}
    		key={item.objectID}
    		onDelete = {onDelete}/>
    )

    return(
    	<div style = {{width: '100%', overflowX: 'auto'}}>
            <table style = {{width: '100%', tableLayout: 'fixed'}}>
                <thead style={{backgroundColor: "grey"}}>
                  <tr>
                    <th style={{width: '15%', wordBreak: 'break-all'}}>ID</th>
                    <th style={{width: '15%', wordBreak: 'break-all'}}>Author</th>
                    <th style={{width: '15%', wordBreak: 'break-all'}}>Comments</th>
                    <th style={{width: '20%', wordBreak: 'word-break'}}>Title</th>
                    <th style = {{wordBreak: 'break-all'}}>URL</th>
                    <th style={{width: '65px'}}>Remove</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
export default Table;