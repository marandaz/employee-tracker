// packages required for this to run, and do so securely
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require('console.table')
require('dotenv').config()

// setting up DB connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'marandaz',
  password: "",
  database: 'employeeDB'
})

connection.connect(function (err) {
  if (err) throw err;

  start();
});

// function where user picks their action
init = () => {
  inquirer
    .prompt({
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',

          choices: [
            'Add Employee',
            // 'Remove Employee',
            'View All Employees',
            'Add Role',
            // 'Remove Role',
            'View All Roles',
            'Add Department',
            // 'Remove Department',
            'View All Departments',
            'Update Employee Role',
            'Update Employee Manager',
            'Exit'
          ]
        })

// based on user selection, next steps proceding. The switch statements are an "if this then that"-kind of code block. https://www.w3schools.com/js/js_switch.asp  

        .then((answer) => {
          switch (answer.choice) {

            case "Add Employee":
              addEmployee();
              break;

            // case "Remove Employee":
            //   removeEmployee();
            //   break;  
    
            case "View All Employees":
              viewEmplopee();
              break;

            case "Add Role":
              addRole();
              break;

            // case "Remove Role":
            //   removeRole();
            //   break;  
    
            case "View All Roles":
              viewRole();
              break;

            case "Add Department":
              addDepartment();
              break;


            // case "Remove Department":
            //   removeDepartment();
            //   break;

            case "View All Departments":
              viewDepartment();
              break;
    
            case "Update Employee Role":
              updateEmployee();
              break;

            case "Update Employee Manager":
              updateManager();
              break;
    
            case "Exit":
              connection.end();
    
              // break;  <commenting this out. based on w3schools, it shouldn't be needed on the last switch block. consider revising this as a "default"
          }
        });
    }
    
//-----//  //-----//  //-----//  //-----//  //-----//
////   SECTION FOR ADDING (addPrompt)   ////  




////   ADDING DEPARTMENT: PROMPT AND DB   //// 



////   ADDING ROLES   //// 



////   ADDING EMPLOYEES   //// 











//-----//  //-----//  //-----//  //-----//  //-----//

//   SECTION FOR VIEWING (viewPrompt)


//   SECTION FOR UPDATING (updatePrompt)


  
  init();