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

    static getMessageInfor = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Message Information Success!',
            await MessageService.getMessageInfor(req, res)
        );
        return successRes.send(res);
    }

    static undoMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Undo Message Success!',
            await MessageService.undoMessage(req, res)
        );
        return successRes.send(res);
    }

    static hideMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Hide Message Success!',
            await MessageService.hideMessage(req, res)
        );
        return successRes.send(res);
    }

    static pinMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Pin Message Success!',
            await MessageService.pinMessage(req, res)
        );
        return successRes.send(res);
    }

    static unPinMessage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Unpin Message Success!',
            await MessageService.unPinMessage(req, res)
        );
        return successRes.send(res);
    }

    static getPinMessages = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Pin Messages Success!',
            await MessageService.getPinMessages(req, res)
        );
        return successRes.send(res);
    }
}

export default MessagingController;