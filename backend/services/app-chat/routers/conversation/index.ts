import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import ConversationController from '../../controllers/conversation.controller';
const contactRoute = express.Router();

contactRoute.post(
    '/conversation',
    asyncHandler(ConversationController.createConversation)
);


export default contactRoute;
