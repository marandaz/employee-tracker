USE employeeDB;

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Jane", "Doe", 1, 1), ("Bart", "Simpson", 5, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Smith", 2, 2), ("Bob", "Barker", 3, 2), ("Sally", "McChicken", 4, 1);

INSERT INTO department (department_name)
VALUES ('Creative'), ('Marketing'), ('Frontend'), ('Backend'), ('Data Science');

INSERT INTO roles (title, salary, department_id)
VALUES ("Back End Developer", 120000, 4), ("Creative and UX Designer", 80000, 1), ("Data Scientist", 160000, 5), ("Marketing Specialist", 75000, 2), ("Front End Developer", 105000, 3);
