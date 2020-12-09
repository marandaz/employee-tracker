DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INT NOT NULL,
  manager_id INT default NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES role(id),
  FOREIGN KEY(manager_id) REFERENCES employee(id)
);

CREATE TABLE dept (
  id INT AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(50),
  PRIMARY KEY(id)
);

CREATE TABLE emp_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(50),
  salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department(id)
);