const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    const employee = new Employee('Mai', 235, 'maiyiax@gmail.com');

    expect(employee.name).toBe('Mai');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

});

test('get employee name', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');
    const name = employee.name;

    expect(employee.getName()).toBe(name);
});

test('get employee id', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');
    const id = employee.id;

    expect(employee.getId()).toEqual(id);
});

test('get employee email', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');
    const email = employee.email;

    expect(employee.getEmail()).toEqual(email);
});

test("get employee role", () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');

    expect(employee.getRole()).toEqual(expect.any(Object));
});

