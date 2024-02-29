import {Request, Response, NextFunction} from 'express';
import {SuccessResponse} from '@viethung/api-response';
import { ContactService } from '../services/contact.service';
class ContactController {
    static getContactList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        const successRes = new SuccessResponse(
            'Add new Cloud Provider success!',
            await ContactService.getContactList(req, res)
        );
        return successRes.send(res);
    };
}

export default ContactController;
