updatePrompt = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to update?',
          choices: ['Manager Role', 'Employee Role']
        }
      ])
      .then(answer => {
        if (answer.choice === ' Manager Role') return updateManagerPrompt();
        if (answer.choice === 'Employee Role') return updateRolePrompt();
      })
  }