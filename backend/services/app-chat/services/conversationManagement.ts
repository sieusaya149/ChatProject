
import { ConversationRepo } from '../db/repositories/conversationRepo';
import { ParticipantRepo } from '../db/repositories/participantRepo';
import { ConversationSettingRepo } from '../db/repositories/conversationSettingRepo';
import { ConversationDto, updateConversationDto } from '../db/dto-models/conversationDto';
import { ConversationSettingDto, updateConversationSettingDto } from '../db/dto-models/conversationSettingDto';
import { updateParticipantDto, participantDto } from '../db/dto-models/participantDto';

type ConversationDataDetailDto = {
    conversation?: ConversationDto;
    participants?: participantDto[];
    userConversationSetting?: ConversationSettingDto;
    myParticipantData?: participantDto;
}

export default class ConversationManagement {
    private conversationId: string;
    private conversationData: ConversationDto = null;
    private conversationDetailData: ConversationDataDetailDto = {};
    private participantData: participantDto = null;
    private userId: string;
    private userConversationSetting: ConversationSettingDto = null;
    private isAdmin: boolean = null;
    private isBlocked: boolean = null;

    constructor(conversationId: string, userId: string = null) {
        this.conversationId = conversationId;
        this.userId = userId;
    }

    // get participant data
    async getParticipantData() {
        const participant = await ParticipantRepo.getParticipantByConversation(
            this.userId,
            this.conversationId);
        if (!participant) {
            throw new Error(`Participant not found in the conversation`);
        }
        this.participantData = participant;
        this.isAdmin = participant.isAdmin;
        this.isBlocked = participant.isBlocked;
        return this.participantData;
    }
    
    // check if the participant is an admin
    async checkIfUserIsAdmin() {
        return this.isAdmin;
    }

    // check if the participant is blocked
    async checkIfUserIsBlocked() {
        return this.isBlocked;
    }

    // check if user is join conversation
    async checkIfUserIsJoined(userId: string) {
        if(this.userId === userId) {
            return this.participantData != null;
        }
        const participant = await ParticipantRepo.getParticipantByConversation(
            userId,
            this.conversationId);
        return participant != null;
    }
    
    async getConversationData() {
        await this.checkIfUserIsJoined(this.userId)
        // get the conversation
        const conversation = await ConversationRepo.getConversation(this.conversationId);
        if (!conversation) {
            throw new Error(`Conversation not found`);
        }
        this.conversationData = conversation;
        return this.conversationData;
    }

    async getConversationSetting() {
        if(this.userConversationSetting) {
            return this.userConversationSetting;
        }
        if(!this.checkIfUserIsJoined(this.userId)) {
            throw new Error(`You are not in the conversation`);
        }
        const conversationSetting = await ConversationSettingRepo.getById(this.participantData.conversationSettingId);
        if (!conversationSetting) {
            throw new Error(`Conversation setting not found`);
        }
        this.userConversationSetting = conversationSetting;
        return this.userConversationSetting;
    }

    // get data for conversation management
    async evaluateConversationData() {
        await this.getConversationData();
        await this.getParticipantData();
        await this.getConversationSetting();
    }

    async getConversationDetail() {
        const conversationDetailData = await ConversationRepo.getDetailConversation(this.conversationId);
        if (!conversationDetailData) {
            throw new Error(`Conversation setting not found`);
        }
        // shoudl convert sequelize object to json object to avoid circular structure
        const {participants, ...rest } = conversationDetailData.toJSON();
        this.conversationDetailData.conversation = rest;
        this.conversationDetailData.participants = participants;
        this.conversationDetailData.userConversationSetting = this.userConversationSetting;
        this.conversationDetailData.myParticipantData = this.participantData;
        return this.conversationDetailData;
    }
 
    async updateConversation(updateData: updateConversationDto, bypassBlock: boolean = false) {
        // can not update type of conversation
        if(updateData.type) {
            throw new Error(`Can not update type of conversation`);
        }
        // check if the conversation is blocked
        if(!bypassBlock && (this.conversationData.isAdminBlock || this.conversationData.isSystemBlock)) {
            throw new Error(`Conversation is blocked`);
        }
        const updatedConversation = await ConversationRepo.updateConversation(this.conversationId, updateData);
        return updatedConversation;
    }

