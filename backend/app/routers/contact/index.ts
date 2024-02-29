import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import ContactController from '../../controllers/contact.controller';
const contactRoute = express.Router();
contactRoute.get(
    '/get-contacts',
    asyncHandler(ContactController.getContactList)
);



export default contactRoute;
