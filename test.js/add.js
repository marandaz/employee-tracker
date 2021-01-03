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

addEmployeePrompt = () => {
    // Select managers names and their employee id, select each role and its id
    db.query(
        `SELECT CONCAT(e.first_name,' ',e.last_name) AS manager, e.id AS manager_id, r.title, r.id AS role_id FROM employee e RIGHT JOIN role r ON e.role_id = r.id ORDER BY manager_id ASC`,
        (err, res) => {
            if (err) throw err;

            let roles = [];
            let rolesChoices = [];
            let managers = [];
            let managersChoices = [];

            res.forEach(result => {
                if (result.manager) {
                    managers.push({ id: result.manager_id, name: result.manager })
                    managersChoices.push(`${result.manager} - ${result.title}`)
                }
                roles.push({ id: result.role_id, title: result.title })
                rolesChoices.push(result.title)
            })

            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employee\'s first name?',
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the employee\'s last name?',
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role?',
                        choices: rolesChoices
                    },
                    {
                        type: 'confirm',
                        name: 'add_manager',
                        message: 'Does this employee have a manager?'
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Please select the manager',
                        choices: managersChoices,
                        when: (answers) => (answers.add_manager === true)
                    }
                ])
                .then(answers => {
                    // Cleans up manager choice string from above to just have manager name to get id below
                    let role = roles.filter(role => answers.role === role.title)
                    if (answers.add_manager) {
                        let ansManager = answers.manager.substring(0, answers.manager.search(/\s\W\s/))
                        let manager = managers.filter(manager => ansManager === manager.name)

                        addEmployeeManager(answers.first_name, answers.last_name, role[0].id, manager[0].id);
                    } else {
                        addEmployeeNoManager(answers.first_name, answers.last_name, role[0].id)
                    }
                })
        }
    )

    addEmployeeManager = (first_name, last_name, role_id, manager_id) => {
        db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [`${first_name}`, `${last_name}`, `${role_id}`, `${manager_id}`],
            (err, res) => {
                if (err) throw err;
                console.log(`${first_name} ${last_name} was added into the database`)
                init();
            }
        )
    }

    addEmployeeNonManager = (first_name, last_name, role_id) => {
        db.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
            [`${first_name}`, `${last_name}`, `${role_id}`],
            (err, res) => {
                if (err) throw err;
                console.log(`${first_name} ${last_name} was added into the database`)
                init();
            }
        )
    }
};