import fetchCountry from './API-service';

import refs from './refs';

import weatherCard from '../templates/weatherCard.hbs';
import weatherCardF from '../templates/weatherCardF.hbs';
import weatherCardSQ from '../templates/weatherCardSQ.hbs';
import weatherCardRus from '../templates/weatherCardRus.hbs';
import weatherCardRusF from '../templates/weatherCardRusF.hbs';
import { timingFunction } from './currentDate';

// const body = document.querySelector('body');
// const main = document.querySelector('.weather-container');
// const onInput = document.querySelector('.search-bar');
// const searchButton = document.querySelector('.search-button');
// const onImgBtnClick = document.querySelector('.picture-button');
// const onChangeTempClick = document.querySelector('.temperature-button');
// const onChangeLangClick = document.querySelector('.language-button');

let setLanguage = null;

window.addEventListener('DOMContentLoaded', () => {
  if (
    localStorage.getItem('settings') === 'englishC' ||
    localStorage.getItem('settings') === null
  ) {
    fetchAndRenderCountry();
  }
  if (localStorage.getItem('settings') === 'englishF') {
    fetchAndRenderCountryF();
  }
  if (localStorage.getItem('settings') === 'russianC') {
    fetchAndRenderCountryRus();
  }
  if (localStorage.getItem('settings') === 'russianF') {
    fetchAndRenderCountryRusF();
  }
});

function onFetchError() {
  alert('Дела...');
}
refs.onImgBtnClick.addEventListener('click', () => {
  // location.href = location.href;
  refs.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?weather,water')";
});

refs.onChangeTempClick.addEventListener('click', () => {
  refs.onChangeTempClick.classList.toggle('temperature');

  if (
    refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage !== true
  ) {
    fetchAndRenderCountry();
    localStorage.clear();
    localStorage.setItem('settings', 'englishC');
  }
  if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage !== true
  ) {
    fetchAndRenderCountryF();
    localStorage.clear();
    localStorage.setItem('settings', 'englishF');
  }
  if (
    refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true
  ) {
    fetchAndRenderCountryRus();
    localStorage.clear();
    localStorage.setItem('settings', 'russianC');
  }
  if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true
  ) {
    fetchAndRenderCountryRusF();
    localStorage.clear();
    localStorage.setItem('settings', 'russianF');
  }
});

refs.searchButton.addEventListener('click', e => {
  e.preventDefault();

  let searchQuery;

  searchQuery = onInput.value;

  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQ)
    .catch(onFetchError);
  // .finally(onInput.reset());
});

refs.onChangeLangClick.addEventListener('click', () => {
  refs.onChangeLangClick.classList.toggle('language');
  setLanguage = true;
  console.log(setLanguage);

  if (!refs.onChangeLangClick.classList.contains('language')) {
    localStorage.clear();
    localStorage.setItem('settings', 'englishC');
    fetchAndRenderCountry();

    setLanguage = false;
  } else {
    localStorage.clear();
    localStorage.setItem('settings', 'russianC');
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
  refs.main.innerHTML = weatherCard(city, country);
}

function renderCountryF(temp) {
  refs.main.innerHTML = weatherCardF(temp);
}
function renderCountrySQ(city, country) {
  refs.main.innerHTML = weatherCardSQ(city, country);
}
function renderCountryRus(city, country) {
  refs.main.innerHTML = weatherCardRus(city, country);
}
function renderCountryRusF(city, country) {
  refs.main.innerHTML = weatherCardRusF(city, country);
}

timingFunction();
