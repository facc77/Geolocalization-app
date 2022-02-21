const axios = require("axios");
const fs = require("fs");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";
  constructor() {
    this.leerDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get weatherParams() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(" ");
    });
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
        params: { ...this.weatherParams, lat, lon },
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
  agregarHistorial(lugar = "") {
    //prevenir duplicados

    if (this.historial.includes(lugar)) {
      return;
    }
    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar);

    //grabar en db
    this.guardarDB();
  }
  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const data = fs.readFileSync(this.dbPath, "utf8");
    const info = JSON.parse(data);
    this.historial = info.historial;
  }
}

module.exports = Busquedas;
