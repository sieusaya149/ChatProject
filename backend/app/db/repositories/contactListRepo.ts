import { ContactListDto, ContactListUpdateDto } from "./contactListDto";

import backendModel from "@viethung/backend-models";
const ContactLists = backendModel.ContactLists;

export class ContactListRepo {
  static async addContact(newContact: ContactListDto) {
    try {
      const contact = await ContactLists.create(newContact);
      return contact;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async getContactList(userId: string) {
    try {
      const contactList = await ContactLists.findAll({
        where: {userId},
        include: {
            model: backendModel.Users,
            as: 'contact',
        }
    });
      return contactList;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async updateContactList(userId: string, contactId: string, updatedContact: ContactListUpdateDto) {
    try {
      if (!updatedContact.block) {
        updatedContact.blockExpires = null;
      }
      const contact = await ContactLists.findOne({where: {userId, contactId}});
      if (!contact) {
        throw new Error(`Contact not found`);
      }
      await contact.update(updatedContact);
      return contact;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async deleteContact(userId: string, contactId: string) {
    try {
      const contact = await ContactLists.findOne({where: {userId, contactId}});
      if (!contact) {
        throw new Error(`Contact not found`);
      }
      await contact.destroy();
      return contact;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}