import express from 'express';
const routers = express.Router();

const API_ENDPOINT = '/v1/api/';
import {authenticate} from '../middlewares/auth';
import conversationRoute from './conversation'

routers.use(authenticate);
routers.use(API_ENDPOINT, conversationRoute);

export default routers;
