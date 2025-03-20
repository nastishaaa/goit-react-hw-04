import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({handleClick}) {
    return (
        <button className={css.btnLoad} type="button" onClick={handleClick}>Load More</button>
    )
}