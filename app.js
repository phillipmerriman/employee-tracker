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

            case 'View all employess':
                viewAllEmployees();
                break;

            case 'View all managers':
                mgrArray();
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
    // mgrArray();
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
            choices: [
                "Sales Manager",
                "Sales Associate",
                "IT Manager",
                "IT Associate",
                "Senior Engineer",
                "Junior Engineer",
                "Project Manager",
                "SEO Specialist"
            ]
        },
        {
            type: "list",
            message: "Who is the manager?",
            name: "manager",
            choices: mgrs
        }
    ]).then((response) => {
        // CREATE
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id)");
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
const mgrs = [];
function mgrArray () {
    connection.query("SELECT * FROM employee WHERE manager_id IS null", (err, res) => {
        if(err) throw err;
       
        for (let i = 0; i < res.length; i++) {
            mgrs.push(res[i]);
            console.log(res[i]);
            console.log(mgrs);
        }
        console.table(mgrs);
        loadMainPrompts();
        // return mgrs;
    });
}