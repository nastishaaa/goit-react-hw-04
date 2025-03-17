import { forwardRef } from "react";
import css from './ImageGallery.module.css';

const ImageCard = forwardRef(({ likes, raw, alt_description }, ref) => {
    return (
        <div className={css.listItem} ref={ref}>
            <img className={css.listImg} src={raw} alt={alt_description} />
            <p className={css.listParagraph}>Likes: {likes}</p>
        </div>
    );
});

export default ImageCard;
