const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const db = require('./db/connections');
const connection = require('./db/connections');

let mgrs = [];
let roles = [];
let departments = [];
let employees = [];

init();

function init () {    
    const logoText = logo({ name: "Employee Management System c.l.a.", font: "ANSI Shadow", fontSize: "20px", borderColor: "magenta", logoColor: "yellow", textColor: "skyblue", description: 'MySQL Database'}).render();
    console.log(logoText);    
    loadMainPrompts();
}

function loadMainPrompts () {
    //populate the arrays
    employeeArray();
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
                'Remove employee',
                'Update employee role',
                // 'Update employee manager',
                'View all roles',
                'Add role',
                'Remove role',
                'View all departments',
                'Add department',
                'Remove department',
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

            case 'Remove employee':                
                removeEmployee();
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

            case 'Remove role':
                removeRole();
                break;

            case 'View all departments':
                viewAllDepartments();
                break;

            case 'Add department':
                addDepartment();
                break;

            case 'Remove department':
                removeDepartment();
                break;

            case 'View utilized budget of department':
                departmentBudget();
                break;

            case 'Exit':
                exit();
                break;
        }        
    });
}

//----READ section----//

// without using join

// function viewAllEmployees () {
//     connection.query("SELECT * FROM employee", (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         loadMainPrompts();
//     });
// }

// using join
function viewAllEmployees () {
    connection.query(`
        SELECT employee.id AS 'ID#', CONCAT(employee.first_name, " ", employee.last_name) AS 'Employees',
        role.id AS 'Role ID#', role.title AS 'Title', role.salary AS 'Salary', 
        department_id AS 'Dept ID#', department.name AS 'Department',
        CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' 
        FROM role 
        LEFT JOIN employee ON employee.role_id = role.id 
        INNER JOIN department ON department.id = role.department_id 
        LEFT JOIN employee e ON employee.manager_id = e.id
        WHERE employee.id IS NOT NULL;`, (err, res) => {
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

// function departmentBudget () {
//     connection.query(`
//     SELECT department.name AS 'Department', role.salary AS 'Salary'
//     FROM role 
//     LEFT JOIN department ON department.id = role.department_id`, (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         loadMainPrompts();
//     })
// }

//----end READ section----//


//----CREATE section----//

function addEmployee () {
    inquirer.prompt([
        {
            type: "list",
            message: "Will this employee be filling a management position?",
            name: "mgr",
            choices: ["Yes", "No"]
        },
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
        },
        {
            type: "list",
            message: "Who is the manager?",
            name: "manager",
            choices: mgrs,
            when: (answer) => {
                return answer.mgr === "No";
            }
        }
    ]).then((response) => {
        // CREATE
        if(response.manager === undefined) {
            connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.role.slice(0, 2)}')`, (err, res) => {
                if (err) throw err;
                console.log(`----------------------------\nAdded ${response.firstName} ${response.lastName} to the database!\n----------------------------`);
                loadMainPrompts();
            });        
        } else {
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.role.slice(0, 2)}', '${response.manager.slice(0, 2)}')`, (err, res) => {
                if (err) throw err;
                console.log(`----------------------------\nAdded ${response.firstName} ${response.lastName} to the database!\n----------------------------`);
                loadMainPrompts();
            });
        }
    });    
}

function addRole () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the base salary of the new role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Please assign a department id number:',
            name: 'deptId',
            choices: departments
        }
    ]).then((response) => {
        // CREATE
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.newRole}', ${response.salary}, '${response.deptId.slice(0, 1)}')`, (err, res) => {
            if (err) throw err;
            console.log(`--------------\nAdded ${response.newRole} to the database!\n--------------`);
            loadMainPrompts();
        });
    });
}

function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'newDeptName'
        }
    ]).then((response) => {
        // CREATE
        connection.query(`INSERT INTO department (name) VALUES ('${response.newDeptName}')`, (err, res) => {
            if (err) throw err;
            console.log(`--------------\nAdded ${response.newDeptName} to the database!\n--------------`);
            loadMainPrompts();
        });
    });
}

//----end CREATE section----//

//----UPDATE section----//

function updateEmployeeRole () {
    inquirer.prompt([
        {
            type: "list",
            message: "Whose role would you like to update?",
            choices: employees,
            name: "employee"
        },
        {
            type: "list",
            message: `What is their new role?`,
            choices: roles,
            name: "newRole"
        }
    ]).then((response) => {
        // UPDATE
        connection.query(`UPDATE employee SET role_id = '${response.newRole.slice(0, 2).trim()}' WHERE employee.id = '${response.employee.slice(0, 2).trim()}'`, (e, r) => {
            if (e) throw e;
            console.log(`----------------------------\nUpdated ${response.employee.slice(2)}'s role to ${response.newRole.slice(2)}!\n----------------------------`);
            loadMainPrompts();
        });
    });
}

//----end UPDATE section----//

//----DELETE section----//

function removeEmployee () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee are you removing?',
            choices: employees,
            name: 'exEmployee'
        }
    ]).then((response) => {
        // DELETE
        connection.query(`DELETE FROM employee WHERE id = ${response.exEmployee.slice(0, 2).trim()}`, (err, res) => {
            if (err) throw err;
            console.log(`----------------------------\nRemoved ${response.exEmployee.slice(2).trim()} from the database!\n----------------------------`);
            loadMainPrompts();
        });
    });
}

function removeRole () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which role are you removing?',
            choices: roles,
            name: 'exRole'
        }
    ]).then((response) => {
        // DELETE
        connection.query(`DELETE FROM role WHERE id = ${response.exRole.slice(0, 2).trim()}`, (err, res) => {
            if (err) throw err;
            console.log(`----------------------------\nRemoved ${response.exRole.slice(2).trim()} from the database!\n----------------------------`);
            loadMainPrompts();
        })
    })
}

function removeDepartment () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which department are you removing?',
            choices: departments,
            name: 'exDepartment'
        }
    ]).then((response) => {
        // DELETE
        console.log(response.exDepartment.slice(0, 2).trim());
        connection.query(`DELETE FROM department WHERE id = ${response.exDepartment.slice(0, 2).trim()}`, (err, res) => {
            if (err) throw err;
            console.log(`----------------------------\nRemoved ${response.exDepartment.slice(2).trim()} from the database!\n----------------------------`);
            loadMainPrompts();
        });
    });
}

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
            departments.push(res[i].id + ' ' + res[i].name);
        }
    });
}

function employeeArray () {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        employees = [];
        for (let i = 0; i < res.length; i++) {
            employees.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
        }
    });
}