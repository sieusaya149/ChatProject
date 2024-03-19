import { Optional } from "sequelize/types"

export type UserMessageMentionDto = {
    id?: string;
    messageId: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
