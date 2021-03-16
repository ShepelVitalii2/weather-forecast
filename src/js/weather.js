import fetchCountry from './API-service';

import refs from './refs';

import weatherCard from '../templates/weatherCard.hbs';
import weatherCardF from '../templates/weatherCardF.hbs';
import weatherCardSQ from '../templates/weatherCardSQ.hbs';
import weatherCardRus from '../templates/weatherCardRus.hbs';
import weatherCardRusF from '../templates/weatherCardRusF.hbs';
import weatherCardSQRus from '../templates/weatherCardSQRus.hbs';
import weatherCardSQRusF from '../templates/weatherCardSQRusF.hbs';
// import { timingFunction } from './currentDate';
// import { timingFunctionRus } from './currentDateRus';
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
    localStorage.clear();
    fetchAndRenderCountryRusF();
    localStorage.setItem('settings', 'russianF');
  }
  // if (
  //   !refs.onChangeTempClick.classList.contains('temperature') &&
  //   refs.onChangeLangClick.classList.contains('language') &&
  //   setLanguage === true &&
  //   searchQuery !== ''
  // ) {
  //   fetchCountry
  //     .searchQueryGeolocation(searchQuery)
  //     .then(renderCountrySQRusF)
  //     .catch(onFetchError);
  // } else if (
  //   !refs.onChangeTempClick.classList.contains('temperature') &&
  //   !refs.onChangeLangClick.classList.contains('language') &&
  //   setLanguage === true &&
  //   searchQuery !== ''
  // ) {
  //   fetchCountry
  //     .searchQueryGeolocation(searchQuery)
  //     .then(renderCountrySQ)
  //     .catch(onFetchError);
  // }

  // searchQueryPosition = !searchQueryPosition;
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
  // let firstRender = null;
  // console.log(setLanguage);

  if (
    !refs.onChangeLangClick.classList.contains('language') &&
    searchQuery === ''
  ) {
    localStorage.clear();
    localStorage.setItem('settings', 'englishC');
    fetchAndRenderCountry();
    // console.log('123');

    setLanguage = false;
  } else if (
    refs.onChangeLangClick.classList.contains('language') &&
    searchQuery === ''
    // searchQueryPosition === false
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
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQRusF)
      .catch(onFetchError);
  } else if (
    !refs.onChangeTempClick.classList.contains('temperature') &&
    !refs.onChangeLangClick.classList.contains('language') &&
    setLanguage === true &&
    searchQuery !== ''
  ) {
    fetchCountry
      .searchQueryGeolocation(searchQuery)
      .then(renderCountrySQ)
      .catch(onFetchError);
  }

  searchQueryPosition = !searchQueryPosition;
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
  fetchCountry
    .currentGeolocation()
    .then(renderCountryRus)

    .catch(onFetchError);
}

function fetchAndRenderCountryRusF() {
  fetchCountry
    .currentGeolocation()
    .then(renderCountryRusF)

    .catch(onFetchError);
}

function renderCountry(city, country) {
  refs.main.innerHTML = weatherCard(city, country);
  timingFunctionState = true;
  timingFunction();
}

function renderCountryF(temp) {
  refs.main.innerHTML = weatherCardF(temp);
}
function renderCountrySQ(city, country) {
  refs.main.innerHTML = weatherCardSQ(city, country);
}

function renderCountrySQRus(city, country) {
  refs.main.innerHTML = weatherCardSQRus(city, country);
}
function renderCountrySQRusF(city, country) {
  refs.main.innerHTML = weatherCardSQRusF(city, country);
}
function renderCountryRus(city, country) {
  refs.main.innerHTML = weatherCardRus(city, country);
  timingFunctionState = false;
  timingFunction();
}
function renderCountryRusF(city, country) {
  refs.main.innerHTML = weatherCardRusF(city, country);
}

function timingFunction() {
  clearInterval(test);
  const test = setInterval(() => {
    if (timingFunctionState) {
      document.getElementsByTagName('h4')[0].textContent = currentTime();
    }
    if (!timingFunctionState) {
      document.getElementsByTagName('h4')[0].textContent = currentTimeRus();
    }
  }, 500);
}
