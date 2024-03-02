import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { ContactService } from '../services/contact.service';
class ContactController {
    static createNewContact = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Add new contact success!',
            await ContactService.addContact(req, res)
        );
        return successRes.send(res);
    };

    static getContactList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Get contact list success!',
            await ContactService.getContactList(req, res)
        );
        return successRes.send(res);
    }

    static updateContactList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Update contact success!',
            await ContactService.updateContactList(req, res)
        );
        return successRes.send(res);
    }

    static deleteContact = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Delete contact success!',
            await ContactService.deleteContact(req, res)
        );
        return successRes.send(res);
    }

    static searchContact = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Search contact success!',
            await ContactService.searchContact(req, res)
        );
        return successRes.send(res);
    }
}

export default ContactController;
