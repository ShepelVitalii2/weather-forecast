import fetchCountry from './API-service';
// import debounce from 'lodash.debounce';
// import currentDate from './currentDate';
// import map from './map';

import weatherCard from '../templates/weatherCard.hbs';
import weatherCardF from '../templates/weatherCardF.hbs';
import weatherCardSQ from '../templates/weatherCardSQ.hbs';
import weatherCardRus from '../templates/weatherCardRus.hbs';
import weatherCardRusF from '../templates/weatherCardRusF.hbs';
import { timingFunction } from './currentDate';

const body = document.querySelector('body');
const main = document.querySelector('.weather-container');
const onInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const onImgBtnClick = document.querySelector('.picture-button');
const onChangeTempClick = document.querySelector('.temperature-button');
const onChangeLangClick = document.querySelector('.language-button');

let setLanguage = null;

fetchAndRenderCountry();

function onFetchError() {
  alert('Дела...');
}
onImgBtnClick.addEventListener('click', () => {
  // location.href = location.href;
  body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?weather,water')";
});

onChangeTempClick.addEventListener('click', () => {
  onChangeTempClick.classList.toggle('temperature');

  // if (onChangeTempClick.classList.contains('temperature')) {
  //   fetchAndRenderCountry();
  // } else {
  //   fetchAndRenderCountryF();
  // }

  if (
    onChangeTempClick.classList.contains('temperature') &&
    setLanguage !== true
  ) {
    fetchAndRenderCountry();
  }
  if (
    !onChangeTempClick.classList.contains('temperature') &&
    setLanguage !== true
  ) {
    fetchAndRenderCountryF();
  }
  if (
    onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true
  ) {
    fetchAndRenderCountryRus();
  }
  if (
    !onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true
  ) {
    fetchAndRenderCountryRusF();
  }
});

searchButton.addEventListener('click', e => {
  e.preventDefault();

  let searchQuery;

  searchQuery = onInput.value;

  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQ)
    .catch(onFetchError);
  // .finally(onInput.reset());
});

onChangeLangClick.addEventListener('click', e => {
  onChangeLangClick.classList.toggle('language');
  setLanguage = true;
  console.log(setLanguage);

  if (!onChangeLangClick.classList.contains('language')) {
    fetchAndRenderCountry();
    setLanguage = false;
  } else {
    fetchAndRenderCountryRus();
  }
});

function fetchAndRenderCountry() {
  fetchCountry
    .currentIpWeatherForThreeDays()
    .then(renderCountry)
    .catch(onFetchError);
}

function fetchAndRenderCountryF() {
  fetchCountry
    .currentIpWeatherForThreeDays()
    .then(renderCountryF)
    .catch(onFetchError);
}

function fetchAndRenderCountryRus() {
  fetchCountry.currentGeolocation().then(renderCountryRus).catch(onFetchError);
}

function fetchAndRenderCountryRusF() {
  fetchCountry.currentGeolocation().then(renderCountryRusF).catch(onFetchError);
}

function renderCountry(city, country) {
  main.innerHTML = weatherCard(city, country);
}

function renderCountryF(temp) {
  main.innerHTML = weatherCardF(temp);
}
function renderCountrySQ(city, country) {
  main.innerHTML = weatherCardSQ(city, country);
}
function renderCountryRus(city, country) {
  main.innerHTML = weatherCardRus(city, country);
}
function renderCountryRusF(city, country) {
  main.innerHTML = weatherCardRusF(city, country);
}

timingFunction();
