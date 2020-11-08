const { timeStamp } = require('console')
const Intern = require('../lib/Intern.js')

test('create intern object', () => {
    const intern = new Intern ('A', 333, 'a@email.com', 'UW')

    expect(intern.name).toBe('A');
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});

test("get intern's school name", () => {
    const intern = new Intern ('A', 333, 'a@email.com', 'UW')

    expect(intern.getSchool()).toEqual(expect.any(String));
});

test('get intern role', () => {
    const intern = new Intern ('A', 333, 'a@email.com', 'UW')

    expect(intern.getRole()).toEqual(expect.stringContaining('Intern'));
})