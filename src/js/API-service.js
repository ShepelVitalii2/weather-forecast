import { renderCountry, renderCountryF } from './weather';
const regeneratorRuntime = require('regenerator-runtime');

const IP_TOKEN = '9386691d4def67';
const CURRENT_WEATHER_TOKEN = '399ec48b854042bfac8135036210503';
const WEATHER_CLIMACELL_KEY = '5IzfMZ06ljmfAW51wSDZDVyAi5PGjpWG';

const GEOLOCATION_KEY = '6d91cc1f03eb4d91b51f4d7f414c7d86';
const GEOLOCATION_URL = 'https://api.opencagedata.com/geocode/v1/json';

const BG_PICTURE_ACCESS_KEY = 'ZjIEjPhNuTau-_xR4i1T6wDwPla3W2lrDFQ8jycJAQo';
const BG_PICTURE_SECRET_KEY = 'HNaOrcu8uFP7YrkuWeImUaZ-M86Af4yuc1UuOtR58tE';
const BG_PICTURE_API = 'https://api.unsplash.com/';
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hlcGVsdml0YWxpaSIsImEiOiJja203bTE4Y2MwODRwMnZtZG5nbzcwaDE4In0.opG7VQE2SlptoHoBdmOfKA';

let nextResult;

// console.log(nextResult);

// текущая сводка погоды по запросу из строки
// const searchQueryWeather = async searchQuery => {
//   queryResult = fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${searchQuery}&days=3`,
//   )
//     .then(response => response.json())
//     .then(r => r.json());

//   searchQueryWeather()
// .then(() => {
//   getMapPosition().then(() => {
//     new mapboxgl.Map({
//       container: 'map', // container id
//       style: 'mapbox://styles/mapbox/streets-v11', // style URL
//       center: [searchQuery.location.lon, searchQuery.location.lat], // starting position [lng, lat]
//       zoom: 9, // starting zoom
//     });
//   });
// });
// };

const searchQueryGeolocation = async searchQuery => {
  const queryResultGeolocation = await fetch(
    `${GEOLOCATION_URL}?q=${searchQuery}&key=${GEOLOCATION_KEY}`,
  ).then(r => r.json());

  const queryResultWather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${searchQuery}&days=3`,
  ).then(response => response.json());

  const result = { queryResultGeolocation, queryResultWather };

  return result;
};
const currentGeolocation = async () => {
  const currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${IP_TOKEN}`,
  ).then(response => response.json());

  const queryResultGeolocation = await fetch(
    `${GEOLOCATION_URL}?q=${currentLocationInfo.city}&key=${GEOLOCATION_KEY}`,
  ).then(r => r.json());

  const queryResultWather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}&days=3`,
  ).then(response => response.json());

  const result = { queryResultGeolocation, queryResultWather };
  console.log(result);
  return result;
};
// currentGeolocation();
// searchQueryGeolocation();
// console.log(queryResult);
// new mapboxgl.Map({
//   container: 'map', // container id
//   style: 'mapbox://styles/mapbox/streets-v11', // style URL
//   center: [
//     queryResult.results[1].geometry.lng,
//     queryResult.results[1].geometry.lat,
//   ], // starting position [lng, lat]
//   zoom: 9, // starting zoom
// });

//   return queryResult;
// };
// (async () => {
//   searchQueryGeolocation().then(() => {
//     new mapboxgl.Map({
//       container: 'map', // container id
//       style: 'mapbox://styles/mapbox/streets-v11', // style URL
//       center: [nextResult.location.lon, nextResult.location.lat], // starting position [lng, lat]
//       zoom: 9, // starting zoom
//     });
//   });
// })();

// let queryResult;
// console.log(queryResult);

// const searchQueryGeolocation = searchQuery => {
//   return fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=6d91cc1f03eb4d91b51f4d7f414c7d86`,
//   )
//     .then(r => r.json())
//     .then(r => console.log(r.results));
// };

//текущая погода по месту пользователя
const currentIpWeather = async () => {
  // айпи текущего пользователя, геолокация
  let currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${IP_TOKEN}`,
  ).then(response => response.json());
  let currentWeatherInfo = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
  console.log(currentLocationInfo);
  return currentWeatherInfo;
};

// прогноз погоды на 3 дня, заменить на страну приходящую из поиска
const currentIpWeatherForThreeDays = async () => {
  // айпи текущего пользователя, геолокация
  let currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${IP_TOKEN}`,
  ).then(response => response.json());
  let currentWeatherInfo = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}&days=3`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
  return currentWeatherInfo;
};

function randomBgPicture() {
  return fetch(
    `${BG_PICTURE_API}photos/random?orientation=landscape&per_page=1&query=nature&client_id=${BG_PICTURE_ACCESS_KEY}`,
  ).then(response => response.json());
}

const getMapPosition = async () => {
  // айпи текущего пользователя, геолокация
  let result = await fetch(
    `https://ipinfo.io/json?token=${IP_TOKEN}`,
  ).then(response => response.json());
  nextResult = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${result.ip}`,
  ).then(r => r.json());
  // console.log(nextResult);
  return nextResult;
};

(async () => {
  const onChangeTempClick = document.querySelector('.temperature-button');
  onChangeTempClick.addEventListener('click', () => {
    setTimeout(() => {
      mapRendering();
    }, 500);
  });
  window.onload = function () {
    mapRendering();
  };

  function mapRendering() {
    getMapPosition().then(() => {
      new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [nextResult.location.lon, nextResult.location.lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    });
  }
})();

export default {
  currentIpWeather,
  currentIpWeatherForThreeDays,
  randomBgPicture,
  // searchQueryWeather,
  getMapPosition,
  searchQueryGeolocation,
  currentGeolocation,
};
