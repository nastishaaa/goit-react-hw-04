import { useState, useEffect } from 'react'
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import fetchImages from './api';
import './App.css'
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';

function App() {

  const [images, setImage] = useState([]);
  const [isLoad, setLoader] = useState(false);

  const onSearch = async (img) => {
    setImage([]);
    setLoader(true); 
    try {
      const data = await fetchImages(img);
      setImage(data); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false); 
    }
  }
  
  return (
    <>
      <SearchBar onSearch={onSearch}/>
      {isLoad ? <Loader /> : <ImageGallery images={images} />}
    </>
  )
}

export default App

//ID - 723760
//KEY - dzWHEkRwdAK-kYxqKeOqm0KPr_VRA4BcIOrFg0cjdVg
