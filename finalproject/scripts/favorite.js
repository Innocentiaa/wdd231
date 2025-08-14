// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Load favorites from localStorage
const favoritesContainer = document.getElementById("favorites-container");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  favoritesContainer.innerHTML = "<p>No favorite movies yet.</p>";
} else {
  favorites.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="images/${movie.poster}" alt="${movie.title}" width="300" height="200">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <button class="remove-btn" data-title="${movie.title}">Remove</button>
    `;

    favoritesContainer.appendChild(movieCard);
  });
}

// Remove favorite
favoritesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const title = e.target.dataset.title;
    favorites = favorites.filter(movie => movie.title !== title);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload();
  }
});
