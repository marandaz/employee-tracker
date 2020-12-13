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

//   SECTION FOR ADDING (addPrompt)


//   SECTION FOR VIEWING (viewPrompt)


//   SECTION FOR UPDATING (updatePrompt)


  
  init();