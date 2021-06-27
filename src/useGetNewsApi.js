import { useState, useEffect, useRef, useCallback} from "react";

const useGetNewsApi = (search,currentPage) => {
  const isFirstRender = useRef(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prevSearchRef = useRef('');
  const [items, setItems] = useState([]);
  const [nbPages,setNbPages] = useState(0);

  useEffect(() => {
    setIsLoaded(false)
    if (prevSearchRef.current!==search) {
      setItems([])
      setNbPages(0)
    }
    if(!isFirstRender.current){
      fetch(`https://hn.algolia.com/api/v1/search?page=${currentPage}&hitsPerPage=10&query=${search}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(items => [...items, ...result.hits]);
            setNbPages(result.nbPages)
            prevSearchRef.current = search
            },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            prevSearchRef.current = search
          }
        )
    }else{
      isFirstRender.current = false
    }
  }, [search,currentPage])

  const delItems = useCallback(function(i) { setItems(i); }, []);

  return [error, items, nbPages, delItems];
};

export default useGetNewsApi;