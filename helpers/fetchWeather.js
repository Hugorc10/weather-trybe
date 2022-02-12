var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  // body: formdata,
  redirect: 'follow',
};

const fetchWeather = async () => {
  try {
    const key = 'fe563c1a-f717-43a0-9cf2-67dbff21361d'
    const url = `http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=${key}`
    // const url = 'http://api.airvisual.com/v2/countries?key=fe563c1a-f717-43a0-9cf2-67dbff21361d';
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    const request = await fetch(url, requestOptions);
    // const request = await fetch(url);
    const data = await request.json();

    return data;
  } catch (error) {

  }
}

