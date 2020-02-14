import request from 'supertest';
import app from '../../src/app';

describe('Controllers -> UserController', () => {
  it('user can be joined on chat', () => {
    return request(app)
      .post('/v1/join')
      .send({
        username: 'Pedro',
      })
      .expect(200)
      .then(res => {
        const { numUsers, users } = res.body;
        expect(numUsers).toBe(1);
        expect(users).toHaveLength(1);
        users.map(u => expect(u).toBe('Pedro'));
      });
  });

  it('user can be joined on chat WITH BLANK on Username', () => {
    return request(app)
      .post('/v1/join')
      .send({
        username: 'Pedro Gabriel Rabelo',
      })
      .expect(200)
      .then(res => {
        const { numUsers, users } = res.body;
        expect(numUsers).toBe(2);
        expect(users).toHaveLength(2);
        const user = users.find(u => u === 'Pedro Gabriel Rabelo');
        expect(user).toBe('Pedro Gabriel Rabelo');
      });
  });

  it('users can be listed from chat', () => {
    return request(app)
      .get('/users')
      .expect(200)
      .then(res => {
        const users = res.body;
        expect(users).toHaveLength(2);
        let user = users.find(u => u === 'Pedro Gabriel Rabelo');
        expect(user).toBe('Pedro Gabriel Rabelo');
        user = users.find(u => u === 'Pedro');
        expect(user).toBe('Pedro');
        user = users.find(u => u === 'Caraciolo');
        expect(user).toBeUndefined();
      });
  });

  it('users can be listed from chat V1', () => {
    return request(app)
      .get('/v1/users')
      .expect(200)
      .then(res => {
        const users = res.body;
        expect(users).toHaveLength(2);
        let user = users.find(u => u === 'Pedro Gabriel Rabelo');
        expect(user).toBe('Pedro Gabriel Rabelo');
        user = users.find(u => u === 'Pedro');
        expect(user).toBe('Pedro');
        user = users.find(u => u === 'Caraciolo');
        expect(user).toBeUndefined();
      });
  });

  it('check if contains user parameters error', () => {
    return request(app)
      .get('/users/available')
      .expect(400);
  });

  it('check if contains existing user', () => {
    return request(app)
      .get('/users/available?username=Pedro')
      .expect(200)
      .then(res => {
        expect(res.body.isAvailable).toBe(false);
      });
  });

  it('check if contains not existing user', () => {
    return request(app)
      .get('/users/available?username=Caraciolo')
      .expect(200)
      .then(res => {
        expect(res.body.isAvailable).toBe(true);
      });
  });

  it('user can leave of chat', () => {
    return request(app)
      .post('/v1/left')
      .send({
        username: 'Pedro Gabriel Rabelo',
      })
      .expect(200)
      .then(res => {
        const { numUsers, users } = res.body;
        expect(numUsers).toBe(1);
        expect(users).toHaveLength(1);
        const user = users.find(u => u === 'Pedro Gabriel Rabelo');
        expect(user).toBeUndefined();
      });
  });

  it('user can leave of chat VALIDATION', () => {
    return request(app)
      .post('/v1/left')
      .send({
        username: 'Pedro Gabriel Rabelo',
      })
      .expect(404);
  });
});
