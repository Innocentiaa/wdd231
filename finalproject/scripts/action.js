
import { movies } from "../data/movie.mjs";

const moviesContainer = document.getElementById("movies-container") || document.getElementById("featured-list");
const modal = document.getElementById("movie-modal");
const modalContent = modal.querySelector(".modal-content");
const modalClose = modal.querySelector(".modal-close");

// Load movies dynamically
function loadMovies() {
    moviesContainer.innerHTML = "";

    movies.forEach((movie, index) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="images/${movie.poster}" alt="${movie.title}" width="300" height="200" loading="lazy">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <p>⭐ ${movie.rating}</p>
            <button class="details-btn" data-index="${index}">Details</button>
            <button class="fav-btn" data-index="${index}">❤️ Add to Favorites</button>
        `;

        moviesContainer.appendChild(card);
    });

    attachEventListeners();
}

// Attach event listeners for buttons
function attachEventListeners() {
    document.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            showMovieDetails(index);
        });
    });

    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            addToFavorites(index);
        });
    });
}

// Show movie details in modal
function showMovieDetails(index) {
    const movie = movies[index];
    modalContent.innerHTML = `
        <button class="modal-close" aria-label="Close modal">&times;</button>
        <h2 id="modal-title">${movie.title}</h2>
        <img id="modal-image" src="images/${movie.poster}" alt="${movie.title}" >
        <p id="modal-description">${movie.description}</p>
        <p><strong>Release Date:</strong> <span id="modal-release">${movie.year}</span></p>
        <p><strong>Genre:</strong> <span id="modal-genre">${movie.genre}</span></p>
    `;

    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // Focus trapping
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];
    firstEl.focus();

    modal.addEventListener('keydown', function trapFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else { // Tab
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close modal
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
}

// Close modal function
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

// Add to favorites in localStorage
// Add to favorites in localStorage
function addToFavorites(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movie = movies[index];

  if (!favorites.some(fav => fav.title === movie.title)) {
    favorites.push({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      poster: movie.poster, // just the file name, no "images/"
      description: movie.description
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${movie.title} added to Favorites!`);
  } else {
    alert(`${movie.title} is already in Favorites.`);
  }
}
// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize
loadMovies();

// action.js
const params = new URLSearchParams(window.location.search);
document.getElementById("fname").textContent = params.get("fname") || "";
document.getElementById("lname").textContent = params.get("lname") || "";
document.getElementById("displayEmail").textContent = params.get("email") || "Not Provided";
