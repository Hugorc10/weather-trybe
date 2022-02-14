const fetch = require('node-fetch');
async function fetchGeoData(latLng) {
    const { lat, lng } = latLng;
    const key = 'QZ0DTOXXJEJTFUGKC0NJGV2YWU929X9P';
    const APIStrangeObject = await fetch(`https://api.geodatasource.com/city?key=${key}&format=json&lat=${lat}&lng=${lng}`);
    const APIObject = await APIStrangeObject.json();
    console.log(APIObject);
    return APIObject;
}

module.exports = fetchGeoData;