const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib//Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
//const generatePage = require('./src/generate-html.js');

// set empty arrays to hold objects
let managerArray = [];
let engineerArray = [];
let internArray = [];

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

// function to prompt user
const promptUser = () => {
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
                    name: 'id',
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

        .then(managerResponse => {
            // push manager information into the employee array
            const manager = new Manager(managerResponse.name, managerResponse.id, managerResponse.email, managerResponse.office);


            managerArray.push(manager);

        })

        // WHEN I enter the team manager’s name, employee ID, email address, and office number
        // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

        .then(addEmployee)
        .catch(err => {
            console.log(err);
        });
};


// This function prompts the questions for Engineers and Interns
const employeeQuestions = () => {
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
                name: 'id',
                message: "What is the employee's ID number?"
            },
            {
                type: 'text',
                name: 'email',
                message: "What is the employee's email address?"
            }
        ])
        .then(({ role, name, id, email }) => {

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
                ]).then(({ github }) => {
                    const engineer = new Engineer(name, id, email, github);

                    engineerArray.push(engineer);
                });

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
                    .then(({ school }) => {
                        const intern = new Intern(name, id, email, school);

                        internArray.push(intern);
                    });
            }
        })
        // check if the user wants to add another employee
        .then(addEmployee)
};

// this function checks if user would like to add additional employees
const addEmployee = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'add',
        message: 'Would you like to add another employee?',
        default: false
    })
        .then(({ add }) => {
            // if user chooses to add another employee, then prompt employee questions again
            if (add) {
                console.log(`
            ====================
            Add Another Employee
            ====================
            `)
                return employeeQuestions();

                // if there are no more employees, generate the html
            } else {
                writeToFile();
            };
        });
};

// block of code to generate html starts===================================================//

// function to generate html template
// const generateHTML = () => {
//     generateCards();

//     `
//         <!DOCTYPE html>
//         <html lang="en">

//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>My Team Profile</title>
//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
//         </head>

//         <body>
//             <header>
//                 <h1 class="bg-danger text-white text-center m-auto">My Team</h1>
//             </header>

//             <div class='d-flex flex-wrap p-3 m-4'>
//             ${generateCards}
//             </div>
//         </body>

//         </html>

//     `
//     ;

// };

// function to generate employee cards

let managerInfo = "";
const generateManagerCard = () => {
    // loop through manager array
    for (let i = 0; i < managerArray.length; i++) {
        managerInfo = `
                <div class="col mb-4">
                    <div class="card" style="width: 18rem;">
                        <div class="card-header bg-primary text-light">
                            <h5 class="card-title">${managerArray[i].name}</h5>
                            <p class="card-text">Manager</p>
                        </div>
                        <div class="card-body bg-light">
                            <div class="border rounded">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">ID: ${managerArray[i].id} #</li>
                                    <li class="list-group-item">
                                        Email:<a href="mailto:address@email.com" target="_blank" class="card-link"> ${managerArray[i].email}</a>
                                    </li>
                                    <li class="list-group-item">Office Number: ${managerArray[i].office}</li>
                                </ul>                   
                            </div>
                        </div>
                    </div>
                </div>
                `;
    };
    return managerInfo;
};


let engineerInfo = "";
const generateEngineerCard = () => {
    // loop through engineer array
    for (let j = 0; j < engineerArray.length; j++) {
        engineerInfo = `
            <div class="col mb-4">

                <div class="card" style="width: 18rem;">

                    <div class="card-header bg-primary text-light">
                        <h5 class="card-title">${engineerArray[j].name}</h5>
                        <p class="card-text">Engineer</p>
                    </div>

                    <div class="card-body bg-light">
                        <div class="border rounded">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">ID: ${engineerArray[j].id} #</li>
                                <li class="list-group-item">
                                    Email:<a href="mailto:address@email.com" class="card-link"> ${engineerArray[j].email}</a>
                                </li>
                                <li class="list-group-item">
                                    Github:<a href="https://github.com/${engineerArray[j].github}" target="_blank" class="card-link"> ${engineerArray[j].github}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

            `
    };
    return engineerInfo;
};


let internInfo = "";
const generateInternCard = () => {
    // loop through intern array
    for (let k = 0; k < internArray.length; k++) {
        internInfo = `
                <div class="col mb-4">
    
                    <div class="card" style="width: 18rem;">
    
                        <div class="card-header bg-primary text-light">
                            <h5 class="card-title">${internArray[k].name}</h5>
                            <p class="card-text">Intern</p>
                        </div>
    
                        <div class="card-body bg-light">
                            <div class="border rounded">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">ID: ${internArray[k].id} #</li>
                                    <li class="list-group-item">
                                        Email:<a href="mailto:address@email.com" class="card-link"> ${internArray[k].email}</a>
                                    </li>
                                    <li class="list-group-item">School: ${internArray[k].school}</li>
                                </ul>
                            </div>
                        </div>
    
                    </div>
    
                </div>
                `
    };
    return internInfo;
};



// end code block=========================================================================================//
const writeToFile = () => {
    fs.writeFile('./dist/index.html',
        `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team Profile</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    </head>
    
    <body>
        <header>
            <h1 class="bg-danger text-white text-center m-auto p-4">My Team</h1>
        </header>
    
        <div class='d-flex flex-wrap p-3 m-4'>
        ${generateManagerCard()}
        ${generateEngineerCard()}
        ${generateInternCard()}
        </div>
    </body>
    
    </html>
    
`
        , err => {
            if (err) throw err;

            console.log(`
        ========================
        HTML has been generated!
        ========================
        `);
        });

}


promptUser();
