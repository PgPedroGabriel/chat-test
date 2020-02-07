import app from './app';
import './socket/index';

const { server } = app;

server.listen(process.env.PORT || 3000);
