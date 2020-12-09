USE employeeDB;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, 1), ("Bart", "Simpson", 5, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Smith", 2), ("Bob", "Barker", 3), ("Sally", "McChicken", 4);

INSERT INTO dept (name)
VALUES ('Creative'), ('Marketing'), ('Frontend'), ('Backend'), ('Data Science');

INSERT INTO emp_role (title, salary, department_id)
VALUES ("Back End Developer", 120000, 4), ("Creative and UX Designer", 80000, 1), ("Data Scientist", 160000, 5), ("Marketing Specialist", 75000, 2), ("Front End Developer", 105000, 3);

