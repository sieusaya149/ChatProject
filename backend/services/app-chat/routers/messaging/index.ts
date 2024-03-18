import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import MessagingController from '../../controllers/messaging.controller';
import {conversationValidate} from '../../middlewares/conversationMiddelware';
const messageRoute = express.Router();

messageRoute.use(conversationValidate);
messageRoute.post(
    '/message/send',
    asyncHandler(MessagingController.createMessage)
);

messageRoute.get(
    '/message/history',
    asyncHandler(MessagingController.getConversationHistory)
);

export default messageRoute;