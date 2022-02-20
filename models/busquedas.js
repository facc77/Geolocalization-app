const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San Jose"];

  constructor() {
    //leer db si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      //peticion http

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const resp = await instance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      //instance axios.create()
      const instance = axios.create({
        baseURL: "http://api.openweathermap.org/data/2.5/weather",
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric",
          lang: "es",
        },
      });
      const resp = await instance.get();
      const { temp, temp_min, temp_max } = resp.data.main;
      const desc = resp.data.weather[0].description;

      return {
        desc,
        temp,
        temp_min,
        temp_max,
      };
    } catch (error) {
      console.log("-------------error------------");
      console.log(error);
    }
  }
}

module.exports = Busquedas;
