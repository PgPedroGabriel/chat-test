import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ test: 'test' }));
routes.get('/users', UserController.list);
routes.get('/users/available', UserController.checkAvaliable);
routes.get('/v1/users', UserController.list);
routes.post('/v1/join', UserController.join);
routes.post('/v1/left', UserController.left);

export default routes;
