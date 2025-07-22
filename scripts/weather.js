// 1. Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// 2. Set up API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=9913d95bcc0afd01a582a9de6cbf40ca';

// 3. Fetch data with async function
async function apiFetch() {
  try {
    const response = await fetch(url); // get the data
    if (response.ok) {
      const data = await response.json(); // parse the JSON
      console.log(data); // for testing
      displayResults(data); // call function to update page
    } else {
      throw Error(await response.text()); // error message
    }
  } catch (error) {
    console.log(error); // log error
  }
}
apiFetch(); // Call the function
function displayResults(weatherData) {
  currentTemp.innerHTML = `${weatherData.main.temp} °C`; // Show temp
  const iconSrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weatherIcon.setAttribute('src', iconSrc); // Set icon image
  weatherIcon.setAttribute('alt', weatherData.weather[0].description); // Alt text
  captionDesc.textContent = weatherData.weather[0].description; // Description
}
