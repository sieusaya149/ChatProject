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
import { ConversationRepo } from '../db/repositories/conversationRepo';
import { ParticipantRepo } from '../db/repositories/participantRepo';
import { ConversationSettingRepo } from '../db/repositories/conversationSettingRepo';
import { ConversationDto, updateConversationDto } from '../db/dto-models/conversationDto';
import { ConversationSettingDto, updateConversationSettingDto } from '../db/dto-models/conversationSettingDto';
import ConversationManagement from './conversationManagement';
import { MessageRepo } from '../db/repositories/messageRepo';
import { markUserReadConversation } from '../utils/utils';

export class ConversationService {
    static createConversation = async (req: Request, res: Response) => {
        try {
            const { creatorId, contactId, ...conversationData } = req.body;
            // generate the join code for conversation
            if(conversationData.type == "GROUP"){
                if(!conversationData.name){
                    throw new BadRequestError(`Name of group is required`);
                }
                conversationData.joinCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
            else if(conversationData.type == "PRIVATE"){
                if(!contactId){
                    throw new BadRequestError(`ContactId is required`);
                }
            }
            
            // TODO if group is private name conversation is firstName + lastName of contact
            const newConversation = await ConversationRepo.createConversation(conversationData as ConversationDto);

            // create conversation Setting for admin
            const adminSetting = await ConversationSettingRepo.create({
                isAdminSetting: true
            } as ConversationSettingDto);
            // join the creator to new conversation
            await ParticipantRepo.addParticipantToConversation(
                newConversation.id,
                creatorId as string,
                adminSetting.id,
                true, // this is creator,
                true // this is admin,
            );
            // if type is PRIVATE, join the contact to new conversation
            if(newConversation.type == "PRIVATE" && contactId)
            {
                // create conversation Setting for admin
                const userSetting = await ConversationSettingRepo.create({
                    isAdminSetting: false
                } as ConversationSettingDto);
                // join the contact to new conversation
                await ParticipantRepo.addParticipantToConversation(
                    newConversation.id,
                    contactId as string,
                    userSetting.id
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

    static getConversation = async (req: Request, res: Response) => {  
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            if(conversationId == null){
                throw new BadRequestError(`conversationId is required`);
            }
            if(userId == null){
                throw new BadRequestError(`userId is required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const conversationData = await conversationMng.getConversationDetail();
            return {
                conversationData
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static updateConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const {userId, ...updateData} = req.body;
            if(conversationId == null){
                throw new BadRequestError(`conversationId is required`);
            }
            if(userId == null){
                throw new BadRequestError(`userId is required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const updatedConversation = await conversationMng.updateConversation(updateData);
            return {
                updatedConversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static adminBlockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            const blockExpires = req.body.blockExpires;
            if(conversationId == null || adminId == null || blockExpires == null)
            {
                throw new BadRequestError(`conversationId and adminId and blockExpire are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, adminId);
            await conversationMng.evaluateConversationData()
            const updatedConversation = await conversationMng.adminBlockConversation(blockExpires);
            return {
                updatedConversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static systemAdminBlockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const blockExpires = req.body.blockExpires;
            if(conversationId == null || blockExpires == null)
            {
                throw new BadRequestError(`conversationId and blockExpires are required`);
            }
            const conversationMng = new ConversationManagement(conversationId);
            const updatedConversation = await conversationMng.systemAdminBlockConversation(blockExpires)
            return {
                updatedConversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static adminUnblockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            if(conversationId == null || adminId == null)
            {
                throw new BadRequestError(`conversationId and adminId are required`);
            }            
            const conversationMng = new ConversationManagement(conversationId, adminId);
            await conversationMng.evaluateConversationData()
            const updatedConversation = await conversationMng.adminUnblockConversation();
            return {
                updatedConversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static systemAdminUnblockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            if(conversationId == null)
            {
                throw new BadRequestError(`conversationId is required`);
            }
            const conversationMng = new ConversationManagement(conversationId);
            const updatedConversation = await conversationMng.systemAdminUnblockConversation()
            return {
                updatedConversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static adminDeleteConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            // check if the user is admin of the conversation
            if(conversationId == null || adminId == null)
            {
                throw new BadRequestError(`conversationId and adminId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, adminId);
            await conversationMng.evaluateConversationData()
            const conversationDeleted = await conversationMng.adminDeleteConversation();
            return {
                conversationDeleted
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static updateAdminConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            const newAdminId = req.body.newAdminId;
            if(conversationId == null || adminId == null || newAdminId == null)
            {
                throw new BadRequestError(`conversationId, adminId and newAdminId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, adminId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.updateAdminConversation(newAdminId);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static addParticipant = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            const executorId = req.body.executorId;
            if(conversationId == null || userId == null || executorId == null)
            {
                throw new BadRequestError(`conversationId, userId and executorId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, executorId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.addParticipantToConversation(userId);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static kickMember = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            const adminId = req.body.adminId;
            if(conversationId == null || userId == null || adminId == null)
            {
                throw new BadRequestError(`conversationId, userId and adminId are required`);
            }
            if(userId == adminId)
            {
                throw new BadRequestError(`You can't kick yourself`);
            }
            const conversationMng = new ConversationManagement(conversationId, adminId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.kickMember(userId);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static leaveConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            if(conversationId == null || userId == null)
            {
                throw new BadRequestError(`conversationId and userId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.leaveConversation(userId);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getConversations = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const {limit, page} = req.body;

            if(userId == null)
            {
                throw new BadRequestError(`userId is required`);
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
            if (limit && page && (limit < 1 || page < 1)) {
                throw new BadRequestError(`Limit and page must be greater than 0`);
            }
            const conversationList = await ConversationRepo.getConversationByUserId(userId, limit, page);
            return {
                conversationList
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static blockParticipant = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            const executorId = req.body.executorId;
            const blockExpires = req.body.blockExpires;
            if(conversationId == null || userId == null || executorId == null || blockExpires == null)
            {
                throw new BadRequestError(`conversationId, userId, blockExpires and executorId are required`);
            }
            if(userId == executorId)
            {
                throw new BadRequestError(`You can't block yourself`);
            }
            const conversationMng = new ConversationManagement(conversationId, executorId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.blockParticipant(userId, blockExpires);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static unblockParticipant = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            const executorId = req.body.executorId;
            if(conversationId == null || userId == null || executorId == null)
            {
                throw new BadRequestError(`conversationId, userId and executorId are required`);
            }
            if(userId == executorId)
            {
                throw new BadRequestError(`You can't unblock yourself`);
            }
            const conversationMng = new ConversationManagement(conversationId, executorId);
            await conversationMng.evaluateConversationData()
            const conversationUpdated = await conversationMng.unblockParticipant(userId);
            return {
                conversationUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getConversationSetting = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            if(conversationId == null || userId == null)
            {
                throw new BadRequestError(`conversationId and userId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const conversationSetting = await conversationMng.getConversationSetting();
            return {
                conversationSetting
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static updateConversationSetting = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const {userId, ...updateData} = req.body;
            if(conversationId == null || userId == null)
            {
                throw new BadRequestError(`conversationId, userId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const conversationSettingUpdated = await conversationMng.updateConversationSetting(updateData);
            return {
                conversationSettingUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static resetConversationSetting = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const userId = req.body.userId;
            if(conversationId == null || userId == null)
            {
                throw new BadRequestError(`conversationId, userId are required`);
            }
            const conversationMng = new ConversationManagement(conversationId, userId);
            await conversationMng.evaluateConversationData()
            const conversationSettingUpdated = await conversationMng.resetConversationSetting();
            return {
                conversationSettingUpdated
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static searchConversation = async (req: Request, res: Response) => {
        try {
            const { keyword } = req.query;
            const { userId, limit, page } = req.body;
            if(userId == null || keyword == null)
            {
                throw new BadRequestError(`userId and keyword are required`);
            }
            if(limit && page == null)
            {
                throw new BadRequestError(`page is required`);
            }
            if(page && limit == null)
            {
                throw new BadRequestError(`limit is required`);
            }
            if (limit && page && (isNaN(limit) || isNaN(page))) {
                throw new BadRequestError(`Limit and page must be a number`);
            }
            if (limit && page && (limit < 1 || page < 1)) {
                throw new BadRequestError(`Limit and page must be greater than 0`);
            }
            const conversationList = await ConversationRepo.searchConversation(userId, keyword as string, limit, page);
            return {
                conversationList
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static joinConversationByCode = async (req: Request, res: Response) => {
        try {
            const { joinCode, userId } = req.body;
            if(joinCode == null || userId == null)
            {
                throw new BadRequestError(`joinCode and userId are required`);
            }
            // find conversation by token
            const conversation = await ConversationRepo.getConversationByCode(joinCode);
            const conversationMng = new ConversationManagement(conversation.id);
            await conversationMng.playAsAdminNow()
            await conversationMng.evaluateConversationData()
            await conversationMng.addParticipantToConversation(userId);
            const conversationData = await ConversationRepo.getDetailConversation(conversation.id);
            return {
                conversationData
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getConversationHistory = async (req: Request, res: Response) => {
        try {
            const {userId, limit, page} = req.body;
            const conversationId = req.params.conversationId;
            await markUserReadConversation(conversationId, userId);
            if(conversationId == null)
            {
                throw new BadRequestError(`conversationId is required`);
            }
            if(userId == null)
            {
                throw new BadRequestError(`userId is required`);
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
            // check if user is in conversation
            const conversationMng = new ConversationManagement(conversationId);
            if (!await conversationMng.checkIfUserIsJoined(userId)) {
                throw new BadRequestError(`You are not in conversation`);
            }
            const messages = await MessageRepo.getConversationMessages(conversationId, userId, limit, page)
            return messages;
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static readConversation = async (req: Request, res: Response) => {
        try {
            const {userId} = req.body;
            const {conversationId} = req.params;
            if(conversationId == null || userId == null)
            {
                throw new BadRequestError(`conversationId and userId are required`);
            }
            // check if user is in conversation
            const conversationMng = new ConversationManagement(conversationId);
            if (!await conversationMng.checkIfUserIsJoined(userId)) {
                throw new BadRequestError(`You are not in conversation`);
            }
            await markUserReadConversation(conversationId, userId);
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getUnreadMessages = async (req: Request, res: Response) => {
        try {
            const {conversationId, userId, limit, page} = req.body;

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
            if (limit && page && (limit < 1 || page < 1)) {
                throw new BadRequestError(`Limit and page must be greater than 0`);
            }
            if(userId == null)
            {
                throw new BadRequestError(`userId are required`);
            }
            if(conversationId == null)
            {
                const conversationData = await ConversationRepo.getConversationByUserId(userId);
                console.log('conversationData', conversationData);
                if(conversationData.conversations.length == 0){
                    return null
                }
                
                const unreadDataPromises = conversationData.conversations.map(async (conversation) => {
                    const participant = await ParticipantRepo.getParticipantByConversation(userId, conversation.id);
                    const lastestViewedMessageIndex = participant.lastestViewedMessageIndex;
                    return await MessageRepo.getUnreadMessages(conversation.id, userId, lastestViewedMessageIndex, limit, page);
                });

                return await Promise.all(unreadDataPromises);
            }
            else {
                // check if user is in conversation
                const conversationMng = new ConversationManagement(conversationId);
                if (!await conversationMng.checkIfUserIsJoined(userId)) {
                    throw new BadRequestError(`You are not in conversation`);
                }
                 // get current lastest message that the user has read
                const participant = await ParticipantRepo.getParticipantByConversation(userId, conversationId);
                const lastestViewedMessageIndex = participant.lastestViewedMessageIndex;
                const unreadData  = await MessageRepo.getUnreadMessages(conversationId, userId, lastestViewedMessageIndex, limit, page);
                return unreadData
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
}
