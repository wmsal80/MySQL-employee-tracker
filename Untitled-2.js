const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// path directories
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// render directory for HTML renderer 
const render = require("./lib/htmlRenderer");
// teammates array
const teammates = [];

// validation function/methods for bonuses 

// valid name function for name, github or school name 
const validName = (input) => {
    if(/\d/.test(input)|| input === ''){
        return 'Please enter a valid name.';
    }else{
        return true;
    }
};
// valid ID validation 
const validID = (input) => {
    if(isNaN(input) || input === ''){
        return 'Please enter a valid number';
    }else{
        return true;
    }
};
// valid email validation method
const validEmail = (input) => {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input) || input === ''){
        return true;
    }else{
        return 'Please enter a valid e-mail address.'
    }
};

// create team function
function createTeam(){

// inquirer prompt to begin the questions for the application
    inquirer.prompt([
        {
            type: 'list',
            message: 'What is your current position/role?',
            name: 'userChoice',
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'No other Employees'

            ]

        }
    ]).then(userInput =>{
        // switch case for user input and user choice
        switch(userInput.userChoice){
            // for the case choice run the method or render the list of teammates 
            case 'Manager': addManager(); break;
            case 'Engineer': addEngineer(); break;
            case 'Intern': addIntern(); break; 
            case 'No other Employees' : render(teammates); break
        }
    })

    // add manager method
    function addManager(){
        // inquirer prompt to begin the questions for the manager prompts
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'managerName',
                validate: validName,

            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'managerEmail', 
                validate: validEmail, 

            },
            {
                type: 'input',
                message: 'What is your ID number?',
                name: 'managerID',
                validate: validID
            },
            {
                type: 'input',
                message: 'What is your Office Number?',
                name: 'managerOfficeNumber',
                validate: validID
            },
        ]).then(userInput => {
            console.log(userInput);
            // new manager created
            const manager = new Manager(userInput.managerName, userInput.managerEmail, userInput.managerID, userInput.managerOfficeNumber);
           // push manager to teammates array 
            teammates.push(manager)

            createTeam();

        })
    }


// add engineer method
    function addEngineer(){
         // inquirer prompt to begin the questions for the engineer prompts
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'engineerName',
                validate: validName
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'engineerEmail',
                validate: validEmail
            },
            {
                type: 'input',
                message: 'What is your ID number?',
                name: 'engineerID',
                validate: validID
            },
            {
                type: 'input',
                message: 'What is your github username?',
                name: 'engineerGithub',
                validate: validName
            },
        ]).then(userInput => {
            console.log(userInput);
            // new engineer created
            const engineer = new Engineer(userInput.engineerName, userInput.engineerEmail, userInput.engineerID, userInput.engineerGithub);
           // push engineer to teammates array 
            teammates.push(engineer);

            createTeam();
        })
    }
    // add intern method
    function addIntern(){
        // inquirer prompt to begin the questions for the intern prompts 
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'internName',
                validate: validName

            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'internEmail',
                validate: validEmail
            },
            {
                type: 'input',
                message: 'What is your ID Number?',
                name: 'internID',
                validate: validID
            },
            {
                type: 'input',
                message: 'What is the school you are attending?',
                name: 'internSchool',
                validate: validName
            },
        ]).then(userInput => {
            console.log(userInput);
            // new intern created 
            const intern = new Intern(userInput.internName, userInput.internEmail, userInput.internID, userInput.internSchool);
            // push new intern to teammates array 
            teammates.push(intern);

            createTeam();
        })
    }


}

// export teammates 
module.exports = teammates;
// create team function call 
createTeam();