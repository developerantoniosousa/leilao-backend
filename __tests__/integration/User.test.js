import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'developerantoniosousa@gmail.com',
      password_hash: '123123',
    });
    expect(response.body).toHaveProperty('id');
  });
});
