const supertest = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

beforeEach(async () => {
  await db.seed.run();
});

afterAll( async () => {
  await db.destroy();
});

describe();
