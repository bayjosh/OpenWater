import axios from "axios";

export default {
  getLocation: function (zip) {
    return axios.get(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=%090GkBsi8RAWLbQHcAH8SWLtK3eb6G2gnG&q=${zip}`)
  },
  getWeather: function (key) {
    return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=0GkBsi8RAWLbQHcAH8SWLtK3eb6G2gnG`);
  }
};
