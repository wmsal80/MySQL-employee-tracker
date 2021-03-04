const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
const clear = require('clear');

//SQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeTracker",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  menuPrompt();
});

function menuPrompt() {
  // inquirer prompts for user to select what they want to do to begin
  inquirer.prompt([{
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View Employees",
      "View Employees By Roles",
      "View Employees By Departments",
      "Update Employee",
      "Add Employee",
      "Remove Employee",
      "Add Role",
      "Remove Role",
      "View Departments",
      "Add Department",
      "Remove Department",
      "Quit",
    ]
  }, ]).then(function(result) {
    
    switch (result.choice) {
      case "View Employees":
        viewEmployees();
        break;

      case "View Employees By Roles":
        viewEmployeesByRoles();
        break;

      case "View Employees By Departments":
        viewEmployeesByDepartments();
        break;

      case "Update Employee":
        updateEmployee();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Add Role":
        addRole();
        break;

      case "Remove Role":
        removeRole();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "View Departments":
        viewDepartments();
        break;

      case "Remove Department":
        removeDepartment();
        break;

      case "Back to Start":
        menuPrompt();
        break;

      case "Quit":
        quit();
        break;
    }
  });
}

// View Employees
function viewEmployees() {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
}

// View Employees By Roles
function viewEmployeesByRoles() {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
}

// View All Employees by Department
function viewEmployeesByDepartments() {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  });
}

// Update Employee
function updateEmployee() {
  inquirer.prompt([{
      type: "input",
      message: "Which employee would you like to update?",
      name: "employeeUpdate",
    },
    {
      type: "input",
      message: "Add a new Role ID",
      name: "updateRole",
    },
  ]).then(function(answer) {
    connection.query(
      "UPDATE employee SET role_id=? WHERE first_name= ?;",
      [answer.updateRole, answer.employeeUpdate],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      }
    )
  });
}

// Add Employee
function addEmployee() {
  inquirer.prompt([{
      type: "input",
      message: "What is the employee's first name?",
      name: "FirstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "LastName",
    },
    {
      type: "input",
      message: "What is the employee's id number?",
      name: "Id",
    },
    {
      type: "input",
      message: "What is the employee's manager id number?",
      name: "aeManagerId",
    },
  ]).then(function(answer) {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
      [
        answer.FirstName,
        answer.LastName,
        answer.Id,
        answer.ManagerId,
      ],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      }
    );
  });
}

// Add Role
function addRole() {
  inquirer.prompt([{
      type: "input",
      message: "What is the position title?",
      name: "RRole",
    },
    {
      type: "input",
      message: "What compensation is offered?",
      name: "RSalary",
    },
    {
      type: "input",
      message: "What is the department id number?",
      name: "RId",
    },
  ]).then(function(answer) {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
      [answer.RRole, answer.RSalary, answer.RId],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      }
    )
  });
};

// Add Department
function addDepartment() {
  inquirer.prompt([{
    type: "input",
    message: "Department title:",
    name: "departmentName",
  }, ]).then(function(answer) {
    connection.query(
      "INSERT INTO department (name) VALUES (?);",
      [answer.departmentName],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompt();
      }
    );
  });
};

function removeEmployee() {
  inquirer.prompt([{
      type: "input",
      message: "Employees first name:",
      name: "removeEmployeeF"
    },
    {
      type: "input",
      message: "Employees last name:",
      name: "removeEmployeeL"
    },
  ]).then(function(answer) {
    connection.query("DELETE FROM employee WHERE first_name=? AND last_name=?;", [answer.removeEmployeeF, answer.removeEmployeeN], (err, res) => {
      if (err) throw err;
      console.table(res);
      menuPrompt();
    })
  });
};

function removeDepartment() {
  inquirer.prompt([{
    type: "input",
    message: "Department title:",
    name: "removeDepartment"
  }, ]).then(function(answer) {
    console.log("You have successfully removed " + answer.removeDepartment);

    connection.query("DELETE FROM department WHERE name=?;", [answer.removeDepartment], (err, res) => {
      if (err) throw err;
      console.table(res);
      menuPrompt();
    })
  })
};

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    menuPrompt();
  })
}

function removeRole() {
  inquirer.prompt([{
    type: "input",
    message: "Which role do you want to delete?",
    name: "removeRole",
  }, ]).then(function(answer) {
    connection.query("DELETE FROM role WHERE title= ?;", [answer.removeRole], (err, res) => {
      if (err) throw err;
      console.table(res);
      menuPrompt();
    })
  })
};


// Quit Function
function quit() {

  connection.end();
  process.exit();
};