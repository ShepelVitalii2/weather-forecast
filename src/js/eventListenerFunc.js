import {
  fetchAndRenderCountry,
  fetchAndRenderCountryF,
  fetchAndRenderCountryRus,
  fetchAndRenderCountryRusF,
  renderCountrySQ,
} from './renderFunctions';

import refs from './refs';

let setLanguage = null;

const changeBgImage = () => {
  refs.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?weather,water')";
};

const changeTemperatureType = () => {
  onChangeTempClick.classList.toggle('temperature');

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
};

const searchCountry = e => {
  e.preventDefault();

  let searchQuery;

  searchQuery = refs.onInput.value;

  fetchCountry
    .searchQueryGeolocation(searchQuery)
    .then(renderCountrySQ)
    .catch(onFetchError);
  // .finally(onInput.reset());
};

const changeLanguage = () => {
  onChangeLangClick.classList.toggle('language');
  setLanguage = true;

  if (!onChangeLangClick.classList.contains('language')) {
    fetchAndRenderCountry();
    setLanguage = false;
  } else {
    fetchAndRenderCountryRus();
  }
};

export { changeBgImage, changeTemperatureType, searchCountry, changeLanguage };
