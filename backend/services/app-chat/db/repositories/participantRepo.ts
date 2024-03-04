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
        console.log(error);
        throw new Error(`${error}`);
        }
    }
    
    static async getParticipant(participantId: string) {
        try {
        const participant = await Participants.findOne({where: {id: participantId}});
        if (!participant) {
            throw new Error(`Participant not found`);
        }
        return participant;
        } catch (error) {
        throw new Error(`${error}`);
        }
    }
    
    static async updateParticipant(participantId: string, updatedParticipant: updateParticipantDto) {    
        try {
        const participant = await Participants.findOne({where: {id: participantId}});
        if (!participant) {
            throw new Error(`Participant not found`);
        }
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

    static async addParticipantToConversation(conversationId: string, userId: string, isCreator : boolean = false) {
        try {
            const participant = await Participants.create({
                conversationId,
                userId,
                isCreator
            });
            return participant;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

} 
