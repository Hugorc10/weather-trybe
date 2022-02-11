var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  // body: formdata,
  redirect: 'follow',
};

const fetchWeather = async (latLng) => {
  const { lat, lng } = latLng;
  try {
    const key = 'fe563c1a-f717-43a0-9cf2-67dbff21361d'
    const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${key}`
    const request = await fetch(url, requestOptions);
    const data = await request.json();
    console.log(data);
    return data;
  } catch (error) {

  }

}

