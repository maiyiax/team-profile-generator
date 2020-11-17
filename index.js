const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib//Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const generateHTML = require('./src/generate-html');
const { rejects } = require('assert');

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

// function to prompt user
function promptUser() {
    return inquirer
        // prompt Manager questions first
        .prompt(
            [
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
            ])

        // WHEN I enter the team manager’s name, employee ID, email address, and office number
        // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

        .then(addEmployee)
        .catch(err => {
            console.log(err);
        });
};


// This function prompts the questions for Engineers and Interns
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
                name: 'name',
                message: "What is the employee's name?",
                validate: employeeNameInput => {
                    if (employeeNameInput) {
                        return true;
                    } else {
                        console.log("Please provide the employee's name!");
                        return false;
                    }
                }
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
        .then(({ role }) => {

            // if engineer was selected
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

                // if intern was selected
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

// this function checks if user would like to add additional employees
function addEmployee() {
    inquirer.prompt({
        type: 'confirm',
        name: 'add',
        message: 'Would you like to add another employee?',
        default: false
    })
    .then(({ add }) => {
        // if user chooses to add another employee, then prompt employee questions again
        if (add) {
            return employeeQuestions();

            // if there are no more employees, generate the html
        } else {
            generateHTML();
            writeToFile();
        };
    });
};

// function to generate html file
const writeToFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            reject(err);
            return;
        }

        console.log("HTML has been generated!")
    });
};

promptUser();