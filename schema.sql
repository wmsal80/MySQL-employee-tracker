DROP DATABASE IF EXISTS employeeTracker;

CREATE DATABASE employeeTracker;

USE employeeTracker;

-- DEPARTMENT TABLE ----
CREATE TABLE department
(
  id INT NOT NULL
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
-- ROLE TABLE ----
CREATE TABLE role
  (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  CONSTRAINT FK_depart FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
-- EMPLOYEE ROLE TABLE ----
  CREATE TABLE employee
    (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  CONSTRAINT FK_manager FOREIGN KEY(manager_id) REFERENCES employee(id),
  -- https://www.mysqltutorial.org/mysql-on-delete-cascade/ -- 
  CONSTRAINT FK_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);

-- DEPARTMENT SEEDS -- 
INSERT INTO department (name) 
VALUES 
('Accounting'),
('Maintenance'),
('Engineering'),
('Operations'),
('Management');

-- EMPLOYEE ROLES SEEDS -- 
INSERT INTO role (title, salary, department_id) 
VALUES 
('Director of Operations', 15000, 3),
('Product Engineer', 65069, 3),
('Administrative Assistant', 65000, 2),
('Project Manager', 135000, 4),
('Production Supervisor', 80000, 5),
('IT Specialist', 83000, 5),
('Production Manager', 175000, 3),
('Accountant', 68000, 1),
('Maintenance Manager', 165000, 1),
('Lawyer', 175000, 2);


-- EMPLOYEE NAME SEEDS -- 
INSERT INTO employee (first_name, last_name, manager_id, role_id) 
VALUES 
('Baba', 'Oreilly', null, 1),
('Bubba', 'Gump', null, 2),
('Manny', 'Ramirez', null, 3),
('Julius', 'Caesar', 1, 4),
('Egon', 'Spengler', null, 5),
('Sally', 'Jessie', 4, 6),
('Homer', 'Simpson', 2, 7),
('Duke', 'Nukem', null, 8),
('Peter', 'Venkman', 5, 9),
('Raymond', 'Stantz', 6, 10);