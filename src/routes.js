import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UserAdminController from './app/controllers/UserAdminController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

routes.use(authMiddleware);
routes.get('/users-admins', UserAdminController.show);

export default routes;
