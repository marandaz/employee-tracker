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