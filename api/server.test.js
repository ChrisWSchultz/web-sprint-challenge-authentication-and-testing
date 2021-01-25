const supertest = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeEach(async () => {
    await db.seed.run();
});

afterAll( async () => {
    await db.destroy();
});

describe('auth/register', () => {
    it('register new user', async () => {
        const response = await supertest(server)
            .post('/api/auth/register')
            .send({"username": "scott", "password": "12345"});
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
    });

    it('returns error if username taken', async () => {
        const response = await supertest(server)
            .post('/api/auth/register')
            .send({"username": "kirk", "password": "12345"});
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toBe('username taken')
    });

});

describe('auth/login', () => {
    it('returns token on successful login', async () => {
        const response = await supertest(server)
            .post('/api/auth/login')
            .send({"username": "kirk", "password": "12345"});
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });

    it('returns error if username missing', async () => {
        const response = await supertest(server)
            .post('/api/auth/register')
            .send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toBe('username and password required');
    });

});
