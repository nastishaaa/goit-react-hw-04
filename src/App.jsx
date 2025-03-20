import { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchImages from './api';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageGallery/ImageModal';

function App() {
  const [images, setImage] = useState([]);
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
    } catch {
      toast.error("Something went wrong. Try again!", 
        { position: "top-right" });
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
        toast.info("You've reached the end of the results", {
          position: "top-right",
      });
        return;
      }
    } catch (error) {
      setShowBtn(false);
      toast.error("Something went wrong. Try again!", 
        { position: "top-right" });
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

  const openModalImg = (ev) => {
    setImgTarget(ev.target.src);
    setIsOpen(true);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      {isLoad ? <Loader /> : <ImageGallery openModal={openModalImg} images={images} lastImageRef={lastImageRef} />}
      {showBtn && <LoadMoreBtn handleClick={handleLoadMore} />}
      {isOpen && <ImageModal image={imgTarget} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default App;
