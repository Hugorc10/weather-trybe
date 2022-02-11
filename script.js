let lat;
let lon;
let map;
let marker;
let geocoder;
let responseDiv;
let response;

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


function geocode(request) {
  clear();
  geocoder.geocode(request).then((result) => {
    const { results } = result;

    map.setCenter(results[0].geometry.location);
    marker.setPosition(results[0].geometry.location);
    marker.setMap(map);
    const objStg = JSON.stringify(results, null, 2);
    const objParse = JSON.parse(objStg);
    findPlace(objParse)
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