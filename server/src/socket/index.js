import Socketio from 'socket.io';
import app from '../app';
import {
  description as addUser,
  handler as addUserHandler,
} from './events/AddUser';

import { handler as userJoinedHandler } from './events/UserJoined';

import {
  description as newMessage,
  handler as newMessageHandler,
} from './events/NewMessage';

import {
  description as userTyping,
  handler as userTypingHandle,
} from './events/UserTyping';

import {
  description as userStoppedTyping,
  handler as userStoppedTypingHandle,
} from './events/UserStoppedTyping';

import { handler as userLeftHandler } from './events/UserLeft';

const io = new Socketio();

io.on('connection', socket => {
  socket.on(addUser, username => {
    const chat = app.get('chat');
    socket.username = username;

    addUserHandler(chat, socket, username);
    userJoinedHandler(socket);
  });

  socket.on(newMessage, data => {
    const chat = app.get('chat');
    newMessageHandler(chat, socket, data);
  });

  socket.on(userTyping, data => {
    userTypingHandle(socket, data);
  });
  socket.on(userStoppedTyping, data => {
    userStoppedTypingHandle(socket, data);
  });

  socket.on('disconnect', () => {
    const chat = app.get('chat');
    if (chat) {
      userLeftHandler(socket, chat);
    }
  });
});

export default io;
