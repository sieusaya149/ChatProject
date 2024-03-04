import {NextFunction, Request, Response} from 'express';
import {
    AuthFailureError,
    InternalError,
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    NoEntryError,
    BadTokenError,
    TokenExpiredError,
    NoDataError,
    AccessTokenError
} from '@viethung/api-response'
import Logger from '@viethung/logger'
import { ContactListRepo } from '../db/repositories/contactListRepo';
export class ContactService {
    static addContact = async (req: Request, res: Response) => {
        try {
            const newContact = await ContactListRepo.addContact(req.body);
            return {
                newContact
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static getContactList = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const contactList = await ContactListRepo.getContactList(userId);
            return {
                contactList
            }
        } catch (error) {
            throw new NotFoundError(`${error}`);
        }
    }

    static updateContactList = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const contactId = req.body.contactId;
            const updatedContact = req.body;
            const contact = await ContactListRepo.updateContactList(userId, contactId, updatedContact);
            return {
                contact
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static deleteContact = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const contactId = req.body.contactId;
            const contact = await ContactListRepo.deleteContact(userId, contactId);
            return {
                contact
            }
        } catch (error) {
            throw new BadRequestError(`${error}`);
        }
    }

    static searchContact = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const keyword = req.query.keyword;
            const contactList = await ContactListRepo.searchContact(userId, keyword as string);
            return {
                contactList
            }
        } catch (error) {
            throw new NotFoundError(`${error}`);
        }
    }
}
