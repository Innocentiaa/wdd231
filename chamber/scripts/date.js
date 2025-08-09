// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = document.lastModified;

// Menu toggle for mobile nav
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.textContent = navList.classList.contains("open") ? "✖" : "☰";
});

// Display last visit message using localStorage
const visitDisplay = document.getElementById("visit-message");
const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  const daysBetween = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysBetween === 0) {
    visitDisplay.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitDisplay.textContent = "You last visited this page 1 day ago.";
  } else {
    visitDisplay.textContent = `You last visited this page ${daysBetween} days ago.`;
  }
} else {
  visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("lastVisit", today);
