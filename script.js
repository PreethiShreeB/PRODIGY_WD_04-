const userInput = document.getElementById('user-location');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

const apiKey = 'YOUR_API_KEY'; // Replace with your actual weather API key

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`; // Metric units by default

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherInfo(data);
    })
    .catch(error => {
      console.error(error);
      weatherInfo.textContent = "Error: Could not fetch weather data.";
    });
}

function displayWeatherInfo(data) {
  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <p>Weather: ${data.weather[0].main}</p>
    <p>Temperature: ${data.main.temp}&#xb0;C</p>
    <p>Feels Like: ${data.main.feels_like}&#xb0;C</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

searchBtn.addEventListener('click', function() {
  const location = userInput.value;
  if (location) {
    getWeatherData(location);
  } else {
    // Handle empty user input (optional: display an error message)
  }
});

// Get user location with permission (optional):
navigator.geolocation.getCurrentPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherData(`${lat},${lon}`); // Use latitude and longitude for location
}, function() {
  console.log("Geolocation permission denied.");
});
