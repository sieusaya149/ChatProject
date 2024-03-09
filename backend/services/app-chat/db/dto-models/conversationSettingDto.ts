export type ConversationSettingDto = {
    id?: string;
    isMuteNotiMessage?: boolean;
    isMuteNotiMention?: boolean;
    isMuteNotiJoinGroup?: boolean;
    isMuteNotiLeaveGroup?: boolean;
    isAdminSetting: boolean;
    addByAll?: boolean;
    pinMessage?: any;
    isFavorite?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type updateConversationSettingDto = ConversationSettingDto