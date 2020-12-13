viewPrompt = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to view?',
          choices: ['Departments', 'Roles', 'Employees']
        }
      ])
      .then(answer => {
        if (answer.choice === 'Departments') return viewDeptPrompt();
        if (answer.choice === 'Roles') return viewRolePrompt();
        if (answer.choice === 'Employees') return viewEmpPrompt();
      })
  }
