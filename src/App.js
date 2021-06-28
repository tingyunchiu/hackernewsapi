import React, { useState} from 'react';
import useGetNewsApi from'./functions/useGetNewsApi.js'
import SearchBox from './components/searchbox.js'
import Table from './components/table.js'

function App() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const onSearchChange = (e) => {
    setSearch(e)
    setCurrentPage(0)
  }

  const onDelete = (id) => {
    delItems(items.filter(item => item.objectID !== id))
  }

  const onLoadMoreClicked =() => {
      setCurrentPage(currentPage+1)
  }

  let [error, items, nbPages, delItems] = useGetNewsApi(search,currentPage)


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
      return (
        <div  style={{width: '100%'}}>
          <h1>Hacker News Rest API</h1>
          <SearchBox search = {search} onSearchChange = {onSearchChange}/>
          {items.length >0
            ? <Table items = {items} onDelete = {onDelete}/>
            : null
          }
          {currentPage < nbPages-1
            ? <button onClick={() => onLoadMoreClicked()}> Load more </button>
            : null
          }
        </div>
      );
  }
}

export default App;
