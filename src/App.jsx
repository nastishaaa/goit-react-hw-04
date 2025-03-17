import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './api';
import './App.css'
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import LoadMoreBtn from './components/LoadMoreBtn';

function App() {

  const [images, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [isLoad, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [query, setQuery] = useState('');
  const lastImageRef = useRef(null);

  const onSearch = async (img) => {
    setImage([]);
    setQuery(img);
    setLoader(true); 
    setShowBtn(false); 
    setPage(1);
    try {
      const data = await fetchImages(img, page, 12);
      setImage(data.images); 

      const totalPages = Math.ceil(data.totalHits / itemsPerPage);

      if(page >= totalPages){
        iziToast.info({
          position: "topRight",
          timeout: 5000, 
          message: "You've reached the end of the results",
        });
      }
      setPage(page+1);
      setShowBtn(true);
    } catch {
      iziToast.error({
        position: "topRight",
          timeout: 5000, 
          message: "Something going wrong. Try again!", 
        
      })
    } finally {
      setLoader(false); 
      setShowBtn(true);
    }
  }

  const handleLoadMore = async () => {
    setLoader(true);
    setShowBtn(false); 
    try {
      const data = await fetchImages(query, page + 1, 12); 
      setImage((prevImages) => [...prevImages, ...data.images]); 
      setPage((prevPage) => prevPage + 1);  

      const totalPages = Math.ceil(data.totalHits / itemsPerPage); 
      if (page + 1 >= totalPages) {
        setShowBtn(false);
        iziToast.info({
          position: "topRight",
          timeout: 5000,
          message: "You've reached the end of the results", 
        });
        return;
      }
    } catch (error) {
      setShowBtn(false);
      iziToast.error({
        position: "topRight",
        timeout: 5000,
        message: "Something went wrong. Try again!", 
      });
      return;
    } finally {

      window.scrollBy({
        top: 150,
        behavior: 'smooth'
    });

      setLoader(false); 
      setShowBtn(true);
      
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      lastImageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [images]);
  
  return (
    <>
      <SearchBar onSearch={onSearch}/>
      {isLoad ? <Loader /> : <ImageGallery images={images} lastImageRef={lastImageRef} />}
      {showBtn && <LoadMoreBtn handleClick={handleLoadMore} />}
      
    </>
  )
}

export default App

//ID - 723760
//KEY - dzWHEkRwdAK-kYxqKeOqm0KPr_VRA4BcIOrFg0cjdVg
