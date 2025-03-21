import axios from "axios";

const ACCESS_KEY = 'dzWHEkRwdAK-kYxqKeOqm0KPr_VRA4BcIOrFg0cjdVg';

export default async function fetchImages(img, page, itemsPerPage) {
    
    const resp = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${img}&per_page=${itemsPerPage}&page=${page}`);
    
    return {
        images: resp.data.results, 
        totalHits: resp.data.total,
    };
}
