import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css'

export default function ImageGallery({ openModal, images }) {
    return (
        <ul className={css.list}>
            {images.map(({ id, likes, urls, alt_description }, index) => {
                
                return (
                    <li key={id}>
                        <ImageCard 
                            openModal={openModal}
                            likes={likes} 
                            raw={urls.regular} 
                            alt_description={alt_description} 
                        />
                    </li>
                );
            })}
        </ul>
    );
}
