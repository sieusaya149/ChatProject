import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { ConversationSettingDto, updateConversationSettingDto } from "../dto-models/conversationSettingDto";
import Logger from "@viethung/logger";
const ConversationSettings = backendModel.ConversationSettings;
export class ConversationSettingRepo {
    static async create(newConversationSetting: ConversationSettingDto){
        try {
            console.log(newConversationSetting)
            const createdSetting = await ConversationSettings.create(newConversationSetting);
            Logger.info(`ConversationSettings ${createdSetting.id} has been created`);
            return createdSetting;
          } catch (error) {
            console.log("VIETHUNG", error);
            throw new Error(`${error}`);
        }
    }

    static async getById(id: string) {
        try {
            const setting = await ConversationSettings.findOne({where: {id: id}});
            if (!setting) {
                throw new Error(`ConversationSetting not found`);
            }
            return setting;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async update(id: string, conversationSetting: updateConversationSettingDto){
        try {
            const setting = await ConversationSettings.findOne({where: {id: id}});
            if (!setting) {
                throw new Error(`ConversationSetting not found`);
            }
            await setting.update(conversationSetting);
            return setting;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async delete(id: string){
        try {
            const setting = await ConversationSettings.findOne({where: {id: id}});
            if (!setting) {
                throw new Error(`ConversationSetting not found`);
            }
            await setting.destroy();
            return setting;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}