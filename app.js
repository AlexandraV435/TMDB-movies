const API_KEY = 'api_key=d9081edd06b9602f2c84bede66f719e3';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const URL = 'https://api.themoviedb.org/3/movie/157336?&' + API_KEY;
const DEF_URL = 'https://api.themoviedb.org/3/movie/';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const button = document.getElementById('button');
const form = document.getElementById('form');
const search = document.getElementById('search');
const body = document.getElementById('body');
const up = document.getElementById('up');
const background = document.getElementById('background');
const overview = document.getElementById('overview')

//alert(window.innerWidth)
let genre = [];
let prod_comp = [];

getMovie(URL);

function getFilmSearch(id) {
  getMovie(DEF_URL + id + '?&' + API_KEY )

}

function getMovie(url) {
  fetch(url).then(res => res.json()).then(data => {
    showMovies(data);
  })
}

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    showResults(data.results);
  })
}

function getFilms(url) {
  fetch(url).then(res => res.json()).then(data => {
    getPopFilms(data.results);
  })
}

function showMovies(data) {
  genre = [];
  let genres = data.genres;
  genres.forEach(item => {
    genre.push(item.name)
  });

  prod_comp = [];
  data.production_companies.forEach((item, i) => {
    prod_comp.push(item.name)
  });

  main.innerHTML = '';
  const movieEl = document.createElement('div');
  main.classList.add('up');
  movieEl.classList.add('movie');
  movieEl.innerHTML += `
      <div class='wrapper' id='wrapper'>
       <img id='img' src="${IMG_URL+data.poster_path}" alt="${data.title}">
         <div class='wrapp'>
           <div>
             <h1 id='title'>${data.title.toUpperCase()}</h1>
             <p class='film' id='tagline'>${data.tagline}</p>
           </div>
           <div id="overview">
             <p class='text'>${data.overview}</p>
           </div>
           <div>
           <p class='film' id='genre'>${genre}</p>
           <p class='text' id='prod'>${prod_comp}</p>
           </div>
           <div class='wrapp-ower'>
             <div class='overview-film'>
               <div>
                <p class='text headings-const'>Original Reliase:</p>
                <p class='film film-id'>${data.release_date}</p>
               </div>
               <div>
                <p class='text headings-const'>Box Office:</p>
                <p class='film film-id'>$${data.revenue}</p>
               </div>
           </div>
           <div class='overview-film'>
             <div class='head-two'>
              <p class='text headings-const headings'>Running Time:</p>
              <p class='film headings film-id'>${data.runtime} mins</p>
             </div>
             <div class='head-two'>
               <p class='text headings-const headings'>Vote Average:</p>
               <p class='film headings film-id'>${data.vote_average} / 10</p>
             </div>
          </div>
       </div>
      </div>
    `
    body.classList.remove('body-populars');
    main.classList.remove('main-populars');
    background.classList.add('background');
    main.classList.add('up');
    main.appendChild(movieEl)
    body.style.backgroundImage = `url(${IMG_URL+data.backdrop_path})`;

}

function showResults(results) {
  main.innerHTML = '';
  results.forEach(item => {
    const { title, poster_path, vote_average, overview, backdrop_path, id} = item;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <div onclick='getFilmSearch(${id})' class='wrapp-populars'>
          <img class='pupulars-img' src="${IMG_URL+poster_path}" alt="${title} ">
          <div class="movie-info">
            <h3>${title}</h3>
              <div class='wrapp-span'>
                <span class="${getColor(vote_average)} vote">${vote_average}</span>
            </div>
          </div>
        </div>
      `
      body.classList.add('body-populars');
      main.classList.add('main-populars');
      background.classList.remove('background');
      main.classList.remove('up');
      main.appendChild(movieEl)
      body.style.backgroundImage = '';

  });
}

function getPopFilms(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview, id} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <div onclick='getFilmSearch(${id})' class='wrapp-populars'>
        <img class='pupulars-img' src="${IMG_URL+poster_path}" alt="${title} ">
        <div class="movie-info">
          <h3>${title}</h3>
            <div class='wrapp-span'>
              <span class="${getColor(vote_average)} vote">${vote_average}</span>
          </div>
        </div>
      </div>
    `
    background.classList.remove('background');
    main.classList.remove('up');
    body.classList.add('body-populars');
    main.classList.add('main-populars');
    main.appendChild(movieEl);
    body.style.backgroundImage = '';
    });
}

function getColor(vote) {
  if (vote >= 7) {
    return 'green'
  } else if (vote >= 5.5) {
    return 'orange'
  } else return 'red'
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL+'&query='+searchTerm)
  } else {
    getMovies(URL);
  }
})
