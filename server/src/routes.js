import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ test: 'test' }));

export default routes;
