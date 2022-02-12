let lat;
let lon;
let map;
let marker;
let geocoder;
let responseDiv;
let response;
// let markers = [];

function getLocation() {
  if (!navigator.geolocation) {
    return null;
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    lat = document.getElementById("lat").innerText = pos.coords.latitude;
    lon = document.getElementById("lon").innerText = pos.coords.longitude;
    initMap();
  });
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: -34.397, lng: 150.644 },
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

  // const geocoder = new google.maps.Geocoder();

  const infowindow = new google.maps.InfoWindow();

  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
  });

  // google.maps.event.addListener(map, 'click', function (event) {
  //   addMarker(event.latLng);
  // });

  // map.addListener('click', (event) => {
  //   addMarker(event.latLng);
  // })

  // document.getElementById('show-markers').addEventListener('click', showMarkers);

  // document.getElementById('hide-markers').addEventListener('click', hideMarkers);

  // document.getElementById('delete-markers').addEventListener('click', deleteMarkers);
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}


function geocode(request) {
  clear();
  geocoder.geocode(request).then((result) => {
    const { results } = result;

    map.setCenter(results[0].geometry.location);
    marker.setPosition(results[0].geometry.location);
    marker.setMap(map);
    // responseDiv.style.display = "block";
    response.innerText = JSON.stringify(result, null, 2);
    const obj = JSON.stringify(result, null, 2);
    findWeather(obj)
    // console.log('responseDiv: ' + responseDiv.innerText);
    // console.log('response: ' + response.innerText);

    return results;
  }).catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
  });
}

getLocation();

function findWeather(obj) {
  let myObj = obj;
  // obj = JSON.parse();
  console.log(JSON.parse(myObj));
  //   myObj.find((JSON.parse(element)) => {
  //     return(element === responseDiv.innerText.results)
  // })
}

// function addMarker(location) {
//   const marker = new google.maps.Marker({
//     position: location,
//     map: map,
//   });

//   markers.push(marker);

//   google.maps.event.addListener(marker, "click", function (event) {
//     let latitude = event.latLng.lat();
//     let longitude = event.latLng.lng();
//     console.log(latitude + ', ' + longitude);

//     // radius = new google.maps.Circle({
//     //   map: map,
//     //   radius: 100,
//     //   center: event.latLng,
//     //   fillColor: '#777',
//     //   fillOpacity: 0.1,
//     //   strokeColor: '#AA0000',
//     //   strokeOpacity: 0.8,
//     //   strokeWeight: 2,
//     //   draggable: true,    // Dragable
//     //   editable: true      // Resizable
//     // });

//     // Center of map
//     map.panTo(new google.maps.LatLng(latitude, longitude));

//   });
// }

// function geocodeLatLng(geocoder, map, infowindow) {
//   const input = document.getElementById("latlng").value;
//   const latlngStr = input.split(",", 2);
//   const latlng = {
//     lat: parseFloat(latlngStr[0]),
//     lng: parseFloat(latlngStr[1]),
//   };

//   geocoder
//     .geocode({ location: latlng })
//     .then((response) => {
//       if (response.results[0]) {
//         map.setZoom(11);

//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map,
//         });

//         infowindow.setContent(response.results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert("No results found");
//       }
//     })
//     .catch((e) => window.alert("Geocoder failed due to: " + e));
// }

// Sets the map on all markers in the array.
// function setMapOnAll(map) {
//   for (let i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }

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