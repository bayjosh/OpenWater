import axios from "axios";

export default {
  getLocation: function (zip) {
    return axios.get(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=pkGpyGAhdNRca3MjTbWTsCmgdeTS99mG
    &q=${zip}`)
  },
  getWeather: function (key) {
    return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=pkGpyGAhdNRca3MjTbWTsCmgdeTS99mG
    `);
  },
  getZipCode: function (lat, lon) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCw1e-uu8VD-vsFQDzMXlHkiN_XL5N8YFg`)
  }
};
