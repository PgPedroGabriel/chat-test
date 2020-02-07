import SocketIO from 'socket.io';
import http from 'http';
import app from '../app';
import events from './events/index';

const io = new SocketIO(http.createServer(app));

io.on('connection', socket => {
  Object.keys(events).forEach(key =>
    socket.on(events[key].description, events[key].handler)
  );
});
