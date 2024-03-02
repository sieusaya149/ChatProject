import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import ContactController from '../../controllers/contact.controller';
const contactRoute = express.Router();


contactRoute.post(
    '/contact',
    asyncHandler(ContactController.createNewContact)
);

contactRoute.get(
    '/contact/:userId',
    asyncHandler(ContactController.getContactList)
);

contactRoute.put(
    '/contact',
    asyncHandler(ContactController.updateContactList)
);

contactRoute.delete(
    '/contact',
    asyncHandler(ContactController.deleteContact)
);

contactRoute.get(
    '/contacts/search',
    asyncHandler(ContactController.searchContact)
);
export default contactRoute;
