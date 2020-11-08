const Manager = require('../lib/Manager.js');

test('creates manager object', () => {
    const manager = new Manager('John', 555, 'john@email.com', 1);

    expect(manager.name).toBe('John');
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("get manager role", () => {
    const manager = new Manager('John', 555, 'john@email.com', 1);

    expect(manager.getRole()).toEqual(expect.stringContaining('Manager'));
});