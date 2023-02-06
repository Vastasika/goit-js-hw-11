import './css/style.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onLoad } from './fetchContainer';
import { message } from './message';
import { scroll } from './scroll';

const inputForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
export const bottunMore = document.querySelector('.load-more');
bottunMore.addEventListener('click', addButton);
inputForm.addEventListener('submit', findBase);

let qwest = '';
let page = 1;

async function findBase(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  bottunMore.hidden = true;
  showImg(e.target.searchQuery.value, page);
}

async function showImg(qwery, page) {
  qwest = qwery;
  try {
    const data = await onLoad(qwery, page);
    renderImages(data);
    if (page > 1) {
      scroll();
    }
  } catch (error) {
    console.log(error);
  }
  gallerry.refresh();
}

function renderImages(data) {
  const { totalHits, hits } = data.data;
  message(page, hits, totalHits);

  const markup = data.data.hits
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<div class="photo-card">
  <a href="${largeImageURL}" class="gallery__item"><img onclick="return false"; src="${webformatURL}" alt="${tags}" class="gallery__image"  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
function addButton() {
  page += 1;

  showImg(qwest, page);
}

let gallerry = new SimpleLightbox('div.gallery a', {
  captionsData: 'alt',
  captionDelay: 500,
});