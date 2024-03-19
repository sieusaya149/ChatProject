import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { HideMessageDto } from "../dto-models/hideMessageDto";
import Logger from "@viethung/logger";
const HideMessages = backendModel.HideMessages;

export class HideMessageRepo {
    static async create(newHideMessage: HideMessageDto) {
        try {
            const hideMessage = await HideMessages.create(newHideMessage);
            console.log(`HideMessage ${hideMessage.id} has been created`);
            return hideMessage;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getHideMessage(userId: string, messageId: string) {
        try {
            const hideMessage = await HideMessages.findOne({where: {userId, messageId}});
            return hideMessage;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async delete(hideMessageId: string) {
        try {
            const hideMessage = await HideMessages.findOne({where: {id: hideMessageId}});
            if (!hideMessage) {
                throw new Error(`HideMessage not found`);
            }
            await hideMessage.destroy();
            return hideMessage;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}