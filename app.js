const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const db = require('./db/connections');
const connection = require('./db/connections');

// console.log(db);

init();

function init () {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    loadMainPrompts();
}

function loadMainPrompts () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: [
                'View all employess',
                // 'View all employees by department',
                // 'View all employees by manager',
                'Add employee',
                // 'Remove employee',
                'Update employee role',
                // 'Update employee manager',
                'View all roles',
                'Add role',
                // 'Remove role',
                'View all departments',
                'Add department',
                // 'Remove department',
                // 'View utilized budget of department',
                'Exit'
            ]
        }
    ]).then((response) => {
        console.log(response.firstQuestion);
        switch (response.firstQuestion) {
            case 'View all employess':
                viewAllEmployees();
                break;

            case 'Add employee':
                viewAllEmployees();
                break;

            case 'Update employee role':
                viewAllEmployees();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'Add role':
                viewAllEmployees();
                break;

            case 'View all departments':
                viewAllDepartments();
                break;

            case 'Add department':
                viewAllEmployees();
                break;

            case 'Exit':
                exit();
                break;
        }
    });
}

function viewAllEmployees () {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function viewAllRoles () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function viewAllDepartments () {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function exit () {
    connection.end();
}