import axios from 'axios';

const BASA_URL = 'https://pixabay.com/api/';
const apiKey = '33258201-876aeb9a1460bd69fc06236bf';

export async function onLoad(searchQuery, page) {
  const resp = await axios.get(
    `${BASA_URL}?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return resp;
}