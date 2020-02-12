import express from 'express';
import cors from 'cors';

import routes from './routes';
import Chat from './models/Chat';

import 'dotenv/config';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: 'http://localhost', credentials: true }));
    this.app.use((req, res, next) => {
      if (!this.app.get('chat')) {
        this.app.set('chat', new Chat());
      }

      req.chat = this.app.get('chat');
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
