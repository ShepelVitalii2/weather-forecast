import fetchCountry from './API-service';
import debounce from 'lodash.debounce';
import currentDate from './currentDate';

import weatherCard from '../templates/weatherCard.hbs';
import { timingFunction } from './currentDate';
// import infoCard from '../templates/infoCard.hbs';
// import currentDate from '../js/currentDate'
// import renderWeatherCard from '../templates/renderWeatherCard.hbs';

// const onInput = document.querySelector('body');

// onInput.addEventListener('input', debounce(onInputFill, 500));
// cardContainer.addEventListener('input', debounce(onInputFill, 500));
const main = document.querySelector('body');

// function onInputFill(e) {
//   e.preventDefault();

//   // const form = e.target;
//   // const searchQuery = onInput;

//   fetchCountry.ipCountry().then(renderCountry).catch(onFetchError);

//   // .finally(() => form.reset);
// }

function onFetchError() {
  alert('Дела...');
}

function renderCountry(city, country) {
  main.innerHTML = weatherCard(city, country);
}

fetchCountry.fetchCountryAndWeather().then(renderCountry).catch(onFetchError);

if (renderCountry) {
  timingFunction();
}

// console.log(fetchCountry.fetchCountryAndWeather());
// fetchCountry.fetchCountryAndWeather();

// const weatherContainer = document.querySelector('.weather');
// console.log(weatherContainer);

// function renderWeather(temp_c) {
//   main.innerHTML = infoCard(temp_c);
// }

// fetchCountry.currentIpWeather().then(renderWeather).catch(onFetchError);

// const render = fetchCountry.ipCountry().then(renderCountry);
// console.log(render);

// onInput.innerHTML = weatherCard();

// console.log(fetchCountry.ipCountry());

// currentTime;
