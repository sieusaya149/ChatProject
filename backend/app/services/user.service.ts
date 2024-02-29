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
import Logger from '@viethung/logger'
export class UserService {
    static getUserProfile = async (req: Request, res: Response) => {
        try {
            return {}
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    };
}
