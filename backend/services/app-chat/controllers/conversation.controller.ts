import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { ConversationService } from '../services/conversation.service';
class ConversationController {
    
    static createConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Create New User Success!',
            await ConversationService.createConversation(req, res)
        );
        return successRes.send(res);
    };

    
}

export default ConversationController;
