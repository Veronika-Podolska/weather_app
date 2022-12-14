function showTemp(response) {
  celsiusDegree = response.data.main.temp;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;
  let temperatureSign = document.querySelector("#current-degree");
  temperatureSign.innerHTML = Math.round(celsiusDegree);
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = response.data.wind.speed;
  let description = document.querySelector("#current-description");
  description.innerHTML = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#main-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `0c395d6ecc2a4c8d0c6102ab57ade34d`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
search("San Diego");

function fetchData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", fetchData);

function getForecast(coordinates) {
  let apiKey = "0c395d6ecc2a4c8d0c6102ab57ade34d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;

  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecast =
        forecast +
        ` 
        <div class="col">
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="60" />
            <div class="forecast-degree">
            <span class = "forecast-degree-max">${Math.round(
              forecastDay.temp.max
            )}??</span> 
            <span class = "forecast-degree-min"> ${Math.round(
              forecastDay.temp.min
            )}??</span>
            </div>
        </div>`;
    }
  });

  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

function showCurrentTempLocation() {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `0c395d6ecc2a4c8d0c6102ab57ade34d`;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    function showCurrentTemp(response) {
      let cityName = document.querySelector("h1");
      cityName.innerHTML = response.data.name;
      let temperatureSign = document.querySelector("#current-degree");
      temperatureSign.innerHTML = Math.round(response.data.main.temp);
      let humidity = document.querySelector("#current-humidity");
      humidity.innerHTML = response.data.main.humidity;
      let wind = document.querySelector("#current-wind");
      wind.innerHTML = response.data.wind.speed;
      let description = document.querySelector("#current-description");
      description.innerHTML = response.data.weather[0].description;
      let weatherIcon = document.querySelector("#main-icon");
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    }
    axios.get(apiUrl).then(showCurrentTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentTempLocation);

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dateTime = document.querySelector("h2");
dateTime.innerHTML = `${day} ${hours}:${minutes}`;

let celsiusDegree = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-degree");
  let fahrenheitTemperature = Math.round((celsiusDegree * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}

let fahrehheitLink = document.querySelector("#fahrenheit-link");
fahrehheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-degree");
  temperature.innerHTML = Math.round(celsiusDegree);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
