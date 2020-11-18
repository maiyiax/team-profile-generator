// create a function to generate manager card
const generateManagerCard = managerCardInfo => {
    const {name, id, email, office} = managerCardInfo;

    return `
    <div class="col mb-4">
        <div class="card" style="width: 18rem;">
            <div class="card-header bg-primary text-light">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Manager</p>
            </div>
            <div class="card-body bg-light">
                <div class="border rounded">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id} #</li>
                        <li class="list-group-item">
                            Email:<a href="mailto:address@email.com" target="_blank" class="card-link"> ${email}</a>
                        </li>
                        <li class="list-group-item">Office Number: ${office}</li>
                    </ul>                   
                </div>
            </div>
        </div>
    </div>
    `
};

// create a function to generate engineer card
const generateEngineerCard = engineerCardInfo => {
    const {name, id, email, github} = engineerCardInfo;

    if (!engineerCardInfo) {
        return '';
    }

    return `
    <div class="col mb-4">

        <div class="card" style="width: 18rem;">

            <div class="card-header bg-primary text-light">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Engineer</p>
            </div>

            <div class="card-body bg-light">
                <div class="border rounded">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id} #</li>
                        <li class="list-group-item">
                            Email:<a href="mailto:address@email.com" class="card-link"> ${email}</a>
                        </li>
                        <li class="list-group-item">
                            Github:<a href="#" target="_blank" class="card-link"> ${github}</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    </div>

    `
}
// create a function to generate intern card
const generateInternCard = internCardInfo => {
    const {name, id, email, school} = internCardInfo;

    if (!internCardInfo) {
        return '';
    }

    return `
    <div class="col mb-4">

        <div class="card" style="width: 18rem;">

            <div class="card-header bg-primary text-light">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Intern</p>
            </div>

            <div class="card-body bg-light">
                <div class="border rounded">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${id} #</li>
                        <li class="list-group-item">
                            Email:<a href="mailto:address@email.com" class="card-link"> ${email}</a>
                        </li>
                        <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>
            </div>

        </div>

    </div>
    `
}

// generate employee cards
const generateEmployeeCards = employeeInfo => {
    if (employeeInfo.Manager) {
        return `
        <div class="col mb-4">
            <div class="card" style="width: 18rem;">
                <div class="card-header bg-primary text-light">
                    <h5 class="card-title">${employeeInfo.Manager.name}</h5>
                    <p class="card-text">Manager</p>
                </div>
                <div class="card-body bg-light">
                    <div class="border rounded">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${employeeInfo.Manager.id} #</li>
                            <li class="list-group-item">
                                Email:<a href="mailto:address@email.com" target="_blank" class="card-link"> ${employeeInfo.Manager.email}</a>
                            </li>
                            <li class="list-group-item">Office Number: ${employeeInfo.Manager.office}</li>
                        </ul>                   
                    </div>
                </div>
            </div>
        </div>
        `
    };
}

// function to generate html

const generateHTML = () => {
    return `
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
        <h1 class="bg-danger text-white text-center m-auto">My Team</h1>
        </header>

        <div class='d-flex flex-wrap p-3 m-4'>
            ${generateManagerCard}
            ${generateEngineerCard}
            ${generateInternCard}
        </div>
        </body>

        </html>
    `
}



module.exports = { generateManagerCard, generateEngineerCard, generateInternCard, generateHTML };