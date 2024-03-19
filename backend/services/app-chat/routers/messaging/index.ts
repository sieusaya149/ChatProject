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

messageRoute.get(
    '/message/infor/:messageId',
    asyncHandler(MessagingController.getMessageInfor)
);

messageRoute.put(
    '/message/undo',
    asyncHandler(MessagingController.undoMessage)
);

messageRoute.put(
    '/message/hide',
    asyncHandler(MessagingController.hideMessage)
);

export default messageRoute;