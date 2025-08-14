const temp = document.querySelector('#current-temp');
const icon = document.querySelector('#weather-icon');
const desc = document.querySelector('#weather-desc');
const forecastDiv = document.querySelector('#forecast');

const apiKey = "9913d95bcc0afd01a582a9de6cbf40ca";
const city = "Lagos";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=6.429&lon=3.42199&units=metric&appid=9913d95bcc0afd01a582a9de6cbf40ca`;

async function getWeather() {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    
    const current = data.list[0];
    temp.innerHTML = `${current.main.temp} °C`;
    icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    icon.alt = current.weather[0].description;
    desc.textContent = current.weather[0].description;

    
    const daily = data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 3);

    forecastDiv.innerHTML = '';
    daily.forEach(day => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
        <p>${day.main.temp} °C</p>
      `;
      forecastDiv.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching weather data:", error);
    temp.textContent = "N/A";
    desc.textContent = "Unable to load weather data.";
    forecastDiv.innerHTML = "<p>Forecast unavailable.</p>";
  }
}

getWeather();


import { movies } from '../data/movie.mjs';

const featuredContainer = document.getElementById("featured-list");

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalGenre = document.getElementById('modal-genre');
const modalYear = document.getElementById('modal-year');
const modalRating = document.getElementById('modal-rating');
const modalDescription = document.getElementById('modal-description');
const modalCloseBtn = document.getElementById('modal-close');

// Open modal
function openModal(movie) {
    modalTitle.textContent = movie.title;
    modalImg.src = `images/${movie.poster}`;
    modalImg.alt = movie.title;
    modalImg.loading = "lazy"; // Lazy load modal images
    modalGenre.textContent = `Genre: ${movie.genre}`;
    modalYear.textContent = `Year: ${movie.year}`;
    modalRating.textContent = `⭐ ${movie.rating}`;
    modalDescription.textContent = movie.description;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === "Escape" && modal.classList.contains('show')) closeModal(); });

// Display featured movies
function displayFeaturedMovies() {
    const featuredMovies = movies.filter(movie => movie.rating > 8.5);

    featuredMovies.forEach(movie => {
        const card = document.createElement('div');

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `images/${movie.poster}`;
        img.alt = movie.title;
        img.width = 300;
        img.height = 200;
        img.loading = "lazy"; // Lazy load
        figure.appendChild(img);
        card.appendChild(figure);

        const title = document.createElement('h2');
        title.textContent = movie.title;
        card.appendChild(title);

        const genre = document.createElement('h3');
        genre.textContent = movie.genre;
        card.appendChild(genre);

        const rating = document.createElement('p');
        rating.textContent = `⭐ ${movie.rating}`;
        card.appendChild(rating);

        const button = document.createElement('button');
        button.textContent = "Learn More";
        button.setAttribute('aria-label', `Learn more about ${movie.title}`);
        button.addEventListener('click', () => openModal(movie));
        card.appendChild(button);

        featuredContainer.appendChild(card);
    });
}

displayFeaturedMovies();
