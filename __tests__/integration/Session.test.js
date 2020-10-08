import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';
import factories from '../factories';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return a user and credentials to authentication', async () => {
    const user = await factories.attrs('User');
    await request(app).post('/api/users').send(user);
    const response = await request(app).post('/api/sessions').send(user);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should return a response code as 400 if the request data is incorrect', async () => {
    const crendentials = {};
    const response = await request(app)
      .post('/api/sessions')
      .send(crendentials);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
