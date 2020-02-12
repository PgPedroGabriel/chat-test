import User from '../../models/User';
import { description as UserJoinedDescription } from './UserJoined';

export const handler = (chat, socket, username) => {
  if (chat.containsUser(username)) {
    return;
  }

  socket.username = username;
  chat.addUser(new User(username));
  socket.broadcast.emit(UserJoinedDescription, {
    username,
    numUsers: chat.getNumUsers(),
  });
};

export const description = 'add user';
