

// Display current year
document.querySelector("#year").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".navigation");



const temp = document.querySelector('#current-temp');
const icon = document.querySelector('#weather-icon');
const desc = document.querySelector('#weather-desc');
const forecastDiv = document.querySelector('#forecast');

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=metric&appid=9913d95bcc0afd01a582a9de6cbf40ca`;

async function getWeather() {
  const res = await fetch(url);
  const data = await res.json();

  // Current
  const current = data.list[0];
  temp.innerHTML = `${current.main.temp} °C`;
  icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  icon.alt = current.weather[0].description;
  desc.textContent = current.weather[0].description;

  // 3-day forecast (filter for "12:00:00" times)
  const daily = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
  forecastDiv.innerHTML = '';
  daily.forEach(day => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
      <p>${day.main.temp} °C</p>
    `;
    forecastDiv.appendChild(card);
  });
}
getWeather();

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuToggle.textContent = navList.classList.contains("open") ? "✖" : "☰";
});