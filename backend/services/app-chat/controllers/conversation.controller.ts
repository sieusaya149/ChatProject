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

    static adminBlockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'User Block Conversation Success!',
            await ConversationService.adminBlockConversation(req, res)
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

    static adminUnblockConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'User Unblock Conversation Success!',
            await ConversationService.adminUnblockConversation(req, res)
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

    static kickMember = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Kick Member Success!',
            await ConversationService.kickMember(req, res)
        );
        return successRes.send(res);
    }

    static leaveConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Leave Conversation Success!',
            await ConversationService.leaveConversation(req, res)
        );
        return successRes.send(res);
    }

    static getConversations = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Conversations Success!',
            await ConversationService.getConversations(req, res)
        );
        return successRes.send(res);
    }
    
    static blockParticipant = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Block Member Success!',
            await ConversationService.blockParticipant(req, res)
        );
        return successRes.send(res);
    }

    static unblockParticipant = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Unblock Member Success!',
            await ConversationService.unblockParticipant(req, res)
        );
        return successRes.send(res);
    }

    static getConversationSetting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Conversation Setting Success!',
            await ConversationService.getConversationSetting(req, res)
        );
        return successRes.send(res);
    }


    static updateConversationSetting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get Conversation By User Id Success!',
            await ConversationService.updateConversationSetting(req, res)
        );
        return successRes.send(res);
    }

    static resetConversationSetting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Reset Conversation Setting!',
            await ConversationService.resetConversationSetting(req, res)
        );
        return successRes.send(res);
    }

    static searchConversation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Search Conversation Success!',
            await ConversationService.searchConversation(req, res)
        );
        return successRes.send(res);
    }

    static joinConversationByCode = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Join Conversation By Code Success!',
            await ConversationService.joinConversationByCode(req, res)
        );
        return successRes.send(res);
    }
}

export default ConversationController;
