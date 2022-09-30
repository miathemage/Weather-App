let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[date.getDay()];
let currentHours = date.getHours();
let currentMinutes = ("0" + date.getMinutes()).slice(-2);

let h6 = document.querySelector("h6");
h6.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

function defaultTemp(response) {
  console.log(response.data);
  let defaultTemperature = document.querySelector("#current-degree");
  let defaultCity = document.querySelector("#current-city");
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  defaultCity.innerHTML = city;
}

let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let city = "Mexico City";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(defaultTemp);

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function displayCurrentWeather(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let degreeNumber = Math.round(response.data.main.temp);
  let humidNumber = Math.round(response.data.main.humidity);
  let windNumber = Math.round(response.data.wind.speed);
  document.querySelector("#current-degree").innerHTML = `${degreeNumber}`;
  document.querySelector("#current-humidity").innerHTML = `${humidNumber}%`;
  document.querySelector("#current-wind").innerHTML = `${windNumber} km/h`;
  let iconWeather = document.querySelector("#icon");
  iconWeather.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", currentLocation);

function convertToCelsius(event) {
  event.preventDefault();
  let currentCelsius = document.querySelector("#current-degree");
  currentCelsius.innerHTML = 21;
}

function convertToFarenheit(event) {
  event.preventDefault();
  let currentFarenheit = document.querySelector("#current-degree");
  currentFarenheit.innerHTML = Math.round(21 * 1.7 + 32);
}

let changeCelsius = document.querySelector("#celsius");
changeCelsius.addEventListener("click", convertToCelsius);

let changeFarenheit = document.querySelector("#farenheit");
changeFarenheit.addEventListener("click", convertToFarenheit);
