// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = document.lastModified;

const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.textContent = navList.classList.contains("open") ? "✖" : "☰";
});

import {places} from '../data/places.mjs';
console.log(places);

const showHere = document.querySelector("#allplaces");

function displayItems(places) {
    places.forEach(x => {
        const thecard = document.createElement('div');

        const thephoto = document.createElement('img');
        thephoto.src = `images/${x.photo_url}`;
        
        thephoto.alt = x.name;
        thephoto.width = 300;
        thephoto.height = 200;
        
        thecard.appendChild(thephoto);

        const thetitle = document.createElement('h2');
        thetitle.innerText = x.name;
        thecard.appendChild(thetitle);

        const theaddress = document.createElement('address');
        theaddress.innerText = x.address;
        thecard.appendChild(theaddress);

        const thedesc = document.createElement('p');
        thedesc.innerText = x.description;
        thecard.appendChild(thedesc);

        showHere.appendChild(thecard);
    })

}
displayItems(places);

const visitDisplay = document.createElement("p");
const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
    const daysBetween = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    visitDisplay.textContent = `You last visited this page ${daysBetween} day(s) ago.`;

} else {
    visitDisplay.textContent = "Welcome! This is your first time visiting.";
}

localStorage.setItem("lastVisit", today);
document.querySelector("main").prepend(visitDisplay);


