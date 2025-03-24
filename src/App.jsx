import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchImages from './api';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const [images, setImage] = useState([]);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [isLoad, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const [imgTarget, setImgTarget] = useState('');
  
  const onSearch = async () => {
    setImage([]);
    setLoader(true); 
    setShowBtn(false); 
    setIsError(false);

    const newPage = 1; 
    setPage(newPage);

    try {
      const data = await fetchImages(query, newPage, 12);
      setImage(data.images); 

      const totalPages = Math.ceil(data.totalHits / itemsPerPage);

      if(newPage >= totalPages){
        toast("You've reached the end of the results", {
          position: "top-right",
      });
      
      }
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
    const newPage = page + 1;
    setPage(newPage);
    try {
      const data = await fetchImages(query, newPage, 12); 
      setImage((prevImages) => [...prevImages, ...data.images]); 
      
      const totalPages = Math.ceil(data.totalHits / itemsPerPage); 
      if (newPage >= totalPages) {
        toast("You've reached the end of the results", {
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
        top: 500,
        behavior: 'smooth'
    });

      setLoader(false); 
    }
  };
  
  useEffect(() => {
    if (images.length > 0 && !isLoad) {
      window.scrollBy({
        top: 500, 
        behavior: 'smooth',
      });
    }
  }, [images, isLoad]);
  
  const openModalImg = (ev) => {
    if (!isOpen) {  
      setImgTarget(ev.target.src);
      setIsOpen(true);
    }
    
  };

  return (
    <>
      <SearchBar onSearch={onSearch}
      onChange={(e) => setQuery(e.target.value)} />
      <Toaster position="top-right" reverseOrder={false} />
      <ImageGallery openModal={openModalImg} images={images} />
      {isLoad && <Loader />}
      {showBtn && <LoadMoreBtn handleClick={handleLoadMore} />}
      {isOpen && <ImageModal image={imgTarget} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
