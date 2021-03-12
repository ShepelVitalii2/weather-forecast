import fetchCountry from './API-service';
// import debounce from 'lodash.debounce';
// import currentDate from './currentDate';

import weatherCard from '../templates/weatherCard.hbs';
import { timingFunction } from './currentDate';

const main = document.querySelector('body');
main.addEventListener('DOMSubtreeModified', loadFunction);

fetchCountry
  .currentIpWeatherForThreeDays()
  .then(renderCountry)
  .catch(onFetchError);

function onFetchError() {
  alert('Дела...');
}

function loadFunction(e) {
  const onInput = document.querySelector('.search-bar');
  const button = document.querySelector('.search-button');

  button.addEventListener('click', onInputFill);
  // button.removeEventListener;

  function onInputFill(e) {
    e.preventDefault;

    let searchQuery;

    searchQuery = onInput.value;

    fetchCountry
      .searchQueryWeather(searchQuery)
      .then(renderCountry)
      .catch(onFetchError);
  }
}

function renderCountry(city, country) {
  main.innerHTML = weatherCard(city, country);
}

if (renderCountry) {
  timingFunction();
}
