const Tarea = require('./tarea');

/**
 *  _ listado:
 *      {uuid-32132-321321-2: {id:12,desc:asdas,completado:12345}}
 */
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}

module.exports = Tareas;
