import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AuctionController from './app/controllers/AuctionController';

const routes = Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/auctions', AuctionController.index);
routes.post('/auctions', AuctionController.store);
routes.get('/auctions/:id', AuctionController.show);

export default routes;
