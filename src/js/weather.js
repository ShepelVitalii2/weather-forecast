import fetchCountry from './API-service';
import debounce from 'lodash.debounce';

import weatherCard from '../templates/weatherCard.hbs';
import infoCard from '../templates/infoCard.hbs';
// import renderWeatherCard from '../templates/renderWeatherCard.hbs';

// const onInput = document.querySelector('body');

// onInput.addEventListener('input', debounce(onInputFill, 500));
// cardContainer.addEventListener('input', debounce(onInputFill, 500));
const main = document.querySelector('body');

function onInputFill(e) {
  e.preventDefault();

  // const form = e.target;
  // const searchQuery = onInput;

  fetchCountry.ipCountry().then(renderCountry).catch(onFetchError);

  // .finally(() => form.reset);
}

function onFetchError() {
  alert('Дела...');
}

function renderCountry(city, country) {
  main.innerHTML = weatherCard(city, country);
}

fetchCountry.ipCountry().then(renderCountry).catch(onFetchError);

fetchCountry.currentIpWeather();

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
