import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import ConversationController from '../../controllers/conversation.controller';
const contactRoute = express.Router();

contactRoute.post(
    '/conversation',
    asyncHandler(ConversationController.createConversation)
);

contactRoute.get(
    '/conversation/:conversationId',
    asyncHandler(ConversationController.getConversation)
);

contactRoute.put(
    '/conversation/:conversationId',
    asyncHandler(ConversationController.updateConversation)
);

contactRoute.put(
    '/conversation/user-block/:conversationId',
    asyncHandler(ConversationController.userBlockConversation)
);

contactRoute.put(
    '/conversation/sysadmin-block/:conversationId',
    asyncHandler(ConversationController.systemAdminBlockConversation)
);

contactRoute.put(
    '/conversation/user-unblock/:conversationId',
    asyncHandler(ConversationController.userUnblockConversation)
);

contactRoute.put(
    '/conversation/sysadmin-unblock/:conversationId',
    asyncHandler(ConversationController.systemAdminUnblockConversation)
);

contactRoute.put(
    '/conversation/update-admin:conversationId',
    asyncHandler(ConversationController.updateAdminConversation)
);

contactRoute.put(
    '/conversation/add-participant/:conversationId',
    asyncHandler(ConversationController.addParticipant)
);

contactRoute.delete(
    '/conversation/admin-delete/:conversationId',
    asyncHandler(ConversationController.adminDeleteConversation)
);



export default contactRoute;
