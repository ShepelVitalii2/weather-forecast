import fetchCountry from './API-service';

import refs from './refs';

import weatherCard from '../templates/weatherCard.hbs';
import weatherCardF from '../templates/weatherCardF.hbs';
import weatherCardSQ from '../templates/weatherCardSQ.hbs';
import weatherCardSQF from '../templates/weatherCardSQF.hbs';
import weatherCardRus from '../templates/weatherCardRus.hbs';
import weatherCardRusF from '../templates/weatherCardRusF.hbs';
import weatherCardSQRus from '../templates/weatherCardSQRus.hbs';
import weatherCardSQRusF from '../templates/weatherCardSQRusF.hbs';

import { currentTime, currentTimeRus } from './currentDate';

let setLanguage = null;
let searchQueryPosition = null;
let timingFunctionState = null;
let searchQuery = '';

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
  location.href = location.href;
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
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage !== true
  ) {
    fetchAndRenderCountryF();
    localStorage.clear();
    localStorage.setItem('settings', 'englishF');
  } else if (
    refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true &&
    searchQuery === ''
  ) {
    fetchAndRenderCountryRus();
    localStorage.clear();
    localStorage.setItem('settings', 'russianC');
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    setLanguage === true &&
    searchQuery === ''
  ) {
    localStorage.clear();
    fetchAndRenderCountryRusF();
    localStorage.setItem('settings', 'russianF');
  } else if (
    refs.onChangeTempClick.classList.contains('temperature') &&
    !refs.onChangeLangClick.classList.contains('language') &&
    setLanguage === true &&
    searchQuery !== ''
  ) {
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQF)
      .catch(onFetchError);
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    !refs.onChangeLangClick.classList.contains('language') &&
    searchQuery !== ''
  ) {
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQ)
      .catch(onFetchError);
  } else if (
    refs.onChangeTempClick.classList.contains('temperature') &&
    refs.onChangeLangClick.classList.contains('language') &&
    setLanguage === true &&
    searchQuery !== ''
  ) {
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQRusF)
      .catch(onFetchError);
    console.log('123');
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    refs.onChangeLangClick.classList.contains('language') &&
    setLanguage === true &&
    searchQuery !== ''
  ) {
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQRus)
      .catch(onFetchError);
  }

  searchQueryPosition = !searchQueryPosition;
});

refs.searchButton.addEventListener('click', e => {
  searchQueryPosition = true;
  setLanguage = true;
  // console.log(searchQueryPosition);
  e.preventDefault();
  localStorage.clear();

  searchQuery = refs.onInput.value;

  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQ)
    .catch(onFetchError);
  // .finally(onInput.reset());
});

refs.onChangeLangClick.addEventListener('click', () => {
  refs.onChangeLangClick.classList.toggle('language');
  setLanguage = true;

  if (
    !refs.onChangeLangClick.classList.contains('language') &&
    searchQuery === ''
  ) {
    localStorage.clear();
    localStorage.setItem('settings', 'englishC');
    fetchAndRenderCountry();
    setLanguage = false;
  } else if (
    refs.onChangeLangClick.classList.contains('language') &&
    searchQuery === ''
  ) {
    localStorage.clear();
    localStorage.setItem('settings', 'russianC');
    fetchAndRenderCountryRus();
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    refs.onChangeLangClick.classList.contains('language') &&
    setLanguage === true &&
    searchQuery !== ''
  ) {
    fetchCountry;
    fetchAndRenderCountrySQRus();
  } else if (setLanguage === true && searchQuery !== '') {
    fetchAndRenderCountrySQ();
  }

  // searchQueryPosition = !searchQueryPosition;
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

function fetchAndRenderCountrySQRus() {
  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQRus)
    .catch(onFetchError);
}
function fetchAndRenderCountrySQ() {
  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQ)
    .catch(onFetchError);
}

function renderCountry(city, country) {
  refs.main.innerHTML = weatherCard(city, country);
  timingFunctionState = true;
  timingFunction();
}

function renderCountryF(temp) {
  refs.main.innerHTML = weatherCardF(temp);
  timingFunctionState = true;
  timingFunction();
}
function renderCountrySQ(city, country) {
  refs.main.innerHTML = weatherCardSQ(city, country);
  timingFunctionState = true;
  timingFunction();
}
function renderCountrySQF(city, country) {
  refs.main.innerHTML = weatherCardSQF(city, country);
  timingFunctionState = true;
  timingFunction();
}

function renderCountrySQRus(city, country) {
  refs.main.innerHTML = weatherCardSQRus(city, country);
  timingFunctionState = false;
  timingFunction();
}
function renderCountrySQRusF(city, country) {
  refs.main.innerHTML = weatherCardSQRusF(city, country);
  timingFunctionState = false;
  timingFunction();
}
function renderCountryRus(city, country) {
  refs.main.innerHTML = weatherCardRus(city, country);
  timingFunctionState = false;
  timingFunction();
}
function renderCountryRusF(city, country) {
  refs.main.innerHTML = weatherCardRusF(city, country);
  timingFunctionState = false;
  timingFunction();
}

function timingFunction() {
  clearInterval(test);
  const test = setInterval(() => {
    if (timingFunctionState) {
      document.getElementsByTagName('h4')[0].textContent = currentTime();
      document.getElementsByClassName(
        'love',
      )[0].textContent = `Chance to find your love at current time : ${
        Math.floor(Math.random() * (100 - 10)) + 10
      }%, look around!`;
    }
    if (!timingFunctionState) {
      document.getElementsByTagName('h4')[0].textContent = currentTimeRus();
      document.getElementsByClassName(
        'love',
      )[0].textContent = `Шанс найти сейчас вторую половинку : ${
        Math.floor(Math.random() * (100 - 40)) + 40
      }%, оглянитесь!`;
    }
  }, 1500);
}
