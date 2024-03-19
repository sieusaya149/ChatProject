import { Optional } from "sequelize/types"
export type participantDto = {
    id?: string;
    isCreator?: boolean;
    isAdmin?: boolean;
    joinedDate?: Date;
    nickName?: string;
    lastestViewedMessageIndex?: number;
    isBlocked?: boolean;
    blockExpires?: Date;
    userId: string;
    conversationId: string;
    viewFromDate?: Date;
    conversationSettingId: string;
    muteNotification?: boolean;
    muteNOtificationExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type updateParticipantDto = Optional<participantDto, 'userId'| 'conversationId' | 'conversationSettingId' | 'viewFromDate'>; 