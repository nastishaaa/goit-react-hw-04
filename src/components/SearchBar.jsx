import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import css from './SearchBar.module.css';

export default function SearchBar({onSearch, value}) {
    
    const hendleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const image = form.elements.img.value;
    
        if (form.elements.img.value.trim() === "") {
            iziToast.error({
                message: "Sorry, form cannot be empty!",
                timeout: 5000, 
                position: 'topRight',
            });
            return;
        }
    
        onSearch(image);
        form.reset();
    }

    return(
        <form className={css.form} onSubmit={hendleSubmit}>
            <input className={css.input}
                autoComplete="off"
                name="img"
                id="img"
                type="text"
                value={value}
                placeholder="Search... "/>
            <button className={css.btnSearch} type="submit" >Search</button>
        </form>
        
    )
}