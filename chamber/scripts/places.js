// Import places data
import { places } from '../data/places.mjs';

const showHere = document.querySelector("#allplaces");

// Modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalAddress = document.getElementById('modal-address');
const modalDescription = document.getElementById('modal-description');
const modalCloseBtn = document.getElementById('modal-close');

// Function to open modal and populate info
function openModal(place) {
  modalTitle.textContent = place.name;
  modalImg.src = `images/${place.photo_url}`;
  modalImg.alt = place.name;
  modalAddress.textContent = place.address;
  modalDescription.textContent = place.description;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

// Function to close modal
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modal.classList.contains('show')) {
    closeModal();
  }
});

// Display place cards with Learn More buttons
function displayItems(places) {
  places.forEach(x => {
    const thecard = document.createElement('div');

    const figure = document.createElement('figure');

    const thephoto = document.createElement('img');
    thephoto.src = `images/${x.photo_url}`;
    thephoto.alt = x.name;
    thephoto.width = 300;
    thephoto.height = 200;
    thephoto.loading = "lazy";

    figure.appendChild(thephoto);
    thecard.appendChild(figure);

    const thetitle = document.createElement('h2');
    thetitle.innerText = x.name;
    thecard.appendChild(thetitle);

    const theaddress = document.createElement('address');
    theaddress.innerText = x.address;
    thecard.appendChild(theaddress);

    const thedesc = document.createElement('p');
    thedesc.innerText = x.description.length > 100 ? x.description.substring(0, 100) + "..." : x.description;
    thecard.appendChild(thedesc);

    const thebutton = document.createElement('button');
    thebutton.innerText = "Learn More";
    thebutton.setAttribute('aria-label', `Learn more about ${x.name}`);
    thebutton.addEventListener('click', () => openModal(x));
    thecard.appendChild(thebutton);

    showHere.appendChild(thecard);
  });
}
displayItems(places);
