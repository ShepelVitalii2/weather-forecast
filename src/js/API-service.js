const IP_TOKEN = '9386691d4def67';
const CURRENT_WEATHER_TOKEN = '399ec48b854042bfac8135036210503';
const WEATHER_CLIMACELL_KEY = '5IzfMZ06ljmfAW51wSDZDVyAi5PGjpWG';

const BG_PICTURE_ACCESS_KEY = 'ZjIEjPhNuTau-_xR4i1T6wDwPla3W2lrDFQ8jycJAQo';
const BG_PICTURE_SECRET_KEY = 'HNaOrcu8uFP7YrkuWeImUaZ-M86Af4yuc1UuOtR58tE';
const BG_PICTURE_API = 'https://api.unsplash.com/';

// текущая сводка погоды по запросу из строки
const searchQueryWeather = searchQuery => {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${searchQuery}&days=3`,
  ).then(response => response.json());
};

//текущая погода по месту пользователя
const currentIpWeather = () => {
  // айпи текущего пользователя, геолокация
  let result = fetch(`https://ipinfo.io/json?token=${IP_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      let ipCountry = data.ip;
      return fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${ipCountry}`,
      );
    })
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
  return result;
};

// прогноз погоды на 3 дня, заменить на страну приходящую из поиска
const currentIpWeatherForThreeDays = () => {
  // айпи текущего пользователя, геолокация
  let result = fetch(`https://ipinfo.io/json?token=${IP_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      let ipCountry = data.ip;
      return fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${ipCountry}&days=3`,
      );
    })
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
  return result;
};

const test = () => {
  // айпи текущего пользователя, геолокация
  let result = fetch(`https://ipinfo.io/json?token=${IP_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      let ipCountry = data.ip;
      return fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${CURRENT_WEATHER_TOKEN}&q=${ipCountry}&days=3`,
      );
    })
    .then(response => response.json())
    .then(r => console.log(r))
    .catch(error => {
      console.log('Request failed', error);
    });

  return result;
};
test();

function randomBgPicture() {
  return fetch(
    `${BG_PICTURE_API}photos/random?orientation=landscape&per_page=1&query=nature&client_id=${BG_PICTURE_ACCESS_KEY}`,
  )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse.id));
}

// const fetchCountryAndWeather = () => {
//   return Promise.all([currentIpWeather(), currentIpWeatherForThreeDays()]).then(
//     data => {
//       const oneDayWeather = data[0];
//       // console.log(firstAPI);

//       const threeDaysWeather = data[1];

//       const combinedData = { oneDayWeather, threeDaysWeather };
//       console.log(combinedData);
//       return combinedData;
//     },
//   );
// };

// fetchCountryAndWeather();

export default {
  currentIpWeather,
  currentIpWeatherForThreeDays,
  randomBgPicture,
  searchQueryWeather,
  // fetchCountryAndWeather,
  // fetchCountryAndWeather,
};
