import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'developerantoniosousa@gmail.com',
      password: '123123',
    });
    expect(response.body).toHaveProperty('id');
  });

  it('should not create user with the same email', async () => {
    const user = {
      email: 'developerantoniosousa@gmail.com',
      password: '123123',
    };
    await request(app).post('/api/users').send(user);
    const response = await request(app).post('/api/users').send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
