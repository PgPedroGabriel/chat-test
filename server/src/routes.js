import { Router } from 'express';

import UserController from './controllers/UserController';
import ChannelController from './controllers/ChannelController';

const routes = new Router();

// GET Requests
routes.get('/', (req, res) => res.json({ test: 'test' }));

// USERS
routes.get('/users', UserController.list);
routes.get('/users/available', UserController.checkAvaliable);
routes.get('/v1/users', UserController.list);

// CHANNELS
routes.get('/v1/channels', ChannelController.list);

// POST requests
routes.post('/v1/join', UserController.join);
routes.post('/v1/left', UserController.left);
routes.post('/v1/channels', ChannelController.create);
routes.post('/v1/channels/:channel', ChannelController.addMessage);

export default routes;
