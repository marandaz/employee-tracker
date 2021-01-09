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
function userSelection() {
  inquirer
    .prompt({
      type: 'list',
      name: 'userSelect',
      message: 'What would you like to do?',

      choices: [
        'Add Employee',
        'View All Employees',
        'Add Role',
        'View All Roles',
        'Add Department',
        'View All Departments',
        'Update Employee Role',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.userSelect) {

        case "Add Employee":
          addEmployee();
          break;

        case "View All Employees":
          viewEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Roles":
          viewRole();
          break;

        case "Add Department":
          addDepartment();
          break;

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
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.addDepartment,
        },
        function (err) {
          if (err) throw err;
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
  connection.query("SELECT * FROM department", function (err, dept) {
    if (err) throw err;
    const deptOptions = dept.map((deptList) => ({
      name: deptList.department_name,
      value: deptList.id,
    }));
    inquirer
      .prompt([
        {
          name: "addTitle",
          type: "input",
          message: "What position would you like to add?",
        },
        {
          name: "departmentId",
          type: "list",
          message: "What is the department for them?",
          choices: deptOptions
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for them?",
        }
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.addTitle,
            department_id: answer.departmentId,
            salary: answer.salary,
          },
          function (err) {
            if (err) throw err;
            console.log("- - - - - - - - - -");
            console.log("Role has been created!");
            console.log("- - - - - - - - - -");
            userSelection();
          }
        );
      });
  })
}


//-----//  //-----//  //-----//  //-----//  //-----//
////   ADDING EMPLOYEES   //// 
//-----//  //-----//  //-----//  //-----//  //-----//


function addEmployee() {
  connection.query("SELECT * FROM employee", function (err, manager) {
    if (err) throw err;
    connection.query("SELECT * FROM roles", function (err, role) {
      if (err) throw err;
      const managerOptions = manager.map((managerList) => ({
        name: `${managerList.first_name} ${managerList.last_name}`,
        value: managerList.id,
      }));
      const roleOptions = role.map((employeeRole) => ({
        name: employeeRole.title,
        value: employeeRole.id,
      }));
      inquirer
        .prompt([
          {
            name: "addEmployeeFirstName",
            type: "input",
            message: "What is the first name of the employee would you like to add?",
          },
          {
            name: "addEmployeeLastName",
            type: "input",
            message: "What is the last name of the employee would you like to add?",
          },

          {
            name: "roleId",
            type: "list",
            message: "What is the role ID?",
            choices: roleOptions
          },
          {
            name: "departmentManager",
            type: "list",
            message: "Who is the manager?",
            choices: managerOptions
          },
        ])
        .then(function (answer) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.addEmployeeFirstName,
              last_name: answer.addEmployeeLastName,
              role_id: answer.roleId,
              manager_id: answer.departmentManager,
            },
            function (err) {
              if (err) throw err;
              console.log("- - - - - - - - - -");
              console.log("Employee has been added!");
              console.log("- - - - - - - - - -");

              userSelection();
            }
          );
        });
    })
  })
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
        if (err) throw err;
        console.table(results);
        userSelection();
      });
    }

function viewRole() {
      connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.table(results);
        userSelection();
      });
    }

function viewDepartment() {
      connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
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
        if (err) throw err;
        connection.query("SELECT * FROM roles", function (err, role) {
          if (err) throw err;
          const employeeOptions = employee.map((potato) => ({
            name: `${potato.first_name} ${potato.last_name}`,
            value: potato.id,
          }));
          const roleOptions = role.map((employeeRole) => ({
            name: employeeRole.title,
            value: employeeRole.id,
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
              console.log(answer);
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answer.updateRole, answer.updateEmployee],
                function (err) {
                  if (err) throw err;
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
