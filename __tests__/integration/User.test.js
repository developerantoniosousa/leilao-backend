import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factories from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should create a new user', async () => {
    const user = await factories.attrs('User');
    const response = await request(app).post('/api/users').send(user);
    expect(response.body).toHaveProperty('id');
  });

  it('should not create user with the same email', async () => {
    const user = factories.attrs('User');
    await request(app).post('/api/users').send(user);
    const response = await request(app).post('/api/users').send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
