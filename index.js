const inquirer = require('inquirer');
const Manager = require('./lib//Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');

// questions for manager
const managerQuestions = [
    {
        type: 'text',
        name: 'name',
        message: "What is the manager's name?",
        validate: managerInput => {
            if (managerInput) {
                return true;
            } else {
                console.log("You must provide a team manager's name!");
                return false;
            }
        }
    },
    {
        type: 'text',
        name: 'ID',
        message: "What is the Managers ID number?"
    },
    {
        type: 'text',
        name: 'email',
        message: "What is the Manager's email address?"
    },
    {
        type: 'text',
        name: "office",
        message: "What is the Manager's office number?"
    }
];

function employeeQuestions() {
    return inquirer.prompt(
        [
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'text',
            name: 'ID',
            message: "What is the employee's ID number?"
        },
        {
            type: 'text',
            name: 'email',
            message: "What is the employee's email address?"
        }
    ])
    .then(({role}) => {
        if (role === 'Engineer') {
            return inquirer.prompt([
                {
                    type: 'text',
                    name: 'github',
                    message: "What is the Engineer's github name?",
                    validate: githubInput => {
                        if (githubInput) {
                            return true;
                        } else {
                            console.log("You must provide the employee's github name!");
                            return false;
                        }
                    }
                }
            ])
        } else {
            return inquirer.prompt([
                {
                    type: 'text',
                    name: 'school',
                    message: "What school did the Intern attend?",
                    validate: schoolInput => {
                        if (schoolInput) {
                            return true;
                        } else {
                            console.log("You must provide the name of the employee's school!")
                        }
                    }
                }
            ])
        }
    })
    // check if the user wants to add another employee
    .then(addEmployee);
};

function addEmployee() {
    inquirer.prompt ({
        type: 'confirm',
        name: 'add',
        message: 'Would you like to add another employee?',
        default: false
    })
    .then(({add}) => {
        if (add === true) {
            return employeeQuestions();
        }
    })   
};

// function to prompt user
function promptUser() {
    return inquirer
        // prompt Manager question first
        .prompt(managerQuestions)
        // check if employees need to be added
        .then(addEmployee)

};

promptUser();