import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models-chat";
import { MessageDto, UpdateMessage } from "../dto-models/messageDto";
import Logger from "@viethung/logger";
const Messages = backendModel.Messages;
const Conversations = backendModel.Conversations;


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

    static async getMessageByConversation(conversationId, limit = null, page = null) {
        try {
            const options = {
                where: sequelize.and(
                    {conversationId: conversationId},
                    {userId: {[Sequelize.Op.ne]: null}},
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
            const totalMessages = await Messages.count(options);

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

    static update(messageId: string, updatedMessage: UpdateMessage) {
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

    static undo(messageId: string) {
        try {
            const message = Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.update({isUndo: true});
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static hide(messageId: string) {
        try {
            const message = Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.update({isHidden: true});
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static delete(messageId: string) {
        try {
            const message = Messages.findOne({where: {id: messageId}});
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