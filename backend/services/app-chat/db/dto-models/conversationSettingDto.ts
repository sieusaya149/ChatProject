export type ConversationSettingDto = {
    id?: string;
    isMuteNotiMessage?: boolean;
    isMuteNotiMention?: boolean;
    isMuteNotiJoinGroup?: boolean;
    isMuteNotiLeaveGroup?: boolean;
    isAdminSetting: boolean;
    addByAll?: boolean;
    pinMessage?: any;     // TODO MEED TO CREATE TABLE OR ADD COL FOR MESSAGTABLE
    isFavorite?: boolean; // TODO NEED TO BE MOVE TO PARTICIPANT
    createdAt?: Date;
    updatedAt?: Date;
}

export type updateConversationSettingDto = Omit<ConversationSettingDto, 'isAdminSetting'>;