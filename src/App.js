import React, { useState,useEffect } from 'react';
import SearchBox from './searchbox.js'
import Table from './table.js'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [preSearch, setPreSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [nbPages,setNbPages] = useState(0);

  const onSearchChange = (e) => {
    if (e !== preSearch){
      setSearch(e)
      setIsLoaded(false)
      setItems([]);
      setCurrentPage(0)
      setNbPages(0)
    }
  }

  const onDelete = (id) => {
    setItems(items.filter(item => item.objectID !== id))
  }

  const onLoadMoreClicked =() => {
      setCurrentPage(currentPage+1)
      setIsLoaded(false)
  }

  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search?page=${currentPage}&hitsPerPage=10&query=${search}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(items => [...items, ...result.hits]);
          setNbPages(result.nbPages)
          setPreSearch(search)
           },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [search,currentPage])


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
