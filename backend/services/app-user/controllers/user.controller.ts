import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { UserService } from '../services/user.service';
class UserController {

    
    static createNewUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Create New User Success!',
            await UserService.createUser(req, res)
        );
        return successRes.send(res);
    };

    static getUserProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get User Success!',
            await UserService.getUserProfile(req, res)
        );
        return successRes.send(res);
    }

    static updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Update User Success!',
            await UserService.updateUser(req, res)
        );
        return successRes.send(res);
    }

    static deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Delete User Success!',
            await UserService.deleteUser(req, res)
        );
        return successRes.send(res);
    }

    static getUserList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get User List Success!',
            await UserService.getUserList(req, res)
        );
        return successRes.send(res);
    }
}

export default UserController;
