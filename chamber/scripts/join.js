// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = document.lastModified;

// Toggle navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.textContent = navList.classList.contains("open") ? "✖" : "☰";
});

// Set timestamp value on page load

const form = document.querySelector('form');
form.addEventListener('submit', () => {
  const timestampField = form.querySelector('[name="timestamp"]');
  timestampField.value = new Date().toISOString();
});

// Modal functions
function showModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
