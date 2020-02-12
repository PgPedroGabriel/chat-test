import SocketIO from 'socket.io';
import http from 'http';
import app from '../app';
import {
  description as addUserEvent,
  handler as addUserHandler,
} from './events/AddUser';

import {
  description as NewMessageEvent,
  handler as NewMessageHandler,
} from './events/NewMessage';

const io = new SocketIO(http.createServer(app));

io.on('connection', socket => {
  socket.on(addUserEvent, username => {
    const chat = app.server.get('chat');
    addUserHandler(chat, socket, username);
  });

  socket.on(NewMessageEvent, data => {
    const chat = app.server.get('chat');
    NewMessageHandler(chat, socket, data);
  });
});
