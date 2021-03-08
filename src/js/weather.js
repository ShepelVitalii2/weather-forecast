import fetchCountry from './API-service';
import debounce from 'lodash.debounce';

import weatherCard from '../templates/weatherCard.hbs';
import renderWeatherCard from '../templates/renderWeatherCard.hbs';

const onInput = document.querySelector('body');
// const cardContainer = document.createElement('div');
// cardContainer.classList.add('card-container');
// const cardContainer = document.querySelector('.js-card-container');

onInput.addEventListener('input', debounce(onInputFill, 500));
// cardContainer.addEventListener('input', debounce(onInputFill, 500));
const main = document.querySelector('body');

function onInputFill(e) {
  e.preventDefault();

  const form = e.target;
  const searchQuery = onInput;

  fetchCountry
    .currentIpWeather(searchQuery)
    .then(renderCountry)
    .catch(onFetchError);

  // .finally(() => form.reset);
}

function onFetchError() {
  alert(
    'Я извиняюсь, но что то пошло не так, как хотелось тому, кто очень хотел, что бы сдесь все работало...',
  );
}

function renderCountry(country) {
  cardContainer.innerHTML = renderWeatherCard(country);
}

onInput.innerHTML = weatherCard();

console.log(fetchCountry.ipCountry());
