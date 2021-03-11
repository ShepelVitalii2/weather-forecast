import fetchCountry from './API-service';
import debounce from 'lodash.debounce';
import currentDate from './currentDate';

import weatherCard from '../templates/weatherCard.hbs';
import { timingFunction } from './currentDate';
// import infoCard from '../templates/infoCard.hbs';
// import currentDate from '../js/currentDate'
// import renderWeatherCard from '../templates/renderWeatherCard.hbs';

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

  // onInput.addEventListener('click', debounce(onInputFill, 500));

  // .finally(() => form.reset());
}

// function fetchCountry(searchQuery) {
//   return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
//     return response.json();
//   });
// }
// }

fetchCountry.currentIpWeather().then(renderCountry).catch(onFetchError);

fetchCountry.currentIpWeather().then(renderNewCountry).catch(onFetchError);

function renderNewCountry() {
  const onInput = document.querySelector('.search-bar');
  const button = document.querySelector('.button');
  button.addEventListener('click', onInputFill);

  function onInputFill(e) {
    e.preventDefault;
    let searchQuery;

    // const form = e.target;
    searchQuery = onInput.value;
    console.log(searchQuery);

    fetchCountry
      .searchQueryWeather(searchQuery)
      .then(renderCountry)
      .catch(onFetchError);
  }
}

if (renderCountry) {
  timingFunction();
}

// function renderWeather(temp_c) {
//   main.innerHTML = infoCard(temp_c);
// }

// onInput.innerHTML = weatherCard();
