import { Optional } from "sequelize/types"
export type ConversationTypeDto = 'PRIVATE' | 'GROUP';
export type ConversationDto = {
    id?: string;
    description?: string;
    type: ConversationTypeDto;
    isSystemBlock?: boolean;
    isAdminBlock?: boolean;
    blockExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type updateConversationDto = Optional<ConversationDto, 'type'>; 