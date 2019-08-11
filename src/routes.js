import { Router } from 'express';

import DeveloperController from './app/controllers/DeveloperController';
import LikeController from './app/controllers/LikeController';
import DislikeController from './app/controllers/DislikeController';

const routes = new Router();

routes.post('/developers', DeveloperController.store);
routes.get('/developers', DeveloperController.index);

routes.post('/developers/:devId/likes', LikeController.store);
routes.post('/developers/:devId/dislikes', DislikeController.store);

export default routes;
