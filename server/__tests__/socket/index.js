import SocketIOServer from 'socket.io';
import http from 'http';
import SocketIOClient from 'socket.io-client';
import app from '../../src/app';

let ioServer;
let socketClient;
let server;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(process.env.PORT || 3000);

  ioServer = new SocketIOServer(server);

  done();
});

afterAll(done => {
  ioServer.close();
  server.close();
  done();
});

beforeEach(done => {
  socketClient = SocketIOClient.connect('http://localhost:3000', {
    forceNew: true,
    transports: ['websocket'],
  });

  socketClient.on('connect', () => {
    console.log('connected');
    done();
  });
});

afterEach(done => {
  if (socketClient.connected) {
    socketClient.disconnect();
    console.log('disconnected');
  }
  done();
});

describe('Socket -> index connections', () => {
  it('server can send messages to clientes', done => {
    ioServer.emit('echo', 'Hello World');

    socketClient.once('echo', message => {
      expect(message).toBe('Hello World');
      done();
    });
  });

  it('should communicate with waiting for socket.io handshakes', done => {
    socketClient.emit('echo', 'Hello World');

    setTimeout(() => {
      // Put your server side expect() here
      done();
    }, 50);
  });
});
