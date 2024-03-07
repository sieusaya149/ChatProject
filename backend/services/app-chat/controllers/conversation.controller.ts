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

    static getConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Conversation Success!',
            await ConversationService.getConversation(req, res)
        );
        return successRes.send(res);
    }

    static updateConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Update Conversation Success!',
            await ConversationService.updateConversation(req, res)
        );
        return successRes.send(res);
    }

    static userBlockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'User Block Conversation Success!',
            await ConversationService.userBlockConversation(req, res)
        );
        return successRes.send(res);
    }

    static systemAdminBlockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'System Admin Block Conversation Success!',
            await ConversationService.systemAdminBlockConversation(req, res)
        );
        return successRes.send(res);
    }

    static userUnblockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'User Unblock Conversation Success!',
            await ConversationService.userUnblockConversation(req, res)
        );
        return successRes.send(res);
    }

    static systemAdminUnblockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'System Admin Unblock Conversation Success!',
            await ConversationService.systemAdminUnblockConversation(req, res)
        );
        return successRes.send(res);
    }

    static adminDeleteConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Admin Delete Conversation Success!',
            await ConversationService.adminDeleteConversation(req, res)
        );
        return successRes.send(res);
    }

    static updateAdminConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Update Admin Conversation Success!',
            await ConversationService.updateAdminConversation(req, res)
        );
        return successRes.send(res);
    }

    static addParticipant = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Add Participant Success!',
            await ConversationService.addParticipant(req, res)
        );
        return successRes.send(res);
    }
    
}

export default ConversationController;
