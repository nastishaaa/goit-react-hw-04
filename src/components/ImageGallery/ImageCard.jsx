import { forwardRef } from "react";
import css from './ImageGallery.module.css';
import { CiSaveDown1 } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";

const ImageCard = forwardRef(({ openModal, likes, raw, alt_description }, ref) => {
    return (
        <div className={css.listItem} ref={ref}>
            <img onClick={openModal} className={css.listImg} src={raw} alt={alt_description} />
            <div className={css.infoContent}>
                <p className={css.listParagraph}>Likes: {likes} <IoIosHeartEmpty className={css.heartIcon} /></p>
            </div>
            
        </div>
    );
});

export default ImageCard;