    async adminBlockConversation(blockExpires: Date) {
        const blockExpiresDate = new Date(blockExpires);
        if (isNaN(blockExpiresDate.getTime())) {
            throw new Error(`blockExpires is not a valid date`);
        }
        if(blockExpiresDate <= new Date())
        {
            throw new Error(`blockExpires must be in the future`);
        }
        const isAdmin = await this.checkIfUserIsAdmin();
        if (!isAdmin) {
            throw new Error(`You are not an admin`);
        }
        if(this.conversationData.isAdminBlock) {
            throw new Error(`Conversation is already blocked`);
        }
        if(this.conversationData.isSystemBlock)
        {
            throw new Error(`Conversation is already blocked by system`);
        }
        const updatedConversation = {
            isAdminBlock: true,
            blockExpires: blockExpires
        } as updateConversationDto;
        const conversation = await this.updateConversation(updatedConversation);
        return conversation;
    }

    async adminUnblockConversation() {
        // check if the participant is an admin
        const isAdmin = await this.checkIfUserIsAdmin();
        if (!isAdmin) {
            throw new Error(`You are not an admin`);
        }
        if(!this.conversationData.isAdminBlock) {
            throw new Error(`Conversation is not blocked`);
        }
        const updatedConversation = {
            isAdminBlock: false,
            blockExpires: this.conversationData.isSystemBlock? this.conversationData.blockExpires : null
        } as updateConversationDto;
        const conversation = await this.updateConversation(updatedConversation, true);
        return conversation;
    }

    async systemAdminBlockConversation(blockExpires: Date) {
        const conversation = await ConversationRepo.getConversation(this.conversationId);
        const blockExpiresDate = new Date(blockExpires);
        if (isNaN(blockExpiresDate.getTime())) {
            throw new Error(`blockExpires is not a valid date`);
        }
        if(blockExpiresDate <= new Date())
        {
            throw new Error(`blockExpires must be in the future`);
        }
        if(conversation.isSystemBlock) {
            throw new Error(`Conversation is already blocked`);
        }
        const updateData = {
            isSystemBlock: true,
            blockExpires: blockExpires
        } as updateConversationDto;
        const updatedConversation = await this.updateConversation(updateData, true);
        return updatedConversation;
    }

    async systemAdminUnblockConversation() {
        const conversation = await ConversationRepo.getConversation(this.conversationId);

        if(!conversation.isSystemBlock) {
            throw new Error(`Conversation is not blocked`);
        }
        const updateData = {
            isSystemBlock: false,
            blockExpires: conversation.isAdminBlock? conversation.blockExpires : null
        } as updateConversationDto;
        const updatedConversation = await this.updateConversation(updateData, true);
        return updatedConversation;
    }

    async updateAdminConversation(newAdminId: string) {
        // check if the participant is an admin
        const isAdmin = await this.checkIfUserIsAdmin();
        if (!isAdmin) {
            throw new Error(`You are not an admin`);
        }
        if(! await this.checkIfUserIsJoined(newAdminId)) {
            throw new Error(`The new admin is not in the conversation`);
        }
        if(this.conversationData.type === 'PRIVATE') {
            throw new Error(`Can not update admin for private conversation`);
        }
        const updatedOldAdmin = {
            isAdmin: false
        } as updateParticipantDto
        await ParticipantRepo.updateParticipant(this.userId, this.conversationId, updatedOldAdmin);
        const updateNewAdmin = {
            isAdmin: true
        } as updateParticipantDto
        await ParticipantRepo.updateParticipant(newAdminId, this.conversationId, updateNewAdmin);

        // update setting for new admin
        const newAdminSetting = await ConversationSettingRepo.update(
            this.participantData.conversationSettingId,
            {isAdminSetting: true} as updateConversationSettingDto);
        // update setting for old admin
        const oldAdminSetting = await ConversationSettingRepo.update(
            this.participantData.conversationSettingId,
            {isAdminSetting: false} as updateConversationSettingDto);
        return await this.getConversationDetail();
    }

    async addParticipantToConversation(newUserId: string) {
        if(this.conversationData.type === 'PRIVATE') {
            throw new Error(`Can not add participant to private conversation`);
        }
        if(await this.checkIfUserIsJoined(newUserId)) {
            throw new Error(`User is already in the conversation`);
        }
        const userConverSetting = await ConversationSettingRepo.create({
            isAdminSetting: false
        } as ConversationSettingDto);
        await ParticipantRepo.addParticipantToConversation(
            this.conversationId,
            newUserId,
            userConverSetting.id,
            false,
            false);
        return await this.getConversationDetail();
    }

