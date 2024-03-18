import {asyncHandler} from '@viethung/async-call';
import {NextFunction, Request, Response} from 'express';
import {NotFoundError} from '@viethung/api-response'
import ConversationManagement from '../services/conversationManagement';
const conversationMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {conversationId, userId} = req.body;
        // check if conversationId, userId is valid
        if (!conversationId || !userId) {
            throw new Error('Missing required fields');
        }
        const conversationMng = new ConversationManagement(conversationId);
        if(await conversationMng.checkIfUserIsJoined(userId)) {
            next();
        }
        else {
            throw new NotFoundError(`User not joined conversation`);
        }
    } catch (error) {
        throw new NotFoundError(`${error}`);
    }
}



export const conversationValidate = asyncHandler(conversationMiddleware)

 