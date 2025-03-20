import css from './SearchBar.module.css';
import { toast } from "react-hot-toast";

export default function SearchBar({onSearch, value}) {
    
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