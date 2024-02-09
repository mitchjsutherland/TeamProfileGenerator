// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee.js');

class Manager extends Employee {
    constructor(name, id, officeNumber) {
        super(name, id);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

};

module.exports = Manager;