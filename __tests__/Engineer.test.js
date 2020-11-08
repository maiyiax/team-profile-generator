const Engineer = require('../lib/Engineer.js')

test('creates engineer object', () => {
    const engineer = new Engineer('Jane', 555, 'jane@email.com', 'JaneD');

    expect(engineer.name).toBe('Jane');
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
});

test('get github name', () => {
    const engineer = new Engineer('Jane', 555, 'jane@email.com', 'JaneD');

    expect(engineer.getGithub()).toEqual(expect.any(String));
})

test("get engineer role", () => {
    const engineer = new Engineer('Jane', 555, 'jane@email.com', 'JaneD');

    expect(engineer.getRole()).toEqual(expect.stringContaining('Engineer'));
});