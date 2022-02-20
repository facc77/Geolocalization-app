const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
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
        const lugar = await leerInput("Ciudad:");
        await busquedas.ciudad(lugar);

        //Buscar los lugares

        //Seleccionar el lugar

        //Clima

        //Mostrar resultado

        console.log("\nInformacion del lugar|n");
        console.log("Ciudad:");
        console.log("Lat:");
        console.log("Lng:");
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
