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

function displayCurrentWeather(response) {
  console.log(response.data);
  let degreeNumber = Math.round(response.data.main.temp);
  let humidNumber = Math.round(response.data.main.humidity);
  let windNumber = Math.round(response.data.wind.speed);

  celsiusTemp = Math.round(response.data.main.temp);

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-degree").innerHTML = `${celsiusTemp}`;
  document.querySelector("#current-humidity").innerHTML = `${humidNumber}%`;
  document.querySelector("#current-wind").innerHTML = `${windNumber} km/h`;
  let iconWeather = document.querySelector("#icon");
  iconWeather.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  searchCity(city.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitMath = (celsiusTemp * 9) / 5 + 32;
  // remove class from celsius link
  celsiusLink.classList.remove("unit");
  fahrenheitLink.classList.add("unit");
  let degreeNumber = document.querySelector("#current-degree");
  degreeNumber.innerHTML = Math.round(fahrenheitMath);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("unit");
  fahrenheitLink.classList.remove("unit");
  let degreeNumber = document.querySelector("#current-degree");
  degreeNumber.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#farenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Mexico City");

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
