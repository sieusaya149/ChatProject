import {NextFunction, Request, Response} from 'express';
import {
    AuthFailureError,
    InternalError,
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    NoEntryError,
    BadTokenError,
    TokenExpiredError,
    NoDataError,
    AccessTokenError
} from '@viethung/api-response'
import {UserRepo} from '../db/repositories/userRepo';
import { UserDto } from '../db/repositories/userDto';
import { pick } from 'lodash';
export class UserService {

    static createUser = async (req: Request, res: Response) => {
        try {
            const newUser: UserDto = req.body;
            const insertedUser = await UserRepo.createUser(newUser);
            return {
                insertedUser
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getUserProfile = async (req: Request, res: Response) => {    
        try {
            const userId = req.params.userId;
            const user = await UserRepo.getUser(userId);
            return {
                user
            }
        } catch (error) {
            throw new NotFoundError(`${error}`);
        }
    }

    static updateUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const updatedUser: UserDto = req.body;
            const user = await UserRepo.updateUser(userId, updatedUser);
            return {
                user
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const user = await UserRepo.deleteUser(userId);
            return {
                user
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getUserList = async (req: Request, res: Response) => {
        try {
            const userList = await UserRepo.getUserList();
            const users = userList.map( user => {
                return pick(user, ['id', 'firstName', 'lastName' , 'phone'])
            });
            return {
                users
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }
}

