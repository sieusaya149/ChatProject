import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { participantDto, updateParticipantDto } from "../dto-models/participantDto";
import Logger from "@viethung/logger";
const Participants = backendModel.Participants;


export class ParticipantRepo {
    static async createParticipant(newParticipant: participantDto) {
        try {
        const participant = await Participants.create(newParticipant);
        Logger.info(`Participant ${participant.id} has been created`);
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }
    
    static async getParticipantByUserId(userId: string) {
        try {
        const participant = await Participants.findOne({where: {userId}});
        if (!participant) {
            throw new Error(`Participant not found`);
        }
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }

    static async getParticipantByConversation(userId: string,
                                              conversationId: string) {
        try {
        const participant = await Participants.findOne({
            where: {
                userId: userId,
                conversationId: conversationId
            }
        });
        if (!participant) {
            throw new Error(`Participant not found`);
        }
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }
    
    static async updateParticipant(
        userId: string,
        conversationId: string,
        updatedParticipant: updateParticipantDto) {    
        try {
        const participant = await Participants.findOne({
            where: {
                userId: userId,
                conversationId: conversationId
            }});
        await participant.update(updatedParticipant);
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }
    
    static async deleteParticipant(participantId: string) {
        try {
        const participant = await Participants.findOne({where: {id: participantId}});
        if (!participant) {
            throw new Error(`Participant not found`);
        }
        await participant.destroy();
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }

    static async addParticipantToConversation(
        conversationId: string,
        userId: string,
        conversationSettingId: string,
        isCreator : boolean = false,
        isAdmin: boolean = false) {
        try {
            const participantData = {
                conversationId,
                userId,
                isCreator,
                isAdmin,
                conversationSettingId,
            } as participantDto
            const participant = await Participants.create(participantData);
            return participant;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getAdminConversation(conversationId: string) {
        try {
            const admin = await Participants.findOne({
                where: {
                    conversationId: conversationId,
                    isAdmin: true
                }
            });
            return admin;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async updateLastestViewedMessage(conversationId: string, userId: string, messageIndex: number) {
        try {
            const updatedParticipant = await Participants.update({lastestViewedMessageIndex: messageIndex}, {
                where: {
                    conversationId: conversationId,
                    userId: userId
                }
            });
            return updatedParticipant;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }


} 
