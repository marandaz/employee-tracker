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

// If the user picks ADD DEPARTMENTS //

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


//If the user picks ROLES //
addRolePrompt = () => {
    db.query(
        'SELECT * FROM dept',
        (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the role you want to add?',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for this role?'
                    },
                    {
                        type: 'list',
                        name: 'dept',
                        message: 'What deptartment is this role?',
                        choices: res
                    }
                ])
                .then(answers => {
                    let id = res.filter(row => row.name === answers.dept)
                    addRole(answers.title, answers.salary, id[0].id);
                })
        }
    )
}


addRole = (title, salary, department_id) => {
    db.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [`${title}`, `${salary}`, `${department_id}`],
      (err, res) => {
        if (err) throw err;
        console.log(`${title} was added.`)
        init();
      }
    )
  }



// If the user picks EMPLOYEES //