const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require('console.table')
require('dotenv').config()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'marandaz',
  password: "",
  database: 'employeeDB'
})

init = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: ['Add', 'View', 'Update', 'Exit']
        }
      ])
      .then(answer => {
        if(answer.choice === 'Add') return addPrompt(); 
        if(answer.choice === 'View') return viewPrompt(); 
        if(answer.choice === 'Update') return updatePrompt();  
        if(answer.choice === 'Exit') {
          db.end()
          console.log('See ya later!')
        } 
      })
  }
//-----//  //-----//  //-----//  //-----//  //-----//
////   SECTION FOR ADDING (addPrompt)   ////  
addPrompt = () => {
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'choice',
              message: 'What would you like to add?',
              choices: ['Departments', 'Roles', 'Employees']
          }
      ])
      .then(answer => {
          if (answer.choice === 'Departments') return addDeptPrompt();
          if (answer.choice === 'Roles') return addRolePrompt();
          if (answer.choice === 'Employees') return addEmpPrompt();
      })
}


////   ADDING DEPARTMENT: PROMPT AND DB   //// 

addDeptartmentPrompt = () => {
  inquirer
      .prompt([
          {
              type: 'input',
              name: 'dept',
              message: 'What is the dept you want to add?',
          }
      ])
      .then(answer => {
          addDept(answer.dept);
      })
}
addDepartment = (department) => {
  db.query(
      'INSERT INTO department (name) VALUES (?)',
      `${department}`,
      (err, res) => {
          if (err) throw err;
          console.log(`${department} was added.`)
          init();
      }
  )
}


////   ADDING ROLES   //// 





////   ADDING EMPLOYEES   //// 
















//-----//  //-----//  //-----//  //-----//  //-----//

//   SECTION FOR VIEWING (viewPrompt)


//   SECTION FOR UPDATING (updatePrompt)


  
  init();