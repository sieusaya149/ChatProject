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
import { ParticipantRepo } from '../db/repositories/participantRepo';
import { markUserReadConversation } from '../utils/utils';
import { UserMessageMentionRepo } from '../db/repositories/userMessageMentionRepo';

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
            await markUserReadConversation(conversationId, userId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getMessageInfor = async (req: Request, res: Response) => {
        try {
            const {messageId, conversationId, userId} = req.params;
            await markUserReadConversation(conversationId, userId);
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
            const {messageId, userId, conversationId} = req.body;
            await markUserReadConversation(conversationId, userId);
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
            await markUserReadConversation(conversationId, userId);
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

    static pinMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId, conversationId} = req.body;
            await markUserReadConversation(conversationId, userId);
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
            // check if the message is pin
            if(message.isPin){
                throw new BadRequestError(`The message is already pin`);
            }
            // TODO notify the participants of the conversation
            return await MessageRepo.pin(messageId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static unPinMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId, conversationId} = req.body;
            await markUserReadConversation(conversationId, userId);
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
            // check if the message is pin
            if(!message.isPin){
                throw new BadRequestError(`The message is not pin`);
            }
            return await MessageRepo.unPin(messageId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getPinMessages = async (req: Request, res: Response) => {
        try {
            const {conversationId, userId,
                limit, page} = req.body;
            await markUserReadConversation(conversationId, userId);
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
            return await MessageRepo.getPinMessages(conversationId, userId, limit, page)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static forwardMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId, conversationId, toConversationId} = req.body;
            await markUserReadConversation(conversationId, userId);
            if(!messageId || !toConversationId){
                throw new BadRequestError(`messageId, toConversationId are required`);
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

            // check if user is a participant of toConversationId
            const participant = await ParticipantRepo.getParticipantByConversation(userId, toConversationId);
            const newMessage = {
                conversationId: toConversationId,
                userId,
                type: message.type,
                text: message.text
            } as MessageDto
            await MessageRepo.create(newMessage)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static searchMessages = async (req: Request, res: Response) => {
        try {
            const {keyword} = req.query;
            const {conversationId, userId, limit, page} = req.body;
            await markUserReadConversation(conversationId, userId);
            if(!keyword){
                throw new BadRequestError(`keyword is required`);
            }
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
            return await MessageRepo.searchMessages(conversationId, userId, keyword, limit, page)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static replyMessage = async (req: Request, res: Response) => {
        try {
            const {messageId, userId, conversationId, text} = req.body;
            await markUserReadConversation(conversationId, userId);
            if(!messageId || !text){
                throw new BadRequestError(`messageId, text are required`);
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
            const newMessage = {
                conversationId,
                userId,
                type: 'TEXT',
                text,
                replyTo: messageId
            } as MessageDto
            await MessageRepo.create(newMessage)
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getMessageReaders = async (req: Request, res: Response) => {
        try {
            const {userId, conversationId} = req.body;
            let messageId = req.query.messageId;
            let message = null
            if(!messageId){ // get the lastest message of the conversation
                console.log("get the lastest message of the conversation")
                const messageData = await MessageRepo.getConversationMessages(conversationId, userId, 1, 1);
                message = messageData.messages[0];
            }
            else {
                message = await MessageRepo.getMessageById(messageId as string);
            }
            if(!message){
                throw new BadRequestError(`No message found`);
            }
            // check if message is not undo
            if(message.isUndo){
                throw new BadRequestError(`The message has been undo`);
            }
            // check if message is not hide
            const hideMessage = await HideMessageRepo.getHideMessage(userId, message.id);
            if(hideMessage){
                throw new BadRequestError(`The message has been hidden`);
            }
            const messageIndex = message.messageIndex
            // get participants of the conversation
            const participants = await ParticipantRepo.getAllParticipants(conversationId);
            const messageReaders = participants.filter((participant) => {
                // check if the participant is not the owner of the message and not the current viewer
                if(participant.userId !== message.userId && participant.userId !== userId){
                    if(participant.lastestViewedMessageIndex >= messageIndex){
                        return participant
                    }
                }}
            );
            return {
                readers: messageReaders
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static async createMentionMessage(req: Request, res: Response) {
        try {
            const {conversationId, 
                   userId,
                   type, text, mentionUserIds } = req.body;
            if(type == 'TEXT' && !text){
                throw new BadRequestError(`text is required`);
            }
            if(!mentionUserIds){
                throw new BadRequestError(`mentionUserIds is required`);
            }
            // TODO notify the participants of the conversation
            const newMessage = await MessageRepo.create({
                conversationId,
                userId,
                type,
                text
            } as MessageDto)
            if(!newMessage) {
                throw new BadRequestError(`Create message failed`);
            }
            // can not mention yourself
            if(mentionUserIds.includes(userId)){
                throw new BadRequestError(`You can not mention yourself`);
            }
            // check if mentionUserIds are participants of the conversation
            const participants = await ParticipantRepo.getAllParticipants(conversationId);
            const participantIds = participants.map((participant) => participant.userId);
            const notParticipantIds = mentionUserIds.filter((mentionUserId) => !participantIds.includes(mentionUserId));
            if(notParticipantIds.length > 0){
                throw new BadRequestError(`The mentionUserIds are not participants of the conversation`);
            }
            // create mention message
            const mentionMessagePr = mentionUserIds.map(async (mentionUserId) => {
                await UserMessageMentionRepo.create({
                    userId: mentionUserId,
                    messageId: newMessage.id
                })
            });
            await Promise.all(mentionMessagePr);
            await markUserReadConversation(conversationId, userId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
} 