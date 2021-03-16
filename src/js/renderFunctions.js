import fetchCountry from './API-service';

import weatherCard from '../templates/weatherCard.hbs';
import weatherCardF from '../templates/weatherCardF.hbs';
import weatherCardSQ from '../templates/weatherCardSQ.hbs';
import weatherCardRus from '../templates/weatherCardRus.hbs';
import weatherCardRusF from '../templates/weatherCardRusF.hbs';

import { timingFunction } from './currentDate';

function fetchAndRenderCountry() {
  fetchCountry
    .currentIpWeatherForThreeDays()
    .then(renderCountry)
    .then(timingFunction())
    .catch(onFetchError);
}

function fetchAndRenderCountryF() {
  fetchCountry
    .currentIpWeatherForThreeDays()
    .then(renderCountryF)
    .then(timingFunction())
    .catch(onFetchError);
}

function fetchAndRenderCountryRus() {
  fetchCountry
    .currentGeolocation()
    .then(renderCountryRus)
    .then(timingFunction())
    .catch(onFetchError);
}

function fetchAndRenderCountryRusF() {
  fetchCountry
    .currentGeolocation()
    .then(renderCountryRusF)
    .then(timingFunction())
    .catch(onFetchError);
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
function onFetchError() {
  alert('Дела...');
}

export {
  fetchAndRenderCountry,
  fetchAndRenderCountryF,
  fetchAndRenderCountryRus,
  fetchAndRenderCountryRusF,
  renderCountrySQ,
};
