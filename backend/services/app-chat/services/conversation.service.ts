import {NextFunction, Request, Response} from 'express';
import {
    AuthFailureError,
    InternalError,
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    NoEntryError,
    BadTokenError,
    TokenExpiredError,
    NoDataError,
    AccessTokenError
} from '@viethung/api-response'
import Logger from '@viethung/logger'
import { ConversationRepo } from '../db/repositories/conversationRepo';
import { ParticipantRepo } from '../db/repositories/participantRepo';
import { ConversationDto } from '../db/dto-models/conversationDto';
export class ConversationService {
    static createConversation = async (req: Request, res: Response) => {
        try {
            const { creatorId, contactId, ...conversationData } = req.body;
            console.log(conversationData)
            const newConversation = await ConversationRepo.createConversation(conversationData as ConversationDto);
            // join the creator to new conversation
            await ParticipantRepo.addParticipantToConversation(
                newConversation.id,
                creatorId as string,
                true
            );
            if(newConversation.type == "PRIVATE" && contactId)
            {
                // join the contact to new conversation
                const contactPartipant = await ParticipantRepo.addParticipantToConversation(
                    newConversation.id,
                    contactId as string,
                );
            }
            const detailNewconversation = await ConversationRepo.getDetailConversation(newConversation.id);
            return {
                detailNewconversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
}
