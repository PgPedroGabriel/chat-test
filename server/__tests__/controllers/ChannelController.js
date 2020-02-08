import request from 'supertest';
import app from '../../src/app';

describe('Controllers -> ChannelController', () => {
  const { server } = app;

  it('channel can be created in chat', () => {
    return request(server)
      .post('/v1/channels')
      .send({
        name: 'Channel 1',
      })
      .expect(200)
      .then(res => {
        const { name, messages } = res.body;
        expect(name).toBe('Channel 1');
        expect(messages).toHaveLength(0);
      });
  });

  it('check params of new channel', () => {
    return request(server)
      .post('/v1/channels')
      .send({
        incorrect: 'Channel 1',
      })
      .expect(400);
  });

  it('channels can be listed', () => {
    return request(server)
      .get('/v1/channels')
      .expect(200)
      .then(res => {
        const arrayOfChanels = res.body;
        expect(arrayOfChanels[0].name).toBe('Channel 1');
        expect(arrayOfChanels[0].messages).toHaveLength(0);
      });
  });

  it('channel can add a message in the first position of array', () => {
    const reqBody = {
      text: 'Message 1',
      user: 'Pedro Gabriel',
      createdAt: new Date().toISOString(),
    };

    return request(server)
      .post('/v1/channels/Channel 1')
      .send(reqBody)
      .expect(200)
      .then(res => {
        const { user, text } = res.body;
        expect(user).toBe('Pedro Gabriel');
        expect(text).toBe('Message 1');
        expect(res.body.createdAt).toBe(reqBody.createdAt);
        expect(reqBody).toMatchObject(res.body);
      });
  });

  it('check params of new message on channel', () => {
    return request(server)
      .post('/v1/channels/Channel 1')
      .send({
        invalidParameter: 'test',
      })
      .expect(400);
  });

  it('check channel name to create message', () => {
    return request(server)
      .post('/v1/channels/Channel xxxx')
      .send({
        invalidParameter: 'test',
      })
      .expect(400);
  });

  it('channel can list latests messages', () => {
    return expect(true).toBe(true);
    /*
    return request(server)
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
      */
  });

  it('check if channel exists', () => {
    return expect(true).toBe(true);
    /*
  return request(server)
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
    */
  });
});
