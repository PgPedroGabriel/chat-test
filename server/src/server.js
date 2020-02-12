import http from 'http';
import app from './app';
import io from './socket/index';

const server = http.createServer(app);
io.listen(server);

server.listen(process.env.PORT || 3000);
