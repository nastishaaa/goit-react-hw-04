import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

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
        <form onSubmit={hendleSubmit}>
            <input
                autoComplete="off"
                name="img"
                id="img"
                type="text"
                value={value}
                placeholder="Search... "/>
            <button type="submit" >Search</button>
        </form>
        
    )
}