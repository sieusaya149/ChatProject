import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { MessageDto, UpdateMessage } from "../dto-models/messageDto";
import Logger from "@viethung/logger";
const Messages = backendModel.Messages;
const HideMessages = backendModel.HideMessages;

export class MessageRepo {
    static async create(newMessage: MessageDto) {
        try {
            const message = await Messages.create(newMessage);
            Logger.info(`Message ${message.id} has been created`);
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getMessageById(messageId: string) {
        try {
            const message = await Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getMessageByConversation(conversationId, userId, limit = null, page = null) {
        try {
            const options = {
                where: sequelize.and(
                    {conversationId: conversationId},
                    {userId: {[Sequelize.Op.eq]: userId}},
                    {isUndo: false},
                    sequelize.where(
                        sequelize.literal(`"id" NOT IN (SELECT "messageId" FROM "HideMessages" WHERE "userId" = '${userId}')`),
                        true
                    )
                ),
                order: [['createdAt', 'DESC']],
            };
            if (limit !== null && page !== null) {
                console.log('limit', limit);
                console.log('page', page);
                options['limit'] = limit;
                options['offset'] = limit * (page - 1);
            }
            const messages = await Messages.findAll(options);
            const totalMessages = messages.length;

            return {
                totalMessages,
                limit,
                currentPage: page,
                totalPage: Math.ceil(totalMessages / limit),
                messages,
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async update(messageId: string, updatedMessage: UpdateMessage) {
        try {
            const message = Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.update(updatedMessage);
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async undo(messageId: string) {
        try {
            const message = await Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.update({isUndo: true});
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async delete(messageId: string) {
        try {
            const message = await Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.destroy();
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}