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
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        const { nombre, lat, lng } = lugares.find((l) => l.id === id);
        const { desc, temp, temp_min, temp_max } = await busquedas.climaLugar(
          lat,
          lng
        );

        //Buscar los lugares

        //Seleccionar el lugar

        //Clima

        //Mostrar resultado

        console.log("\nInformacion del lugar|n");
        console.log("Ciudad:", nombre);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Clima:", desc);
        console.log("Temperatura:", temp);
        console.log("Minima:", temp_min);
        console.log("Maxima:", temp_max);
        break;
      case 2:
        console.log("cuiaad2");
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== "0");
};

main();
