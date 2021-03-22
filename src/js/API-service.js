import constants from './constants';

const regeneratorRuntime = require('regenerator-runtime');

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hlcGVsdml0YWxpaSIsImEiOiJja203bTE4Y2MwODRwMnZtZG5nbzcwaDE4In0.opG7VQE2SlptoHoBdmOfKA';

let result;

const searchQueryGeolocation = async searchQuery => {
  const queryResultGeolocation = await fetch(
    `${constants.GEOLOCATION_URL}?q=${searchQuery}&key=${constants.GEOLOCATION_KEY}`,
  ).then(response => response.json());

  const queryResultWather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${searchQuery}&days=3`,
  ).then(response => response.json());

  const result = { queryResultGeolocation, queryResultWather };

  (async () => {
    await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${searchQuery}&days=3`,
    )
      .then(response => response.json())
      .then(() => {
        new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [
            queryResultGeolocation.results[0].geometry.lng,
            queryResultGeolocation.results[0].geometry.lat,
          ], // starting position [lng, lat]
          zoom: 9, // starting zoom
        });
      });
  })();
  return result;
};
const currentGeolocation = async () => {
  const currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${constants.IP_TOKEN}`,
  ).then(response => response.json());

  const queryResultGeolocation = await fetch(
    `${constants.GEOLOCATION_URL}?q=${currentLocationInfo.city}&key=${constants.GEOLOCATION_KEY}`,
  ).then(response => response.json());

  const queryResultWather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}&days=3`,
  ).then(response => response.json());

  let currentWeatherInfo = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });

  result = { queryResultGeolocation, queryResultWather, currentWeatherInfo };
  // console.log(result);
  return result;
};

//текущая погода по месту пользователя
const currentIpWeather = async () => {
  // айпи текущего пользователя, геолокация
  let currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${constants.IP_TOKEN}`,
  ).then(response => response.json());
  let currentWeatherInfo = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });

  return currentWeatherInfo;
};

// прогноз погоды на 3 дня, заменить на страну приходящую из поиска
const currentIpWeatherForThreeDays = async () => {
  // айпи текущего пользователя, геолокация
  let currentLocationInfo = await fetch(
    `https://ipinfo.io/json?token=${constants.IP_TOKEN}`,
  ).then(response => response.json());
  let currentWeatherInfo = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${constants.CURRENT_WEATHER_TOKEN}&q=${currentLocationInfo.ip}&days=3`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });

  return currentWeatherInfo;
};

function randomBgPicture() {
  return fetch(
    `${constants.BG_PICTURE_API}photos/random?orientation=landscape&per_page=1&query=nature&client_id=${constants.BG_PICTURE_ACCESS_KEY}`,
  ).then(response => response.json());
}

(async () => {
  const onChangeTempClick = document.querySelector('.temperature-button');
  const onImgBtnClick = document.querySelector('.language-button');
  const onInput = document.querySelector('.search-bar');
  onChangeTempClick.addEventListener('click', () => {
    if (onInput.value !== '') {
      return;
    }
    setTimeout(() => {
      mapRendering();
    }, 500);
  });
  onImgBtnClick.addEventListener('click', () => {
    if (onInput.value !== '') {
      return;
    }
    setTimeout(() => {
      mapRendering();
    }, 500);
  });

  setTimeout(() => {
    mapRendering();
  }, 500);

  function mapRendering() {
    currentGeolocation().then(() => {
      new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [
          result.queryResultGeolocation.results[0].geometry.lng,
          result.queryResultGeolocation.results[0].geometry.lat,
        ], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    });
  }
})();

export default {
  currentIpWeather,
  currentIpWeatherForThreeDays,
  randomBgPicture,
  searchQueryGeolocation,
  currentGeolocation,
};
