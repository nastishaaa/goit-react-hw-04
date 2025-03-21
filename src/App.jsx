import { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchImages from './api';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageGallery/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const [images, setImage] = useState([]);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [isLoad, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [query, setQuery] = useState('');
  const lastImageRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); 
  const [imgTarget, setImgTarget] = useState('');
  
  const onSearch = async (img) => {
    setImage([]);
    setQuery(img);
    setLoader(true); 
    setShowBtn(false); 
    setPage(1);
    setIsError(false);
    try {
      const data = await fetchImages(img, page, 12);
      setImage(data.images); 

      const totalPages = Math.ceil(data.totalHits / itemsPerPage);

      if(page >= totalPages){
        toast.info("You've reached the end of the results", {
          position: "top-right",
      });
      
      }
      setPage(page+1);
      setShowBtn(true);
      setIsError(false);
    } catch {
      setIsError(true)
      
    } finally {
      setLoader(false); 
    }
  }

  const handleLoadMore = async () => {
    setLoader(true);
    setShowBtn(false); 
    setIsError(false);
    try {
      const data = await fetchImages(query, page + 1, 12); 
      setImage((prevImages) => [...prevImages, ...data.images]); 
      setPage((prevPage) => prevPage + 1);  

      const totalPages = Math.ceil(data.totalHits / itemsPerPage); 
      if (page + 1 >= totalPages) {
        setShowBtn(false);
        toast.info("You've reached the end of the results", {
          position: "top-right",
      });
        return;
      }
      setShowBtn(true);
    } catch (error) {
      setShowBtn(false);
      setIsError(true);
      return;
    } finally {

      window.scrollBy({
        top: 300,
        behavior: 'smooth'
    });

      setLoader(false); 
    
    }
  };
  
  useEffect(() => {
    if (images.length > 0) {
      lastImageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [images]);

  const openModalImg = (ev) => {
    if (!isOpen) {  
      setImgTarget(ev.target.src);
      setIsOpen(true);
    }
    
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      <ImageGallery openModal={openModalImg} images={images} lastImageRef={lastImageRef} />
      {isLoad && <Loader />}
      {showBtn && <LoadMoreBtn handleClick={handleLoadMore} />}
      {isOpen && <ImageModal image={imgTarget} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
