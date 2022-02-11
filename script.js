let lat;
let lon;
let map;
let marker;
let geocoder;
let responseDiv;
let response;
const infoList = document.querySelector('#info-list');

// function getLocation() {
//   if (!navigator.geolocation) {
//     return null;
//   }

//   navigator.geolocation.getCurrentPosition((pos) => {
//     lat = document.getElementById("lat").innerText = pos.coords.latitude;
//     lon = document.getElementById("lon").innerText = pos.coords.longitude;
//     initMap();
//   });
// }

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
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
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.classList.add('div-map');
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  instructionsElement.id = "instructions";
  instructionsElement.innerHTML =
    "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

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
  const infowindow = new google.maps.InfoWindow();

  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
  });
}

initMap();

function clear() {
  marker.setMap(null);
}

function autoSaveItems() {
  const items = [];
  for (let i = 0; i < infoList.childNodes.length; i += 1) {
    const currentItem = infoList.childNodes[i];
    const object = {
      type: 'div',
      classe: currentItem.firstChild.classList[0],
      text: currentItem.textContent,
    };
    items.push(object);
  }
  localList = JSON.stringify(items);
  saveInfoItems(localList);
}

function createAnElement(objElement){
  const { type, classe, text } = objElement;
  const element = document.createElement(type);
  element.classList.add(classe);
  element.innerText = text;
  return element;
}

function infoItem(objElement) {
  const litsItem = document.createElement('li')
  litsItem.classList.add('list-item');
  litsItem.appendChild(createAnElement(objElement))
  litsItem.addEventListener('dblclick', (event) => {
    event.target.remove();
    autoSaveItems();
  })
  return litsItem;
}


function autoGetList() {
  console.log('entrou');
  const previousList = getSavedInfo();
  const list = JSON.parse(previousList)
  list.forEach((item) => {
    console.log(item);
    infoList.appendChild(infoItem(item));
    autoSaveItems();
  });
}


function colorDiv(pollution) {
  if (pollution > 0 && pollution <= 50){
    return 'good';
  }
  if (pollution > 51 && pollution <= 100){
    return 'moderate';
  }
  if (pollution > 101){
    return 'unhealthy';
  }
}

function addWeatherElements(objWeather) {
  if (objWeather.status === 'fail') {
    const response = {
      type: 'div',
      classe: 'waether_fail',
      text: 'Infelizmente não conseguimos uma estação meteorológica próxima a esta região',
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
    findPlace(objParse);
    console.log(objParse[0].geometry.location);
    getLocalInfo(objParse[0].geometry.location);
    return results;
  }).catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
  });
}

function stringContainsNumber(_string) {
  let matchPattern =_string.match(/\d+/g);
  if (matchPattern != null) {
    return true
   } else{
    return false
  }
}

function findPlace(nearLocations) {
  console.log(nearLocations);
  const nearstLocation = nearLocations[0];
  const nextLocation = nearLocations[1];
  if (!stringContainsNumber(nearstLocation.formatted_address[0])) {
    const stateObj = nearstLocation.address_components.find((element) => element.types.includes('administrative_area_level_1'));
    const getStateName = () => {
      if (stateObj) {
        return stateObj.long_name
      }
      return '';
    };
    const state = getStateName();
    const countryObj = nearstLocation.address_components.find((element) => element.types.includes('country'));
    const country = countryObj.long_name;
    console.log(state + ', ' + country);
  };
}

function clearList() {
  const clearBtn = document.getElementById('clear-places');
  clearBtn.addEventListener('click', () => {
    const parent = infoList;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  });
  autoSaveItems()
}

clearList();

autoGetList();

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}


