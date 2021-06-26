import logo from './logo.svg';
import './App.css';
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
    setSearch(e)
  }

  const onDelete = (id) => {
    setItems(items.filter(item => item.objectID !== id))
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const getNews = useEffect(() => {

    if (preSearch !== search) {
      setIsLoaded(false)
      setItems([]);
      setCurrentPage(0)
      setNbPages(0)
    }
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
          <div>
            <h1>Hacker News Rest API</h1>
            <SearchBox search = {search} onSearchChange = {onSearchChange}/>
            <h2>Loading</h2>
          </div>
        );
  } else {
    if (currentPage < nbPages-1){
        return (
          <div>
            <h1>Hacker News Rest API</h1>
            <SearchBox search = {search} onSearchChange = {onSearchChange}/>
            <Table style = {{'width': '99%'}}items = {items} onDelete = {onDelete}/>
            <button onClick={() => setCurrentPage(currentPage+1)}> Load more </button>
          </div>
        );
    } else {
return (
          <div>
             <h1>Hacker News Rest API</h1>
            <SearchBox search = {search} onSearchChange = {onSearchChange} />
            <Table items = {items} onDelete = {onDelete}/>
          </div>
        );
    }
  }
}

export default App;
