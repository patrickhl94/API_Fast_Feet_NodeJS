import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Está funcionando top' }));

export default routes;
