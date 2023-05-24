// DECLARACIÓN DE VARIABLES GLOBALES
// HORA Y FECHA ACTUAL//
let today = document.querySelector("#fecha");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//INPUT CIUDAD INGRESADA//
let cityElement = document.querySelector("h1");
// FORMULARIO
let searchForm = document.querySelector("#form");

//ACTUALIZAR HORA Y FECHA ACTUAL//
today.textContent = `${
  days[now.getDay()]
}, ${now.getHours()}:${now.getMinutes()}`;

// TRANSFORMAR DT A NOMBRE DE DÍAS
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

// MUESTRA PREDICCIÓN DE CLIMA DE LA SEMANA
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastContainer = document.querySelector("#info-adicional");
  let forecastHTML = `<div class="row" id="info-diaria1"> `;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-3 border border-2 rounded forecastInfo">
         <span>${Math.round(
           forecastDay.temp.max
         )}°</span> <img id="img-hot" src="images/hot.png" alt="tempHotIcon">
          <span>${Math.round(
            forecastDay.temp.min
          )}°</span> <img id="img-cold" src="images/cold.png" alt="tempColdIcon"> <br/>
          ${formatDay(forecastDay.dt)}</div>
              
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastContainer.innerHTML = forecastHTML;
}

//ACTUALIZAR H1 A CIUDAD INGRESADA//
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
  cityInput.value = " ";
}

searchForm.addEventListener("submit", search);

// It should display the name of the city on the result page and the current temperature of the city.

function searchCity(city) {
  let units = "metric";
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiBegin = "https://api.openweathermap.org/data/2.5/weather?q";

  let apiUrl = `${apiBegin}=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperatureInput);
}

// OBTENER DATOS PARA EL FORECAST
function getForecast(coordinates) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiForecastUrl).then(displayForecast);
}

// MUESTRA LA TEMPERATURA ACTUAL
function displayTemperatureInput(response) {
  let city = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#temp-now");
  let actualTiempo = document.querySelector("#tiempo");
  let porcentajeHumedad = document.querySelector("#humedad");
  let actualViento = document.querySelector("#velocidadViento");

  city.innerHTML = response.data.name;
  actualTemp.innerHTML = temperature;
  actualTiempo.innerHTML = response.data.weather[0].description;
  porcentajeHumedad.innerHTML = response.data.main.humidity;
  actualViento.innerHTML = response.data.wind.speed;

  // OBTENER COORDENADAS PARA EL FORECAST
  getForecast(response.data.coord);
}

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

searchCity("Quito");
