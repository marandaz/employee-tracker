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

// If the user picks DEPARTMENTS //

addDeptPrompt = () => {
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

// If the user picks ROLES //



// If the user picks EMPLOYEES //