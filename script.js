let lat;
let lon;
let map;
let marker;
let geocoder;
let responseDiv;
let response;
const container = document.querySelector('.container');
const geoContainer = document.querySelector('.geo-container');
const geoBtn = document.querySelector('#geodata-btn');

geoBtn.addEventListener('click', () => {
  geoContainer.style.display = 'flex';
})
// function getLocalStorage() {
//   const previousList = getSavedInfo();
//   // const list = JSON.parse(previousList)
//   // console.log(list);
//   container.innerHTML = previousList;
//   autoSaveItems();
// }

// getLocalStorage();



function clearweatherInfo() {
  const weatherInfo = document.querySelector('.weather-info');
  const geoInfo = document.querySelector('.geo-info');
  weatherInfo.remove();
  geoInfo.remove();
  geoContainer.style.display = 'none';
}


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

// function autoSaveItems() {
//   const items = container.innerHTML
//   // localList = JSON.stringify(items);
//   saveInfoItems(items);
//   console.log(getSavedInfo());
// }

function getIcon(infoType) {
  const element = document.createElement('img');
  element.classList.add(`${infoType}-icon`);
  element.src = `./images/${infoType}.png`;
  return element;
}

function createTemp(objElement) {
  const { temp } = objElement;
  const element = document.createElement('div');
  element.classList.add('temp');
  element.innerText = temp;
  return element;
}

function createUm(objElement) {
  const { um } = objElement;
  const element = document.createElement('div');
  element.classList.add('um');
  element.innerText = um;
  element.appendChild(getIcon('um'));
  return element;
}

function createPol(objElement) {
  const { classe, pol } = objElement;
  const element = document.createElement('div');
  element.classList.add(classe);
  element.innerText = pol;
  element.appendChild(getIcon('pol'));
  return element;
}


function createAnImg(objElement) {
  const { img } = objElement;
  if (img === 'unknown') {
    const element = document.createElement('img');
    element.classList.add('weather-img');
    element.src = `./images/unknown.png`;
    return element;
  }
  const element = document.createElement('img');
  element.classList.add('weather-img');
  element.src = `http://openweathermap.org/img/wn/${img}@2x.png`;
  return element;
}

function createText(objElement) {
  const { classe, text } = objElement;
  const element = document.createElement('div');
  element.classList.add(classe);
  element.innerText = text;
  element.appendChild(getIcon('lupa'))
  return element;
}

function infoItem(objElement) {
  const weatherInfo = document.createElement('div')
  weatherInfo.classList.add('weather-info');
  if (objElement.text){
    weatherInfo.appendChild(createAnImg(objElement))
    weatherInfo.appendChild(createText(objElement))
    return weatherInfo;
  }
  weatherInfo.appendChild(createAnImg(objElement));
  weatherInfo.appendChild(createTemp(objElement));
  weatherInfo.appendChild(createUm(objElement));
  weatherInfo.appendChild(createPol(objElement));
  return weatherInfo;
}


function colorDiv(pollution) {
  if (pollution > 0 && pollution <= 50) {
    return 'good';
  }
  if (pollution >= 51 && pollution <= 100) {
    return 'moderate';
  }
  if (pollution >= 101 && pollution <= 150) {
    return 'unhealthy';
  }
  if (pollution >= 150) {
    return 'very_unhealthy';
  }
}

function addWeatherElements(objWeather) {
  if (objWeather.status === 'fail') {
    const response = {
      classe: 'error',
      text: 'Infelizmente não conseguimos uma estação meteorológica próxima a esta região',
      img: 'unknown'
    }
    container.appendChild(infoItem(response));
    const geoBtn = document.querySelector('#geodata-btn');
    geoBtn.style.display = 'block';
    // autoSaveItems();
  } else {
    const weather = objWeather.data.current.weather;
    const pollution = objWeather.data.current.pollution;
    const response = {
      classe: colorDiv(pollution.aqius),
      temp: `${weather.tp}°C`,
      um: `${weather.hu}%`,
      pol: `${pollution.aqius} US AQI`,
      img: weather.ic
    }
    container.appendChild(infoItem(response));
    const geoBtn = document.querySelector('#geodata-btn');
    geoBtn.style.display = 'block';
    // autoSaveItems();
  }
}

function createLocation(objElement) {
  const { cnt, rg, ct } = objElement;
  const element = document.createElement('div');
  element.classList.add('location');
  element.innerText = `${ct}, ${rg}, ${cnt}`;
  element.appendChild(getIcon('marker'));
  return element;
}

function createCurrency(objElement) {
  const { cc } = objElement;
  const element = document.createElement('div');
  element.classList.add('currency');
  element.innerText = `${cc}`;
  element.appendChild(getIcon('coin'));
  return element;
}

function createSun(objElement) {
  const { sr, ss } = objElement;
  const element = document.createElement('div');
  element.classList.add('sun');
  element.innerText = `${sr} ➙ ${ss}`;
  element.appendChild(getIcon('sun'));
  return element;
}

function createTz(objElement) {
  const { tz } = objElement;
  const element = document.createElement('div');
  element.classList.add('tz');
  element.innerText = tz;
  element.appendChild(getIcon('tz'));
  return element;
}



function dataItem(objInfos) {
  const geoInfo = document.createElement('div');
  geoInfo.classList.add('geo-info');
  if (objInfos.text) {
    geoInfo.appendChild(createText(objInfos));
    return geoInfo;
  }
  geoInfo.appendChild(createLocation(objInfos));
  geoInfo.appendChild(createCurrency(objInfos));
  geoInfo.appendChild(createSun(objInfos));
  geoInfo.appendChild(createTz(objInfos));
  return geoInfo;
}

function addGeoDataElements(objGeoData) {
  const { country, region, city, currency_code, currency_symbol, sunrise, sunset, time_zone, error } = objGeoData
  if (error) {
    const response = {
      classe: 'error',
      text: 'Não conseguimos encontrar informações sobre este local',
    }
    geoContainer.appendChild(dataItem(response));
  } else {
    const response = {
      cnt: country,
      rg: region,
      ct: city,
      cc: currency_code,
      sr: sunrise,
      ss: sunset,
      tz: time_zone,
    }
    geoContainer.appendChild(dataItem(response));
  }
}

// function makeRegionInfos(objInfos) {
//   const { country, region, city, currency_code, currency_symbol, sunrise, sunset, time_zone } = objInfos;
//   const arrayInfo = [];
//   const unorList = document.createElement('ul');
//   unorList.id = 'region-info';
//   arrayInfo.push(country);
//   arrayInfo.push(region);
//   arrayInfo.push(city);
//   arrayInfo.push(currency_code);
//   arrayInfo.push(currency_symbol);
//   arrayInfo.push(sunrise);
//   arrayInfo.push(sunset);
//   arrayInfo.push(time_zone);
//   const arrayNode = makeNodes(arrayInfo);
//   arrayNode.forEach((element) => unorList.appendChild(element));
//   return unorList;
// }


function getLocalInfo(objLatLng) {
  fetchWeather(objLatLng).then((result) => addWeatherElements(result));
  fetchGeoData(objLatLng).then((result) => addGeoDataElements(result));
}

function geocode(request) {
  clear();
  clearweatherInfo();
  container.style.display = 'flex';
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