const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
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
        const lugarSel = lugares.find((l) => l.id === id);
        console.log(lugarSel);
        //Buscar los lugares

        //Seleccionar el lugar

        //Clima

        //Mostrar resultado

        console.log("\nInformacion del lugar|n");
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:");
        console.log("Minima:");
        console.log("Maxima:");
        break;
      case 2:
        console.log("cuiaad2");
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== "0");
};

main();
