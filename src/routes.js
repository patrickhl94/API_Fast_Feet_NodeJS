import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UserAdminController from './app/controllers/UserAdminController';
import DelivermanController from './app/controllers/DelivermanController';
import AvatarController from './app/controllers/AvatarController';
import SignatureController from './app/controllers/SignatureController';
import DeliveriesController from './app/controllers/DeliveriesController';
import ManageDeliveriesController from './app/controllers/ManageDeliveriesController';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post(
  '/signature',
  upload.single('signature'),
  SignatureController.store
);
routes.post('/avatar', upload.single('avatar'), AvatarController.store);
routes.get('/deliveryman/deliveries', ManageDeliveriesController.index);
routes.put('/deliveryman/', ManageDeliveriesController.update);
routes.post('/deliveries', DeliveriesController.store);
routes.put('/deliveries', DeliveriesController.update);
routes.get('/deliveries', DeliveriesController.index);
routes.delete('/deliveries/:id', DeliveriesController.destroy);
routes.post('/deliverymans', DelivermanController.store);
routes.get('/deliverymans', DelivermanController.show);
routes.get('/deliverymans-all', DelivermanController.index);
routes.delete('/deliverymans/:id', DelivermanController.destroy);
routes.put('/deliverymans/:id', DelivermanController.update);
routes.get('/users-admins', UserAdminController.show);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

export default routes;
