const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
  climaLugar,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("colors");
require("dotenv").config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //mostrar mensaje
        const termino = await leerInput("Ciudad:");
        //Buscar los lugares
        const lugares = await busquedas.ciudad(termino);
        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue; // sigue con la iteracion

        const { nombre, lat, lng } = lugares.find((l) => l.id === id);
        //Guardar en DB
        busquedas.agregarHistorial(nombre);
        //Clima
        const { desc, temp, temp_min, temp_max } = await busquedas.climaLugar(
          lat,
          lng
        );

        //Mostrar resultado

        console.log("\nInformacion del lugar\n".green);
        console.log("Ciudad:", nombre.green);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Clima:", desc.green);
        console.log("Temperatura:", temp);
        console.log("Minima:", temp_min);
        console.log("Maxima:", temp_max);
        break;
      case 2:
        busquedas.leerDB();
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== "0");
};

main();
