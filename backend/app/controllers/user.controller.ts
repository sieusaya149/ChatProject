import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { UserService } from '../services/user.service';
class UserController {
    static getUserProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get User Profile Success!',
            await UserService.getUserProfile(req, res)
        );
        return successRes.send(res);
    };
}

export default UserController;
