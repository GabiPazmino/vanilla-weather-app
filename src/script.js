// DECLARACIÓN DE VARIABLES GLOBALES
// HORA Y FECHA ACTUAL//
let today = document.querySelector("#fecha");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuersday",
  "Fryday",
  "Saturday",
];
//INPUT CIUDAD INGRESADA//
let cityElement = document.querySelector("h1");
// FORMULARIO
let searchForm = document.querySelector("#form");
// BOTÓN POSICIÓN ACTUAL
let currentBoton = document.querySelector("#current");
// TRAE LA INFO DINÁMICA DE TEMPERATURA DE LA VARIABLE LOCAL PARA SER UTILIZADA GLOBALMENTE
let celsiusTemperature = null;
// GRADOS FAHRENHEIT
let fahrenheitLink = document.querySelector("#fahrenheit");
// GRADOS CELSIUS
let celsiustLink = document.querySelector("#celsius");

//ACTUALIZAR HORA Y FECHA ACTUAL//
today.textContent = `${
  days[now.getDay()]
}, ${now.getHours()}:${now.getMinutes()}`;

// MUESTRA PREDICCIÓN DE CLIMA DE LA SEMANA
function displayForecast() {
  let forecastContainer = document.querySelector("#info-adicional");
  let forecastHTML = `<div class="row" id="info-diaria1"> `;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-3 border border-2 rounded">
         <span>10</span> <img id="img-hot" src="images/hot.png" alt="tempHotIcon">
          <span>10</span> <img id="img-cold" src="images/cold.png" alt="tempColdIcon"> <br/>
          ${day}</div>
                 
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastContainer.innerHTML = forecastHTML;
}

//ACTUALIZAR H1 A CIUDAD INGRESADA//
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

searchForm.addEventListener("submit", search);

// It should display the name of the city on the result page and the current temperature of the city.

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let units = "metric";
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiBegin = "https://api.openweathermap.org/data/2.5/weather?q";

  let apiUrl = `${apiBegin}=${cityInput.value}&units=${units}&appid=${apiKey}`;

  cityInput.value = " ";

  axios.get(apiUrl).then(displayTemperatureInput);
}

// MUESTRA LA TEMPERATURA ACTUAL
function displayTemperatureInput(response) {
  let temperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#temp-now");
  let actualTiempo = document.querySelector("#tiempo");
  let porcentajeHumedad = document.querySelector("#humedad");
  let actualViento = document.querySelector("#velocidadViento");

  actualTemp.innerHTML = temperature;
  actualTiempo.innerHTML = response.data.weather[0].description;
  porcentajeHumedad.innerHTML = response.data.main.humidity;
  actualViento.innerHTML = response.data.wind.speed;
}

searchForm.addEventListener("submit", enterCity);

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiBegin = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiBegin}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

// MUESTRA INFORMACIÓN ACTUAL DE VARIABLES DE CLIMA
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#temp-now");
  let actualTiempo = document.querySelector("#tiempo");
  let porcentajeHumedad = document.querySelector("#humedad");
  let actualViento = document.querySelector("#velocidadViento");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  actualTemp.innerHTML = temperature;
  actualTiempo.innerHTML = response.data.weather[0].description;
  porcentajeHumedad.innerHTML = response.data.main.humidity;
  actualViento.innerHTML = response.data.wind.speed;
}

// PERMITIR USAR LOCALIZACIÓN ACTUAL
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

currentBoton.addEventListener("click", getCurrentPosition);

// CHANGE TEMPERATURE UNITS TO FAHRENHEIT
function displayFahrenheit(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector("#temp-now");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  displayTemperature.textContent = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("selected");
  celsiustLink.classList.remove("selected");
}

fahrenheitLink.addEventListener("click", displayFahrenheit);

// CHANGE TEMPERATURE UNITS TO CELSIUS
function displayCelsius(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector("#temp-now");

  displayTemperature.textContent = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("selected");
  celsiustLink.classList.add("selected");
}

celsiustLink.addEventListener("click", displayCelsius);

displayForecast();
