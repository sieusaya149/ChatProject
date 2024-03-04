import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { ConversationDto, updateConversationDto } from "../dto-models/conversationDto";
import Logger from "@viethung/logger";
const Conversations = backendModel.Conversations;


export class ConversationRepo {
  static async createConversation(newConversation: ConversationDto) {
    try {
      const conversation = await Conversations.create(newConversation);
      Logger.info(`Conversation ${conversation.id} has been created`);
      return conversation;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  }

  static async getConversation(conversationId: string) {
    try {
      const conversation = await Conversations.findOne({where: {id: conversationId}});
      if (!conversation) {
        throw new Error(`Conversation not found`);
      }
      return conversation;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async updateConversation(conversationId: string, updatedConversation: updateConversationDto) {    
    try {
      const conversation = await Conversations.findOne({where: {id: conversationId}});
      if (!conversation) {
        throw new Error(`Conversation not found`);
      }
      await conversation.update(updatedConversation);
      return conversation;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async deleteConversation(conversationId: string) {
    try {
      const conversation = await Conversations.findOne({where: {id: conversationId}});
      if (!conversation) {
        throw new Error(`Conversation not found`);
      }
      await conversation.destroy();
      return conversation;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async getDetailConversation(conversationId: string) {
    try {
      const conversation = await Conversations.findOne(
        {
          where: {id: conversationId},
          include: {
            model: backendModel.Participants,
            as: 'participants'
          }
        });
      if (!conversation) {
        throw new Error(`Conversation not found`);
      }
      return conversation;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
} 