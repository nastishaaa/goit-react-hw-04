import ImageCard from './ImageCard'
import css from './ImageGallery.module.css'

export default function ImageGallery({ openModal, images, lastImageRef }) {
    return (
        <ul className={css.list}>
            {images.map(({ id, likes, urls, alt_description }, index) => {
                const isLastImage = index === images.length - 1;
                return (
                    <li key={id}>
                        <ImageCard 
                            openModal={openModal}
                            likes={likes} 
                            raw={urls.regular} 
                            alt_description={alt_description}
                            ref={isLastImage ? lastImageRef : null} // Передаємо ref лише для останнього зображення
                        />
                    </li>
                );
            })}
        </ul>
    );
}
