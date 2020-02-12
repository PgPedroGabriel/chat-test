import Socketio from 'socket.io';
import app from '../app';
import {
  description as addUserEvent,
  handler as addUserHandler,
} from './events/AddUser';

import {
  description as NewMessageEvent,
  handler as NewMessageHandler,
} from './events/NewMessage';

const io = new Socketio();

io.on('connection', socket => {
  console.log('connected');
  socket.on(addUserEvent, username => {
    const chat = app.server.get('chat');
    addUserHandler(chat, socket, username);
  });

  socket.on(NewMessageEvent, data => {
    const chat = app.server.get('chat');
    NewMessageHandler(chat, socket, data);
  });
});

export default io;
