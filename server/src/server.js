import server from './app';
import './socket/index';

server.listen(process.env.PORT || 300);
