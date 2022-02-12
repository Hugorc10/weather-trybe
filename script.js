let lat;
let lon;
let map;
let marker;
let geocoder;
let responseDiv;
let response;
const infoList = document.querySelector('#info-list');

document.querySelector('#clear-places').addEventListener('click', () => {
  const parent = infoList;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    } 
  autoSaveItems();
});

const previousList = getSavedInfo();
const list = JSON.parse(previousList)
infoList.innerHTML = list
autoSaveItems();

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: 24.409102, lng: 19.856894 },
    mapTypeId: "terrain",
    mapTypeControl: false,
  });

  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instruções</strong>: Escreva um lugar na caixa de texto ou clique no mapa.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);

  marker = new google.maps.Marker({
    map,
  });

  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });

  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );

  clearButton.addEventListener("click", () => {
    clear();
  });

  clear();
}

initMap();

function clear() {
  marker.setMap(null);
}

function autoSaveItems() {
  const items = infoList.innerHTML
  localList = JSON.stringify(items);
  saveInfoItems(localList);
}

function createAnElement(objElement) {
  const { type, classe, text } = objElement;
  const element = document.createElement(type);
  element.classList.add(classe);
  element.innerText = text;
  return element;
}

function createAnImg(objElement) {
  const { img } = objElement;
  const element = document.createElement('img');
  element.classList.add('weather-img');
  element.src = `./images/${img}.png`;
  return element;
}

function infoItem(objElement) {
  const litsItem = document.createElement('li')
  litsItem.classList.add('list-item');
  litsItem.appendChild(createAnImg(objElement));
  litsItem.appendChild(createAnElement(objElement));
  litsItem.addEventListener('dblclick', (event) => {
    event.target.remove();
    autoSaveItems();
  })
  return litsItem;
}


function colorDiv(pollution) {
  if (pollution > 0 && pollution <= 50){
    return 'good';
  }
  if (pollution >= 51 && pollution <= 100){
    return 'moderate';
  }
  if (pollution >= 101 && pollution <= 150){
    return 'unhealthy';
  }
  if (pollution >= 150){
    return 'very_unhealthy';
  }
}

function addWeatherElements(objWeather) {
  if (objWeather.status === 'fail') {
    const response = {
      type: 'div',
      classe: 'weather_fail',
      text: 'Infelizmente não conseguimos uma estação meteorológica próxima a esta região',
      img: 'lupa'
    }
    infoList.appendChild(infoItem(response));
    autoSaveItems();
  } else {
    const weather = objWeather.data.current.weather;
    const pollution = objWeather.data.current.pollution;
    const response = {
      type: 'div',
      classe: colorDiv(pollution.aqius),
      text: `Tempertura:  ${weather.tp}°C || Humidade: ${weather.hu}% || Poluição: ${pollution.aqius} US AQI`,
      img: weather.ic
    }
    infoList.appendChild(infoItem(response));
    autoSaveItems();
  }
}


function getLocalInfo(objLatLng) {
  fetchWeather(objLatLng).then((result) => addWeatherElements(result));
  // fetchGeoData(objLatLng).then((result) => addGeoDataElements(result));
}

function geocode(request) {
  clear();
  geocoder.geocode(request).then((result) => {
    const { results } = result;

    map.setCenter(results[0].geometry.location);
    marker.setPosition(results[0].geometry.location);
    marker.setMap(map);
    const objStg = JSON.stringify(results, null, 2);
    const objParse = JSON.parse(objStg);
    console.log(objParse[0].geometry.location);
    getLocalInfo(objParse[0].geometry.location);
    return results;
  }).catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
  });
}
