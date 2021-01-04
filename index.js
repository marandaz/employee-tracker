// packages required for this to run, and do so securely
var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
require("dotenv").config();

// setting up DB connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  userSelection();
});

// function where user picks their action
function userSelection () {
  inquirer
    .prompt({
          type: 'list',
          name: 'userSelect',
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
          switch (answer.userSelect) {

            case "Add Employee":
              addEmployee();
              break;

            // case "Remove Employee":
            //   removeEmployee();
            //   break;  
    
            case "View All Employees":
              viewEmployee();
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
//-----//  //-----//  //-----//  //-----//  //-----//
////   SECTION FOR ADDING  //// 
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//


//-----//  //-----//  //-----//  //-----//  //-----//
////   ADDING DEPARTMENT: PROMPT AND DB   //// 
//-----//  //-----//  //-----//  //-----//  //-----//
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "What department would you like to add?",
      },
      {
        name: "departmentManager",
        type: "input",
        message: "Who is the manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.addDepartment,
          department: answer.departmentManager,
        },
        function (err) {
          // if (err) throw err;
          console.log("- - - - - - - - - -");
          console.log("Department created.");
          console.log("- - - - - - - - - -");

          userSelection();
        }
      );
    });
}


//-----//  //-----//  //-----//  //-----//  //-----//
             ////   ADDING ROLES   //// 
//-----//  //-----//  //-----//  //-----//  //-----//
function addRole() {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What position would you like to add?",
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          role: answer.addRole,
          department_id: answer.departmentId,
        },
        function (err) {
          // if (err) throw err;
          console.log("- - - - - - - - - -");
          console.log("Role has been created!");
          console.log("- - - - - - - - - -");
          userSelection();
        }
      );
    });
}


//-----//  //-----//  //-----//  //-----//  //-----//
            ////   ADDING EMPLOYEES   //// 
//-----//  //-----//  //-----//  //-----//  //-----//


function addEmployee() {
  inquirer
    .prompt([
      {
        name: "addEmployeeFirstName",
        type: "input",
        message: "What is thefirst name of the employee would you like to add?",
      },
      {
        name: "addEmployeeLastName",
        type: "input",
        message: "What is the last name of the employee would you like to add?",
      },

      {
        name: "roleId",
        type: "input",
        message: "What is the role ID?",
      },

      {
        name: "employeeManagerID",
        type: "input",
        message: "What is the manager ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addEmployee,
          last_name: answer.addEmployee,
          role_id: answer.roleId,
          manager_id: answer.employeeManagerID,
        },
        function (err) {
          // if (err) throw err;
          console.log("- - - - - - - - - -");
          console.log("Employee has been added!");
          console.log("- - - - - - - - - -");

          userSelection();
        }
      );
    });
}


//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
         //   SECTION FOR VIEWING (viewPrompt)
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//

function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, results) {
    // if (err) throw err;
    console.table(results);
    userSelection();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, results) {
    // if (err) throw err;
    console.table(results);
    userSelection();
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    // if (err) throw err;
    console.table(results);
    userSelection();
  });
}

//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
       //   SECTION FOR UPDATING (updatePrompt)
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
//-----//  //-----//  //-----//  //-----//  //-----//
function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, employee) {
    // if (err) throw err;
    connection.query("SELECT * FROM role", function (err, role) {
      // if (err) throw err;
      const employeeOptions = employee.map((emp) => ({
        name: employee.full_name,
        value: employee,
      }));
      const roleOptions = role.map((role) => ({
        name: role.role,
        value: role,
      }));
      inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            message: "Which Employee id would you like to update?",
            choices: employeeOptions,
          },
          {
            name: "updateRole",
            type: "list",
            message: "What is the new role?",
            choices: roleOptions,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.updateRole.id, answer.updateEmployee.id],
            function (err) {
              // if (err) throw err;
              console.log("- - - - - - - - - -");
              console.log("Employee updated.");
              console.log("- - - - - - - - - -");
              userSelection();
            }
          );
        });
    });
  });
}
