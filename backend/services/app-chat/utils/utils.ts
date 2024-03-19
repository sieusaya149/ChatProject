import { MessageRepo } from "../db/repositories/messageRepo";
import { ParticipantRepo } from "../db/repositories/participantRepo";

async function markUserReadConversation(conversationId, userId){
    // get lastest messages of the conversation (not include the message that the user has read)
    const messages = await MessageRepo.getConversationMessages(conversationId, userId, 1, 1);
    if(messages.messages.length == 0){
        return
    }
    // update lastIndexRead of the user, this is the lastest message that the user has read
    await ParticipantRepo.updateLastestViewedMessage(conversationId, userId, messages.messages[0].messageIndex);
}

export {
    markUserReadConversation
}