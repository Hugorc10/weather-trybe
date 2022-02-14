const fetchGeoData = async (latLng) => {
  try {
    const { lat, lng } = latLng;
    const key = 'QZ0DTOXXJEJTFUGKC0NJGV2YWU929X9P';
    const request = await fetch(`https://api.geodatasource.com/city?key=${key}&format=json&lat=${lat}&lng=${lng}`);
    const data = await request.json();
    console.log(request);
    return data;
  } catch (error) {
    return new Error('You must provide an argument');
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchGeoData,
  };
}