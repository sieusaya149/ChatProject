import { Optional } from "sequelize/types"
export type ContactListDto = {
    id?: string;
    userId: string;
    contactId: string;
    block?: boolean;
    blockExpires?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ContactListUpdateDto = Optional<ContactListDto, 'block'| 'blockExpires'>; 