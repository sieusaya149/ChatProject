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
            const conversation = await ConversationRepo.getDetailConversation(conversationId);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static updateConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const updatedConversation = req.body as updateConversationDto;
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            if(updatedConversation.type)
            {
                throw new BadRequestError(`Type of conversation can not be updated`);
            }
            if(!updatedConversation.isAdminBlock && !updatedConversation.isSystemBlock)
            {
                updatedConversation.blockExpires = null;
            }
            const conversation = await ConversationRepo.updateConversation(conversationId, updatedConversation);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static userBlockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            const blockExpires = req.body.blockExpires;
            if(conversationId == null || adminId == null)
            {
                throw new BadRequestError(`conversationId and adminId are required`);
            }
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            const blockExpiresDate = new Date(blockExpires);
            if (isNaN(blockExpiresDate.getTime())) {
                throw new BadRequestError(`blockExpires is not a valid date`);
            }
            if(blockExpiresDate <= new Date())
            {
                throw new BadRequestError(`blockExpires must be in the future`);
            }
            // check if the user is admin of the conversation
            const participant = await ParticipantRepo.getParticipantByConversation(adminId, conversationId);
            console.log(participant)
            if(!participant){
                throw new NoEntryError(`Participant not found`);
            }
            if(!participant.isAdmin)
            {
                throw new ForbiddenError(`You are not admin of the conversation`);
            }
            const updatedConversation = {
                isAdminBlock: true,
                blockExpires: blockExpires
            }
            const conversation = await ConversationRepo.updateConversation(conversationId, updatedConversation);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
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
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            const blockExpiresDate = new Date(blockExpires);
            if (isNaN(blockExpiresDate.getTime())) {
                throw new BadRequestError(`blockExpires is not a valid date`);
            }
            if(blockExpiresDate <= new Date())
            {
                throw new BadRequestError(`blockExpires must be in the future`);
            }
            const updatedConversation = {
                isSystemBlock: true,
                blockExpires
            }
            const conversation = await ConversationRepo.updateConversation(conversationId, updatedConversation);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static userUnblockConversation = async (req: Request, res: Response) => {
        try {
            const conversationId = req.params.conversationId;
            const adminId = req.body.adminId;
            if(conversationId == null || adminId == null)
            {
                throw new BadRequestError(`conversationId and adminId are required`);
            }            
            // check if the user is admin of the conversation
            const participant = await ParticipantRepo.getParticipantByConversation(adminId, conversationId);
            if(!participant){
                throw new NoEntryError(`Participant not found`);
            }
            if(!participant.isAdmin)
            {
                throw new ForbiddenError(`You are not admin of the conversation`);
            }
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            // check if the conversation is blocked
            if(!existingConversation.isAdminBlock)
            {
                return {
                    msg: "Conversation is not blocked"
                }
            }
            
            const updatedConversation = {
                isAdminBlock: false,
                blockExpires: existingConversation.isSystemBlock? existingConversation.blockExpires: null
            }
            const conversation = await ConversationRepo.updateConversation(conversationId, updatedConversation);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
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
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            // check if the conversation is blocked
            if(!existingConversation.isSystemBlock)
            {
                return {
                    msg: "Conversation is not blocked"
                }
            }
            const updatedConversation = {
                isSystemBlock: false,
                blockExpires: null
            }
            const conversation = await ConversationRepo.updateConversation(conversationId, updatedConversation);
            return {
                conversation
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
            const participant = await ParticipantRepo.getParticipantByConversation(adminId, conversationId);
            if(!participant){
                throw new NoEntryError(`Participant not found`);
            }
            if(!participant.isAdmin)
            {
                throw new ForbiddenError(`You are not admin of the conversation`);
            }
            const conversation = await ConversationRepo.deleteConversation(conversationId);
            if (!conversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            return {
                conversation
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
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            if (existingConversation.type == "PRIVATE") {
                throw new BadRequestError(`Can not update admin of private conversation`);
            }
            // check if the user is admin of the conversation
            const oldAdmin = await ParticipantRepo.getParticipantByConversation(adminId, conversationId);
            const newAdmin = await ParticipantRepo.getParticipantByConversation(newAdminId, conversationId);
            if(oldAdmin == null || newAdmin == null)
            {
                throw new NoEntryError(`Participant not found`);
            }
            if(!oldAdmin.isAdmin)
            {
                throw new ForbiddenError(`You are not admin of the conversation`);
            }
            // set oldadmin to normal participant
            const updatedOldAdmin = {
                isAdmin: false
            }
            await ParticipantRepo.updateParticipant(adminId, updatedOldAdmin);
            const updateNewAdmin = {
                isAdmin: true
            }
            ParticipantRepo.updateParticipant(newAdminId, updateNewAdmin);
            return {
                conversationUpdated: await ConversationRepo.getDetailConversation(conversationId)
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
            // check if the conversation is exist
            const existingConversation = await ConversationRepo.getConversation(conversationId);
            if (!existingConversation) {
                throw new NoEntryError(`Conversation not found`);
            }
            // check if the conversation is blocked
            if(existingConversation.isAdminBlock || existingConversation.isSystemBlock)
            {
                throw new ForbiddenError(`Conversation is blocked`);
            }
            // check if the executor is admin of the conversation
            const executor = await ParticipantRepo.getParticipantByConversation(executorId, conversationId);
            if(!executor)
            {
                throw new ForbiddenError(`You are not in the conversation`);
            }
            // check if the user is already in the conversation
            const participant = await ParticipantRepo.getParticipantByConversation(userId, conversationId);
            if(participant)
            {
                throw new BadRequestError(`User is already in the conversation`);
            }
             // create conversation Setting for admin
             const addedUserSetting = await ConversationSettingRepo.create({
                isAdminSetting: false
            } as ConversationSettingDto);
            // join the user to the conversation
            await ParticipantRepo.addParticipantToConversation(
                conversationId,
                userId,
                addedUserSetting.id
            );
            return {
                conversationUpdated: await ConversationRepo.getDetailConversation(conversationId)
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
}
