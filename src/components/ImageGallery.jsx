import ImageCard from "./ImageCard"
import css from './ImageGallery.module.css'

export default function ImageGallery({images}){
    return (
        <ul className={css.list}>
        {images.map(({id, likes, urls, alt_description}) => {
            return <ImageCard key={id} likes={likes} raw={urls.regular} alt_description={alt_description}/>
        })}
        </ul>
    )
}