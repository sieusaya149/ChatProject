import { Optional } from "sequelize/types"
export type UserStatusDto = 'ACTIVE' | 'INACTIVE';
export type UserDto = {
    id?: string;
    lastName: string;
    firstName: string;
    email: string;
    sex: boolean;
    birthDay?: Date;
    bio?: string;
    phone: string;
    avatar?: string;
    accountId: string;
    regionPhoneCodeId?:string;
    status?: UserStatusDto;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserUpdateDto = Optional<UserDto, 'lastName'| 'firstName'| 'email'| 'sex'>; 