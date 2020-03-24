const request = require('supertest');

const app = require('../src/app');

test('Test new user', async () => {
    await request(app).post('/users').send({
        name:'Ted',
        email:'ted@gmail.com',
        password:'1234567'
    }).expect(201);
});