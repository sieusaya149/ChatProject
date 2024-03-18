import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { MessageService } from '../services/messaging.service';
class MessagingController {
    static createMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Create New Message Success!',
            await MessageService.createMessage(req, res)
        );
        return successRes.send(res);
    };

    static getConversationHistory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Conversation History Success!',
            await MessageService.getConversationHistory(req, res)
        );
        return successRes.send(res);
    };
}

export default MessagingController;