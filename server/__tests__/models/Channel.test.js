import Channel from '../../src/models/Channel';
import Message from '../../src/models/Message';
import User from '../../src/models/User';

describe('Socket -> Model -> Channel', () => {
  it('channel can be created', () => {
    const channel = new Channel('test');

    expect(channel.name).toBe('test');
    expect(channel.messages).toHaveLength(0);
  });

  it('channel added messages', () => {
    const channel = new Channel('test');
    const user = new User('pedro');

    channel.addMessage(new Message(user, channel, 'Contenttttt'));
    channel.addMessage(new Message(user, channel, 'xxxx'));
    channel.addMessage(new Message(user, channel, '444'));
    channel.addMessage(new Message(user, channel, '333'));

    expect(channel.messages).toHaveLength(4);
  });
});
