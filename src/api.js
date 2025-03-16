import axios from "axios";

const ACCESS_KEY = 'dzWHEkRwdAK-kYxqKeOqm0KPr_VRA4BcIOrFg0cjdVg';

export default async function fetchImages(img) {
    const resp = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${img}&per_page=12`);
    return resp.data.results;
}
