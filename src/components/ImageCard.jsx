import css from './ImageGallery.module.css'

export default function ImageCard({id, likes, raw, alt_description}) {
    return(
        <li className={css.listItem} key={id}>
            <img className={css.listImg} src={raw} alt={alt_description} />
            <p className={css.listParagraph}>Likes: {likes}</p>
            
        </li>
    )
}