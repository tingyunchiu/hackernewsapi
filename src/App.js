import React, { useState} from 'react';
import useGetNewsApi from'./useGetNewsApi.js'
import SearchBox from './searchbox.js'
import Table from './table.js'

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

  let [error, isLoaded, items, nbPages, delItems] = useGetNewsApi(search,currentPage)


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
          <div style={{width: '100%'}}>
            <h1>Hacker News Rest API</h1>
            <SearchBox search = {search} onSearchChange = {onSearchChange}/>
            <h2>Loading</h2>
          </div>
        );
  } else {
      return (
        <div  style={{width: '100%'}}>
          <h1>Hacker News Rest API</h1>
          <SearchBox search = {search} onSearchChange = {onSearchChange}/>
          <Table items = {items} onDelete = {onDelete}/>
          {currentPage < nbPages-1
            ? <button onClick={() => onLoadMoreClicked()}> Load more </button>
            : null
          }
        </div>
      );
  }
}

export default App;
