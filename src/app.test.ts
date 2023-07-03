import request from 'supertest';
import { app } from './app';
import { UserDto } from './db/types';

const port = 4000;
const host = `localhost:${port}`;

describe('Api tests: Scenario 1', () => {
  let server: any;

  beforeAll(async () => {
    server = await app(port);
  });

  afterAll(async () => {
    server.exit();
  });

  test('Get all records with a GET api/users request', async () => {
    const res = await request(host).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });

  test('A new object is created by a POST api/users request', async () => {
    const userDto: UserDto = { username: 'Test User', age: 10, hobbies: [] };
    const res = await request(host).post('/api/users').send(userDto);
    const id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual({ ...userDto, id });
  });

  test('update the created record with a PUT api/users/{userId}request ', async () => {
    const userDto: UserDto = { username: 'Test User', age: 10, hobbies: [] };
    const createRes = await request(host).post('/api/users').send(userDto);
    const userId = createRes.body.id;
    const updatedUserDto = { username: 'Updated User', age: 30, hobbies: ['Hobby'] };
    const res = await request(host).put(`/api/users/${userId}`).send(updatedUserDto);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ ...updatedUserDto, id: userId });
  });

  test('a DELETE api/users/{userId} request, we delete the created object by id', async () => {
    const userDto: UserDto = { username: 'Test User', age: 10, hobbies: [] };
    const createRes = await request(host).post('/api/users').send(userDto);
    const userId = createRes.body.id;
    const res = await request(host).delete(`/api/users/${userId}`);
    expect(res.status).toBe(204);
  });
});

describe('Api tests: Scenario 2', () => {
  const fakeUUID = '57bd9b19-6c5c-4bf7-8709-76631c9e2ad7';
  const invalidUUID = '2145123412341234';
  let server: any;

  beforeAll(async () => {
    server = await app(port);
  });

  afterAll(() => {
    server.exit();
  });

  test('GET api/users/{userId} return 404 error if user do not exist', async () => {
    const res = await request(host).get(`/api/users/${fakeUUID}`);
    expect(res.status).toBe(404);
  });

  test('GET api/users/{userId} return 400 error if invalid uuid given', async () => {
    const res = await request(host).get(`/api/users/${invalidUUID}`);
    expect(res.status).toBe(400);
  });

  test('POST api/users return 400 error if invalid body given', async () => {
    const userDto = { foo: 'Test User', bar: 10, hobbies: [] };
    const res = await request(host).put(`/api/users/${fakeUUID}`).send(userDto);
    expect(res.status).toBe(400);
  });

  test('DELETE api/users/{userId} return 400 error if invalid uuid given', async () => {
    const invalidUUID = '2145123412341234';
    const res = await request(host).delete(`/api/users/${invalidUUID}`);
    expect(res.status).toBe(400);
  });

  test('DELETE api/users/{userId} return 404 error if user do not exist', async () => {
    const fakeUUID = '57bd9b19-6c5c-4bf7-8709-76631c9e2ad7';
    const res = await request(host).delete(`/api/users/${fakeUUID}`);
    expect(res.status).toBe(404);
  });
});

describe('Api tests: Scenario 3', () => {
  let server: any;

  beforeAll(async () => {
    server = await app(port);
  });

  afterAll(() => {
    server.exit();
  });

  test('GET to unknown url should return 404 error', async () => {
    const res = await request(host).get(`/someurl`);
    expect(res.status).toBe(404);
  });

  test('POST to unknown url should return 404 error', async () => {
    const res = await request(host).post(`/someurl`).send({});
    expect(res.status).toBe(404);
  });

  test('DELETE to unknown url should return 404 error', async () => {
    const res = await request(host).delete(`/delete`);
    expect(res.status).toBe(404);
  });
});
