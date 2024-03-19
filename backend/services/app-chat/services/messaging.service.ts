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
import { HideMessageRepo } from '../db/repositories/hideMessageRepo';
import { constant } from '../config';
import { MessageDto, MessageTypeDto } from '../db/dto-models/messageDto';
import { HideMessageDto } from '../db/dto-models/hideMessageDto';

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
            // TODO notify the participants of the conversation
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
            const {conversationId, userId,
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
            return await MessageRepo.getMessageByConversation(conversationId, userId, limit, page)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getMessageInfor = async (req: Request, res: Response) => {
        try {
            const {messageId} = req.params;
            if(!messageId){
                throw new BadRequestError(`messageId is required`);
            }
            return await MessageRepo.getMessageById(messageId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static undoMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId} = req.body;
            if(!messageId){
                throw new BadRequestError(`messageId is required`);
            }
            const message = await MessageRepo.getMessageById(messageId);
            // check if the user is the owner of the message
            if(message.userId !== userId){
                throw new BadRequestError(`You are not the owner of the message`);
            }
            // check if the message isUndo or not
            if(message.isUndo){
                throw new BadRequestError(`The message has been undo`);
            }
            // check if the message does not hide
            const hideMessage = await HideMessageRepo.getHideMessage(messageId, userId);
            if(hideMessage){
                throw new BadRequestError(`The message has been hidden`);
            }
            return await MessageRepo.undo(messageId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static hideMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId, conversationId} = req.body;
            if(!messageId){
                throw new BadRequestError(`messageId is required`);
            }
            // check if the message does not undo
            const message = await MessageRepo.getMessageById(messageId);
            if(message.isUndo){
                throw new BadRequestError(`The message has been undo`);
            }
            // check if the message does not hide
            const hideMessage = await HideMessageRepo.getHideMessage(messageId, userId);
            if(hideMessage){
                throw new BadRequestError(`The message has been hidden`);
            }
            const expireDate = new Date()
            expireDate.setSeconds(expireDate.getSeconds() + constant.KEEP_HIDE_MESSAGE_TIME)
            const newHideMessage: HideMessageDto = {
                userId,
                messageId,
                remainTime: expireDate
            }
            await HideMessageRepo.create(newHideMessage);
            return {
                status: 'Success',
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
} 