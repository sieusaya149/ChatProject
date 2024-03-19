import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { UserMessageMentionDto } from "../dto-models/userMessageMentionDto";
import Logger from "@viethung/logger";
const UserMessageMentions = backendModel.UserMessageMentions;


export class UserMessageMentionRepo {
    static async create(newMention: UserMessageMentionDto) {
        try {
            const mention = await UserMessageMentions.create(newMention);
            Logger.info(`Mention ${mention.id} has been created`);
            return mention;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getUserMentionForMessage(messageId) {
        try {
            const mentions = await UserMessageMentions.findOne({where: {messageId}});
            if (!mentions) {
                throw new Error(`Mention not found`);
            }
            return mentions;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}