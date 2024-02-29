import express from 'express';
const routers = express.Router();

const API_ENDPOINT = '/v1/api/';
import {authenticate} from '../middlewares/auth';
import userRoute from './user'
import contactRoute from './contact'

routers.use(authenticate);
routers.use(API_ENDPOINT, userRoute);
routers.use(API_ENDPOINT, contactRoute);

export default routers;
