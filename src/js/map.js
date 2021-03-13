// import fetchCountry from './API-service';
const IP_TOKEN = '9386691d4def67';
const CURRENT_WEATHER_TOKEN = '399ec48b854042bfac8135036210503';

// const result = fetchCountry.getMapPosition().then(r => console.log(r));
// console.log(result);

// const getMap = async () => {
//   const obj = await fetchCountry.getMapPosition();
//   //   const result = await obj.json();
//   console.log(obj);
// };
// console.log(getMap());
// (async () => {
//   const test = await fetchCountry.getMapPosition();
//   console.log(test);
// })();

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hlcGVsdml0YWxpaSIsImEiOiJja203bTE4Y2MwODRwMnZtZG5nbzcwaDE4In0.opG7VQE2SlptoHoBdmOfKA';

//   (async () => {
//     const test = await fetchCountry.getMapPosition();

//   })();

// fetchCountry.getMapPosition().then(map);
// console.log(fetchCountry.getMapPosition().then(r => r.json));

// export default function map(lon, lat) {
//   const map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v11', // style URL
//     center: [lon, lat], // starting position [lng, lat]
//     zoom: 9, // starting zoom
//   });
//   return map;
// }
