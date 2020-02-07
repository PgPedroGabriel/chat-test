import express from 'express';
import cors from 'cors';

import routes from './routes';
import Chat from './socket/models/Chat';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use((req, res, next) => {
      if (!this.server.get('chat')) {
        this.server.set('chat', new Chat());
      }

      req.chat = this.server.get('chat');
      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App();
