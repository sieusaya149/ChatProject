import express from 'express';
import {asyncHandler} from '@viethung/async-call'
import ConversationController from '../../controllers/conversation.controller';
const conversationRoute = express.Router();

conversationRoute.get(
    '/conversation/search',
    asyncHandler(ConversationController.searchConversation)
)

conversationRoute.post(
    '/conversation/join-conversation-by-code',
    asyncHandler(ConversationController.joinConversationByCode)
)

conversationRoute.get(
    '/conversation/unread-messages',
    asyncHandler(ConversationController.getUnreadMessages)
);

conversationRoute.post(
    '/conversation',
    asyncHandler(ConversationController.createConversation)
);

conversationRoute.get(
    '/conversation/:conversationId',
    asyncHandler(ConversationController.getConversation)
);

conversationRoute.get(
    '/conversations/:userId',
    asyncHandler(ConversationController.getConversations)
);
conversationRoute.put(
    '/conversation/:conversationId',
    asyncHandler(ConversationController.updateConversation)
);

conversationRoute.put(
    '/conversation/admin-block-group/:conversationId',
    asyncHandler(ConversationController.adminBlockConversation)
);

conversationRoute.put(
    '/conversation/sysadmin-block/:conversationId',
    asyncHandler(ConversationController.systemAdminBlockConversation)
);

conversationRoute.put(
    '/conversation/admin-unblock-group/:conversationId',
    asyncHandler(ConversationController.adminUnblockConversation)
);

conversationRoute.put(
    '/conversation/sysadmin-unblock/:conversationId',
    asyncHandler(ConversationController.systemAdminUnblockConversation)
);

conversationRoute.put(
    '/conversation/change-admin-group/:conversationId',
    asyncHandler(ConversationController.updateAdminConversation)
);

conversationRoute.put(
    '/conversation/add-participant-group/:conversationId',
    asyncHandler(ConversationController.addParticipant)
);

conversationRoute.delete(
    '/conversation/admin-delete-group/:conversationId',
    asyncHandler(ConversationController.adminDeleteConversation)
);

conversationRoute.post(
    '/conversation/kick-member/:conversationId',
    asyncHandler(ConversationController.kickMember)
);

conversationRoute.post(
    '/conversation/leave-conversation/:conversationId',
    asyncHandler(ConversationController.leaveConversation)
);

conversationRoute.put(
    '/conversation/block-participant/:conversationId',
    asyncHandler(ConversationController.blockParticipant)
)

conversationRoute.put(
    '/conversation/unblock-participant/:conversationId',
    asyncHandler(ConversationController.unblockParticipant)
)

conversationRoute.get(
    '/conversation/setting/:conversationId',
    asyncHandler(ConversationController.getConversationSetting)
)

conversationRoute.put(
    '/conversation/setting/:conversationId',
    asyncHandler(ConversationController.updateConversationSetting)
)

conversationRoute.put(
    '/conversation/reset-setting/:conversationId',
    asyncHandler(ConversationController.resetConversationSetting)
)

conversationRoute.get(
    '/conversation/history/:conversationId',
    asyncHandler(ConversationController.getConversationHistory)
);

conversationRoute.post(
    '/conversation/read/:conversationId',
    asyncHandler(ConversationController.readConversation)
);



export default conversationRoute;
