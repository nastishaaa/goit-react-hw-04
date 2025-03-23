import css from './SearchBar.module.css';
import { toast } from "react-hot-toast";

export default function SearchBar({onSearch, onChange}) {
    
    const hendleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const image = form.elements.img.value;
    
        if (form.elements.img.value.trim() === "") {
            toast.error("Input cannot be empty!", {
                position: "top-right",
            });
            
            return;
        }
    
        onSearch(image);
        form.reset();
    }

    return(
        <header>
            <form className={css.form} onSubmit={hendleSubmit}>
            <input className={css.input}
                autoComplete="off"
                name="img"
                id="img"
                autoFocus
                type="text"
                onChange={onChange}
                placeholder="Search images and photos"/>
            <button className={css.btnSearch} type="submit" > Search</button>
        </form>
        </header>
        
        
    )
}