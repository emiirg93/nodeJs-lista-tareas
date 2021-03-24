require('colors');
const inquirer = require('inquirer');
const arrayPreguntas = [
    {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
    },
    {
        value: '2',
        name: `${'2.'.green} Listar tarea`,
    },
    {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
    },
    {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
    },
    {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
    },
    {
        value: '6',
        name: `${'6.'.green} borrar tarea`,
    },
    {
        value: '0',
        name: `${'0.'.green} salir`,
    },
];

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: arrayPreguntas,
    },
];

const pausa = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.green} para continuar`,
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const inquirerPausa = async () => {
    console.log('\n');
    await inquirer.prompt(pausa);
};

const inquirerLeerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerLeerInput
};
