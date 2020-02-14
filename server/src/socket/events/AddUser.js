import User from '../../models/User';
import Channel from '../../models/Channel';

export const description = 'add user';

export const handler = (chat, socket, username) => {
  if (chat.containsUser(username)) {
    return;
  }

  chat.addUser(new User(username));
  chat.addChannel(new Channel(username));
};
