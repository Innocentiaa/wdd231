
const toggleBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  navMenu.classList.toggle("hidden");
});
