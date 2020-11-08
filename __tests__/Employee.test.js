const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    const employee = new Employee('Mai', 235, 'maiyiax@gmail.com');

    expect(employee.name).toBe('Mai');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

});

test('get employee name', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');

    expect(employee.getName()).toBe('Mai');
});

test('get employee id', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');

    expect(employee.getId()).toEqual(expect.any(Number));
});

test('get employee email', () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');

    expect(employee.getEmail()).toEqual(expect.any(String));
});

test("get employee role", () => {
    const employee = new Employee ("Mai", 235, 'maiyiax@gmail.com');

    expect(employee.getRole()).toEqual(expect.stringContaining('Employee'));
});

