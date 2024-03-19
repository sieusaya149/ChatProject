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

    static async getConversationMessages(conversationId, userId, limit = null, page = null) {
        try {
            const options = {
                where: sequelize.and(
                    {conversationId: conversationId},
                    {isUndo: false},
                    sequelize.where(
                        sequelize.literal(`"Messages"."id" NOT IN (SELECT "messageId" FROM "HideMessages" WHERE "userId" = '${userId}')`),
                        true
                    )
                ),
                order: [['createdAt', 'DESC']],
            };
            if (limit !== null && page !== null) {
                options['limit'] = limit;
                options['offset'] = limit * (page - 1);
            }
            const messages = await Messages.findAll(options);
            const fullDetailMessagePrs = messages.map(async (message) => {
                const options = {
                    where: {id: message.replyTo}
                }
                const replyToMessage = await Messages.findOne(options);
                return {...message.get({ plain: true }), replyTo: replyToMessage};
            });
            const fullDetailMessages = await Promise.all(fullDetailMessagePrs);
            const totalMessage = await Messages.count(options);
            return {
                totalMessage,
                limit,
                currentPage: page,
                totalPage: limit ? Math.ceil(totalMessage / limit): null,
                messages: fullDetailMessages,
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getPinMessages(conversationId, userId, limit = null, page = null) {
        try {
            const options = {
                where: sequelize.and(
                    {conversationId: conversationId},
                    {isPin: true},
                    {isUndo: false},
                    sequelize.where(
                        sequelize.literal(`"id" NOT IN (SELECT "messageId" FROM "HideMessages" WHERE "userId" = '${userId}')`),
                        true
                    )
                ),
                order: [['pinAt', 'DESC']],
            }
            if (limit !== null && page !== null) {
                options['limit'] = limit;
                options['offset'] = limit * (page - 1);
            }
            const pinMessages = await Messages.findAll(options);
            const totalPin = await Messages.count(options);
            return {
                totalPin,
                limit,
                currentPage: page,
                totalPage: limit ? Math.ceil(totalPin / limit): null,
                pinMessages,
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

    static async pin(messageId: string) {
        try {
            const message = await Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            const pinAt = new Date()
            message.update({
                isPin: true,
                pinAt: pinAt
            });
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async unPin(messageId: string) {
        try {
            const message = await Messages.findOne({where: {id: messageId}});
            if (!message) {
                throw new Error(`Message not found`);
            }
            message.update({
                isPin: false,
                pinAt: null
            });
            return message;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async getUnreadMessages(conversationId, userId, lastestViewedMessageIndex, limit = null , page = null) {
        try {
            const whereConditions = [
                { conversationId: conversationId },
                { userId: { [Sequelize.Op.ne]: userId } },
                { isUndo: false },
                sequelize.where(
                    sequelize.literal(`"id" NOT IN (SELECT "messageId" FROM "HideMessages" WHERE "userId" = '${userId}')`),
                    true
                )
            ]
            if(lastestViewedMessageIndex){
                whereConditions.push({ messageIndex: { [Sequelize.Op.gt]: lastestViewedMessageIndex } } as any);
            }
            const options = {
                where: {
                    [Sequelize.Op.and]: whereConditions
                },
                order: [['createdAt', 'DESC']],
            }
            if (limit !== null && page !== null) {
                options['limit'] = limit;
                options['offset'] = limit * (page - 1);
            }
            const unreadMessages = await Messages.findAll(options);
            const totalUnreadMessage = await Messages.count(options);
            return {
                totalUnreadMessage,
                limit,
                currentPage: page,
                totalPage: limit ? Math.ceil(totalUnreadMessage / limit): null,
                unreadMessages
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async searchMessages(conversationId, userId, keyword, limit = null, page = null) {
        try {
            const options = {
                where: sequelize.and(
                    {conversationId: conversationId},
                    {userId: {[Sequelize.Op.eq]: userId}},
                    {isUndo: false},
                    {text: {[Sequelize.Op.iLike]: `%${keyword}%`}},
                    sequelize.where(
                        sequelize.literal(`"id" NOT IN (SELECT "messageId" FROM "HideMessages" WHERE "userId" = '${userId}')`),
                        true
                    )
                ),
                order: [['createdAt', 'ASC']],
            }
            if (limit !== null && page !== null) {
                options['limit'] = limit;
                options['offset'] = limit * (page - 1);
            }
            const searchMessages = await Messages.findAll(options);
            const totalSearchMessage = await Messages.count(options);
            return {
                totalSearchMessage,
                limit,
                currentPage: page,
                totalPage: limit ? Math.ceil(totalSearchMessage / limit): null,
                searchMessages
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}