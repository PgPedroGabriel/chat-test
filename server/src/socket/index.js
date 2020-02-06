import SocketIO from 'socket.io';
import server from '../app';

const io = new SocketIO(server);

io.on('connection', socket => {
  console.log(socket);
});
