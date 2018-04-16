import axios from "axios";

const BASEURL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/1179035?apikey=0GkBsi8RAWLbQHcAH8SWLtK3eb6G2gnG`;

export default {
  getWeather: function() {
    return axios.get(BASEURL);
  }
};
