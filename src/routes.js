import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UserAdminController from './app/controllers/UserAdminController';
import DelivermanController from './app/controllers/DelivermanController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/deliverymans', DelivermanController.store);
routes.get('/deliverymans', DelivermanController.show);
routes.get('/deliverymans-all', DelivermanController.index);
routes.delete('/deliverymans/:id', DelivermanController.destroy);
routes.put('/deliverymans/:id', DelivermanController.update);
routes.get('/users-admins', UserAdminController.show);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

export default routes;
