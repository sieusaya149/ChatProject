import { Optional } from "sequelize/types"
export type MessageStatusDto = 'SENDING' | 'DELIVERED';
export type MessageTypeDto = 'FILE' | 'TEXT' | 'STICKER'; 

export type MessageDto = {
    id?: string;
    userId: string;
    conversationId: string;
    type?: MessageTypeDto;
    status?: MessageStatusDto;
    parent?: string;
    isForwarded?: boolean;
    isUndo?: boolean;
    text?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UpdateMessage = Optional<MessageDto, 'userId' | 'conversationId'>; 