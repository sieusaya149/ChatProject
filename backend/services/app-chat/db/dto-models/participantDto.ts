import { Optional } from "sequelize/types"
export type participantDto = {
    id?: string;
    isCreator?: boolean;
    isAdmin?: boolean;
    joinedDate?: Date;
    nickName?: string;
    lastViewedMessage?: number;
    isBlocked?: boolean;
    blockExpires?: Date;
    userId: string;
    conversationId: string;
    muteNotification?: boolean;
    muteNOtificationExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type updateParticipantDto = Optional<participantDto, 'userId'| 'conversationId'>; 