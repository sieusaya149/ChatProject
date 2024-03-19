import { Optional } from "sequelize/types"

export type HideMessageDto = {
    id?: string;
    userId: string;
    messageId: string;
    remainTime: any;
    createdAt?: Date;
    updatedAt?: Date;
}
