require('colors');
const { guardarDB, leerDB } = require('./helpers/interaccionDB');
const {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput,
    listadoTareasABorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');
const OpcionesMenu = require('./models/opcionesMenu');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareaFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case OpcionesMenu.CREAR:
                const desc = await inquirerLeerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case OpcionesMenu.LISTAR:
                tareas.listadoCompleto();
                break;
            case OpcionesMenu.LISTAR_COMPLETADAS:
                tareas.listarPendientesCompletadas();
                break;
            case OpcionesMenu.LISTAR_PENDIENTES:
                tareas.listarPendientesCompletadas(false);
                break;
            case OpcionesMenu.COMPLETAR_TAREAS:
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case OpcionesMenu.BORRAR_TAREA:
                const id = await listadoTareasABorrar(tareas.listadoArr);
                if (id !== '0') {
                    // Preguntar si esta seguro de eliminar.
                    const res = await confirmar('¿Está seguro?');
                    if (res) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            case OpcionesMenu.SALIR:
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);
        await inquirerPausa();
    } while (opt !== '0');
};

main();
