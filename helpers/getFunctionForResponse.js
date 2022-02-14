function getFunctionForResponse(which) {
    switch(which) {
      case 1:
        return function(objGeoData) {
            const { error } = objGeoData;
            if (error) {
              const response = {
                classe: 'error',
                text: 'Não conseguimos encontrar informações sobre este local',
              };
              geoContainer.appendChild(dataItem(response));
            }
        };
        break;
      case 2:
        return function(objGeoData) {
            const { country, region, city, currency_code, sunrise, sunset, time_zone, error } = objGeoData;
            if (!error) {
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
        };
    };
  }

module.exports = getFunctionForResponse;