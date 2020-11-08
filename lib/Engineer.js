const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // call parent constructor
        super(name, id, email);

        this.github = github;
    }

    // return github name
    getGithub() {
        return `${this.github}`;
    }

    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;