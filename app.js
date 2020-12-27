const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const db = require('./db/connections');
const connection = require('./db/connections');

let mgrs = [];
let roles = [];
let departments = [];

// console.log(db);

init();

function init () {
    
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    
    loadMainPrompts();
}

function loadMainPrompts () {
    mgrArray();
    rolesArray();
    deptArray();
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all managers',
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
        
        switch (response.firstQuestion) {

            case 'View all employees':
                viewAllEmployees();
                break;

            case 'View all managers':
                viewAllManagers();
                break;
            
            case 'Add employee':
                
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'Add role':
                addRole();
                break;

            case 'View all departments':
                viewAllDepartments();
                break;

            case 'Add department':
                addDepartment();
                break;

            case 'Exit':
                exit();
                break;
        }
        
    });
}

//----READ section----//

function viewAllEmployees () {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        loadMainPrompts();
    });
}

function viewAllManagers () {

    connection.query("SELECT first_name, last_name, role_id FROM employee WHERE manager_id IS null", (err, res) => {
        if(err) throw err;
        
        console.table(res);
        loadMainPrompts();
    });
}

function viewAllRoles () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        loadMainPrompts();
    });
}

function viewAllDepartments () {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        loadMainPrompts();
    });
}

//----end READ section----//


//----CREATE section----//

function addEmployee () {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee's first name:",
            name: "firstName"
        },
        {
            type: "input", 
            message: "Enter employee's last name:",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: roles,
            // choices: [
            //     "Sales Manager",
            //     "Sales Associate",
            //     "IT Manager",
            //     "IT Associate",
            //     "Senior Engineer",
            //     "Junior Engineer",
            //     "Project Manager",
            //     "SEO Specialist"
            // ]
        },
        {
            type: "list",
            message: "Who is the manager?",
            name: "manager",
            choices: mgrs
        }
    ]).then((response) => {
        // CREATE
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.role.slice(0, 1)}', '${response.manager.slice(0, 1)}')`, (err, res) => {
        if (err) throw err;
        console.log(`Added ${response.firstName} ${response.lastName} to the database!`);
    });
    });    
}

function addRole () {
    // CREATE
}

function addDepartment () {
    // CREATE
}

//----end CREATE section----//

//----UPDATE section----//

function updateEmployeeRole () {
    // UPDATE
}

//----end UPDATE section----//

//----DELETE section----//

//----end DELETE section----//

//----end connection----//

function exit () {
    connection.end();
}

//----make manager array----//
function mgrArray () {

    connection.query("SELECT * FROM employee WHERE manager_id IS null", (err, res) => {
        if(err) throw err;
        mgrs = [];
        for (let i = 0; i < res.length; i++) {
            mgrs.push(res[i].id + ' ' + res[i].first_name);
        }
    });
}

function rolesArray () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].id + ' ' + res[i].title);
        }
    });
}

function deptArray () {

    connection.query("SELECT * FROM department", (err, res) => {
        if(err) throw err;
        departments = [];
        for (let i = 0; i < res.length; i++) {
            departments.push(res[i].name);
        }
    });
}