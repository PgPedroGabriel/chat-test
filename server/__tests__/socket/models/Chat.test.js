import Chat from '../../../src/socket/models/Chat';
import Channel from '../../../src/socket/models/Channel';
import User from '../../../src/socket/models/User';

describe('Socket -> Model -> Chat', () => {
  it('chat can be created', () => {
    const chat = new Chat();

    expect(chat).not.toBeNull();
  });

  it('chat can add users', () => {
    const chat = new Chat();

    const user1 = new User('pedro1');
    const user2 = new User('pedro2');
    const user3 = new User('pedro3');

    chat.addUser(user1);
    chat.addUser(user2);
    chat.addUser(user3);

    expect(Object.keys(chat.users)).toHaveLength(3);
  });

  it('chat can validate usernames', () => {
    const chat = new Chat();
    const user1 = new User('pedro');

    chat.addUser(user1);

    expect(Object.keys(chat.users)).toHaveLength(1);

    const user2 = new User('pedro');
    expect(() => chat.addUser(user2)).toThrow(Error);
  });

  it('chat can delete usernames', () => {
    const chat = new Chat();
    const user1 = new User('pedro');

    chat.addUser(user1);

    expect(Object.keys(chat.users)).toHaveLength(1);

    chat.removeUser(user1.username);

    expect(Object.keys(chat.users)).toHaveLength(0);
  });

  it('chat can create channels', () => {
    const chat = new Chat();
    const channel = new Channel('test');
    const channel2 = new Channel('test2');

    chat.addChannel(channel);
    chat.addChannel(channel2);

    expect(Object.keys(chat.channels)).toHaveLength(2);
  });

  it('chat can validate channels names', () => {
    const chat = new Chat();
    const channel = new Channel('test');

    chat.addChannel(channel);
    expect(Object.keys(chat.channels)).toHaveLength(1);

    const channel2 = new Channel('test');
    expect(() => chat.addChannel(channel2)).toThrow(Error);
  });
});
