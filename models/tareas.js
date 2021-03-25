const Tarea = require('./tarea');

/**
 *  _ listado:
 *      {uuid-32132-321321-2: {id:12,desc:asdas,completado:12345}}
 */
class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareaFromArray(tareas = []) {
        tareas.forEach((t) => {
            this._listado[t.id] = t;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((t, index) => {
            const i = `${index + 1}`.green;
            const { desc, completado } = t;
            const estado = completado ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${i} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        this.listadoArr
            .filter((t) => {
                return completadas ? t.completado : !t.completado;
            })
            .forEach((t, index) => {
                const i = `${index + 1}`.green;
                const { desc, completado } = t;
                console.log(`${i} ${desc} :: ` + `${completado}`.green);
            });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completado) {
                const formatDate = this.getDateNow();
                tarea.completado = formatDate.getFormat();
            }
        });

        this.listadoArr.forEach((t) => {
            if (!ids.includes(t.id)) {
                this._listado[t.id].completado = null;
            }
        });
    }

    getDateNow() {
        const date = new Date();
        const padDigits = this.padDigits;
        const formatDate = {
            day: padDigits(date.getDay(), 2),
            month: padDigits(date.getMonth(), 2),
            year: date.getFullYear(),
            time: {
                h: padDigits(date.getHours(), 2),
                m: padDigits(date.getMinutes(), 2),
                s: padDigits(date.getSeconds(), 2),
            },
            getFormat() {
                return `${this.day}/${this.month}/${this.year} ${this.time.h}:${this.time.m}:${this.time.s}`;
            },
        };

        return formatDate;
    }

    padDigits(number, digits) {
        return (
            Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
            number
        );
    }
}

module.exports = Tareas;
