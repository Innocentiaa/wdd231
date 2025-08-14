// Select modal elements
const modal = document.getElementById('movie-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalRelease = document.getElementById('modal-release');
const modalGenre = document.getElementById('modal-genre');
const modalClose = document.getElementById('modal-close');

// Function to open modal with movie data
function openModal(movie) {
  modalTitle.textContent = movie.title;
  modalImage.src = movie.poster;
  modalImage.alt = movie.title;
  modalDescription.textContent = movie.description;
  modalRelease.textContent = movie.releaseDate;
  modalGenre.textContent = movie.genre;

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

// Close modal function
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event listeners
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Attach modal opening to movie cards (adjust selector to your card class)
document.querySelectorAll('.movie-card').forEach(card => {
  card.addEventListener('click', () => {
    const movie = {
      title: card.dataset.title,
      poster: card.dataset.poster,
      description: card.dataset.description,
      releaseDate: card.dataset.release,
      genre: card.dataset.genre
    };
    openModal(movie);
  });
});
