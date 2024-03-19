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

messageRoute.post(
    '/message/pin',
    asyncHandler(MessagingController.pinMessage)
);

messageRoute.put(
    '/message/unpin',
    asyncHandler(MessagingController.unPinMessage)
);

messageRoute.get(
    '/message/pins',
    asyncHandler(MessagingController.getPinMessages)
);

messageRoute.get(
    '/message/forward',
    asyncHandler(MessagingController.forwardMessage)
);

messageRoute.get(
    '/message/search',
    asyncHandler(MessagingController.searchMessages)
);

messageRoute.post(
    '/message/reply',
    asyncHandler(MessagingController.replyMessage)
);

messageRoute.get(
    '/message/readers',
    asyncHandler(MessagingController.getMessageReaders)
);

messageRoute.post(
    '/message/mention',
    asyncHandler(MessagingController.createMentionMessage)
);


export default messageRoute;