const IP_TOKEN = '9386691d4def67';
const CURRENT_WEATHER_TOKEN = '399ec48b854042bfac8135036210503';
const WEATHER_CLIMACELL_KEY = '5IzfMZ06ljmfAW51wSDZDVyAi5PGjpWG';

const BG_PICTURE_ACCESS_KEY = 'ZjIEjPhNuTau-_xR4i1T6wDwPla3W2lrDFQ8jycJAQo';
const BG_PICTURE_SECRET_KEY = 'HNaOrcu8uFP7YrkuWeImUaZ-M86Af4yuc1UuOtR58tE';
const BG_PICTURE_API = 'https://api.unsplash.com/';

// var myTemplate = Handlebars.compile($('#weather').html());

// айпи текущего пользователя, геолокация
const ipCountry = () =>
  fetch(`https://ipinfo.io/json?token=${IP_TOKEN}`)
    .then(response => response.json())
    // .then(jsonResponse => console.log(jsonResponse))
    .then(function (data) {
      console.log(data);
      const posts = { posts: data };
      '#weather'.append(myTemplate(posts));
    });

// текущая сводка погоды текущего пользователя
function currentIpWeather() {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${ipCountry}`,
  )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse.current));
}

// прогноз погоды на 3 дня, заменить на страну приходящую из поиска
function currentIpWeatherForThreeDays() {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${ipCountry}&days=3`,
  )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse.current));
}

function randomBgPicture() {
  return fetch(
    `${BG_PICTURE_API}photos/random?orientation=landscape&per_page=1&query=nature&client_id=${BG_PICTURE_ACCESS_KEY}`,
  )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse.id));
}

// function fetchCountry(searchQuery) {
//   return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
//     return response.json();
//   });
// }

export default {
  ipCountry,
  currentIpWeather,
  currentIpWeatherForThreeDays,
  randomBgPicture,
};
