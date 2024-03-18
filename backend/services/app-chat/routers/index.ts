import express from 'express';
const routers = express.Router();

const API_ENDPOINT = '/v1/api/';
import {authenticate} from '../middlewares/auth';
import conversationRoute from './conversation';
import messageRoute from './messaging';

routers.use(authenticate);
routers.use(API_ENDPOINT, conversationRoute);
routers.use(API_ENDPOINT, messageRoute);

export default routers;