    async adminDeleteConversation() {
        const isAdmin = await this.checkIfUserIsAdmin();
        if (!isAdmin) {
            throw new Error(`You are not an admin`);
        }
        const conversation = await ConversationRepo.deleteConversation(this.conversationId);
        return conversation;
    }

    async kickMember(userId: string) {
        const isAdmin = await this.checkIfUserIsAdmin();
        if (!isAdmin) {
            throw new Error(`You are not an admin`);
        }
        if(! await this.checkIfUserIsJoined(userId)) {
            throw new Error(`The user is not in the conversation`);
        }
        const participant = await ParticipantRepo.getParticipantByConversation(
            userId,
            this.conversationId);
        await participant.destroy();
        return await this.getConversationDetail();
    }

    async leaveConversation(userId: string) {
        // check if is admin
        const isAdmin = await this.checkIfUserIsAdmin();
        if (isAdmin) {
            throw new Error(`Admin can not leave the conversation please change admin before leaving`);
        }
        if(! await this.checkIfUserIsJoined(this.userId)) {
            throw new Error(`You are not in the conversation`);
        }
        const participant = await ParticipantRepo.getParticipantByConversation(
            userId,
            this.conversationId);
        await participant.destroy();
        return await this.getConversationDetail();
    }

    async blockParticipant(userId: string, blockExpires: Date) {
        // if conversation type is GROUP, only admin can block member
        if(this.conversationData.type === 'GROUP') {
            const isAdmin = await this.checkIfUserIsAdmin();
            if (!isAdmin) {
                throw new Error(`You are not an admin`);
            }
        }
        
        if(! await this.checkIfUserIsJoined(userId)) {
            throw new Error(`The user is not in the conversation`);
        }
        const blockExpiresDate = new Date(blockExpires);
        if (isNaN(blockExpiresDate.getTime())) {
            throw new Error(`blockExpires is not a valid date`);
        }
        if(blockExpiresDate <= new Date())
        {
            throw new Error(`blockExpires must be in the future`);
        }
        const participant = await ParticipantRepo.getParticipantByConversation(
            userId,
            this.conversationId);
        const updatedParticipant = {
            isBlocked: true,
            blockExpires: blockExpires
        } as updateParticipantDto;
        await participant.update(updatedParticipant);
        return await this.getConversationDetail();
    }

    async unblockParticipant(userId: string) {
        // if conversation type is GROUP, only admin can unblock member
        if(this.conversationData.type === 'GROUP') {
            const isAdmin = await this.checkIfUserIsAdmin();
            if (!isAdmin) {
                throw new Error(`You are not an admin`);
            }
        }
        if(! await this.checkIfUserIsJoined(userId)) {
            throw new Error(`The user is not in the conversation`);
        }
        const participant = await ParticipantRepo.getParticipantByConversation(
            userId,
            this.conversationId);
        // check if the user is block or not
        if(!participant.isBlocked) {
            throw new Error(`The user is not blocked`);
        }
        const updatedParticipant = {
            isBlocked: false,
            blockExpires: null
        } as updateParticipantDto;
        await participant.update(updatedParticipant);
        return await this.getConversationDetail();
    }

    async updateConversationSetting(updateData: updateConversationSettingDto) {
        if ('isAdminSetting' in updateData) {
            throw new Error(`Can not update isAdminSetting`);
        }
        // is it setting of admin
        if(!this.userConversationSetting.isAdminSetting) {
            if(updateData.addByAll){
                throw new Error(`You are not allowed to update addByAll`);
            }
        }   

        const conversationSetting = await ConversationSettingRepo.update(
            this.participantData.conversationSettingId,
            updateData);
        return conversationSetting;
    }

    async resetConversationSetting() {
        const updateData = {
            isMuteNotiMessage: null,
            isMuteNotiMention: null,
            isMuteNotiJoinGroup: null,
            isMuteNotiLeaveGroup: null,
            pinMessage: null,
            isFavorite: false
        } as any
        if(this.userConversationSetting.isAdminSetting) {
            updateData.addByAll = false;
        }
        const conversationSetting = await ConversationSettingRepo.update(
            this.participantData.conversationSettingId,
            updateData as updateConversationSettingDto);
        return conversationSetting;
    }
}

