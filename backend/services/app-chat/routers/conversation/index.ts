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

contactRoute.get(
    '/conversations/:userId',
    asyncHandler(ConversationController.getConversations)
);
contactRoute.put(
    '/conversation/:conversationId',
    asyncHandler(ConversationController.updateConversation)
);

contactRoute.put(
    '/conversation/admin-block-group/:conversationId',
    asyncHandler(ConversationController.adminBlockConversation)
);

contactRoute.put(
    '/conversation/sysadmin-block/:conversationId',
    asyncHandler(ConversationController.systemAdminBlockConversation)
);

contactRoute.put(
    '/conversation/admin-unblock-group/:conversationId',
    asyncHandler(ConversationController.adminUnblockConversation)
);

contactRoute.put(
    '/conversation/sysadmin-unblock/:conversationId',
    asyncHandler(ConversationController.systemAdminUnblockConversation)
);

contactRoute.put(
    '/conversation/change-admin-group/:conversationId',
    asyncHandler(ConversationController.updateAdminConversation)
);

contactRoute.put(
    '/conversation/add-participant-group/:conversationId',
    asyncHandler(ConversationController.addParticipant)
);

contactRoute.delete(
    '/conversation/admin-delete-group/:conversationId',
    asyncHandler(ConversationController.adminDeleteConversation)
);

contactRoute.post(
    '/conversation/kick-member/:conversationId',
    asyncHandler(ConversationController.kickMember)
);

contactRoute.post(
    '/conversation/leave-conversation/:conversationId',
    asyncHandler(ConversationController.leaveConversation)
);

contactRoute.put(
    '/conversation/block-participant/:conversationId',
    asyncHandler(ConversationController.blockParticipant)
)

contactRoute.put(
    '/conversation/unblock-participant/:conversationId',
    asyncHandler(ConversationController.unblockParticipant)
)

contactRoute.get(
    '/conversation/setting/:conversationId',
    asyncHandler(ConversationController.getConversationSetting)
)

contactRoute.put(
    '/conversation/setting/:conversationId',
    asyncHandler(ConversationController.updateConversationSetting)
)

contactRoute.put(
    '/conversation/reset-setting/:conversationId',
    asyncHandler(ConversationController.resetConversationSetting)
)



export default contactRoute;
