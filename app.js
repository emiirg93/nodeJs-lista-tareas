require('colors');
const { inquirerMenu, inquirerPausa, inquirerLeerInput } = require('./helpers/inquirer');
const OpcionesMenu = require('./models/opcionesMenu');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case OpcionesMenu.CREAR:
                const desc = await inquirerLeerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case OpcionesMenu.LISTAR:
                console.log(tareas._listado);
                break;
            default:
                break;
        }
        await inquirerPausa();
    } while (opt !== '0');
};

main();
