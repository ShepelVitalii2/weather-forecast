import fetchCountry from './API-service';
// import debounce from 'lodash.debounce';
// import currentDate from './currentDate';
import map from './map';
// console.log(map());

import weatherCard from '../templates/weatherCard.hbs';
import temperature from '../templates/renderTemperature.hbs';
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

function loadFunction() {
  const onInput = document.querySelector('.search-bar');
  const button = document.querySelector('.search-button');
  const onImgBtnClick = document.querySelector('.picture-button');
  const onChangeTempClick = document.querySelector('.temperature-button');

  // const temperatureInfo = document.querySelector('.apparent-temperature');
  // const temperatureCard = document.querySelector('#temperature');
  // fetchCountry.map();
  onImgBtnClick.addEventListener('click', () => {
    // location.href = location.href;
    main.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?weather,water')";
  });
  onChangeTempClick.addEventListener('click', () => {
    main.classList.toggle('active');

    if (main.classList.contains('active')) {
      fetchCountry
        .currentIpWeatherForThreeDays()
        .then(renderCountryF)
        .catch(onFetchError);
    } else {
      fetchCountry
        .currentIpWeatherForThreeDays()
        .then(renderCountry)
        .catch(onFetchError);
    }
  });

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

function renderCountry(city, country, long, lat) {
  main.innerHTML = weatherCard(city, country);
  const weatherBlock = document.querySelector('.weather-block');
  weatherBlock.appendChild(fetchCountry.getMapPosition(long, lat));
  // console.log(fetchCountry.getMapPosition().then(map));
}

function renderCountryF(temp, long, lat) {
  main.innerHTML = temperature(temp);
  const weatherBlock = document.querySelector('.weather-block');
  weatherBlock.appendChild(fetchCountry.getMapPosition().then(map(long, lat)));
}

if (renderCountry) {
  timingFunction();
}
if (renderCountryF) {
  timingFunction();
}
