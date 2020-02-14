import request from 'supertest';
import app from '../../src/app';

describe('Controllers -> ChannelController', () => {
  it('channel can be created in chat', () => {
    return request(app)
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
    return request(app)
      .post('/v1/channels')
      .send({
        incorrect: 'Channel 1',
      })
      .expect(400);
  });

  it('channels can be listed', () => {
    return request(app)
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
      sender: 'Pedro Gabriel',
      createdAt: new Date().toISOString(),
      user: {
        name: 'Pedro Gabriel',
      },
    };

    return request(app)
      .post('/v1/channels/Channel 1')
      .send(reqBody)
      .expect(200)
      .then(res => {
        const { sender, text } = res.body;
        expect(sender).toBe('Pedro Gabriel');
        expect(text).toBe('Message 1');
        expect(res.body.createdAt).toBe(reqBody.createdAt);
        expect(reqBody).toMatchObject(res.body);
      });
  });

  it('check params of new message on channel', () => {
    return request(app)
      .post('/v1/channels/Channel 1')
      .send({
        invalidParameter: 'test',
      })
      .expect(400);
  });

  it('check channel name to create message', () => {
    return request(app)
      .post('/v1/channels/Channel xxxx')
      .send({
        invalidParameter: 'test',
      })
      .expect(400);
  });

  const create45Messages = channel => {
    const promises = [];

    for (let i = 2; i < 47; i += 1) {
      const reqBody = {
        text: `Message ${i}`,
        sender: 'Pedro Gabriel',
        createdAt: new Date().toISOString(),
      };
      // eslint-disable-next-line no-await-in-loop
      promises.push(
        request(app)
          .post(`/v1/channels/${channel}`)
          .send(reqBody)
      );
    }

    return promises;
  };

  it('channel can list 20 latests messages', async () => {
    const channel = 'Channel 1';
    const promises = create45Messages(channel);
    await Promise.all(promises);

    return request(app)
      .get(`/v1/channels/${channel}`)
      .expect(200)
      .then(res => {
        const messages = res.body;
        expect(messages).toHaveLength(20);
      });
  });

  it('channel can execute pagination', async () => {
    const channel = 'Channel 1';

    return request(app)
      .get(`/v1/channels/${channel}?next=20`)
      .expect(200)
      .then(res => {
        const messages = res.body;
        expect(messages).toHaveLength(20);
        expect(messages[0].text).toBe('Message 26');
        expect(messages[messages.length - 1].text).toBe('Message 7');
      });
  });
});
