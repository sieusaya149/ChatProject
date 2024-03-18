import e, {NextFunction, Request, Response} from 'express';
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

import { MessageRepo } from '../db/repositories/messageRepo';
import { MessageDto, MessageTypeDto } from '../db/dto-models/messageDto';

export class MessageService {
    static createMessage = async (req: Request, res: Response) => {
        try {
            const {conversationId, 
                   userId,
                   type, text } = req.body;
            // check if type is not null and valid
            if(!type && (type !== 'FILE' || type !== 'TEXT' || type !== 'STICKER')){
                throw new BadRequestError(`type is required`);
            }
            if(type == 'TEXT' && !text){
                throw new BadRequestError(`text is required`);
            }
            await MessageRepo.create({
                conversationId,
                userId,
                type,
                text
            } as MessageDto)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getConversationHistory = async (req: Request, res: Response) => {
        try {
            const {conversationId,
                   limit, page} = req.body;
            // if has limit need page
            if(limit && page == null)
            {
                throw new BadRequestError(`page is required`);
            }
            // if has page need limit
            if(page && limit == null)
            {
                throw new BadRequestError(`limit is required`);
            }

            if (limit && page && (isNaN(limit) || isNaN(page))) {
                throw new BadRequestError(`Limit and page must be a number`);
            }
            if (limit && page && limit < 1 || page < 1) {
                throw new BadRequestError(`Limit and page must be greater than 0`);
            }
            return await MessageRepo.getMessageByConversation(conversationId, limit, page)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
} 