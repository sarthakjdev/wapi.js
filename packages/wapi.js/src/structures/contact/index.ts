import { type ContactMessageInterface } from "./interface";
import { MessageTypeEnum } from "../message/types";
import { BaseMessage } from "../message";
import { type z } from "zod";
import { type WhatsappCloudApiRequestPayloadSchemaType } from "../../api-request-payload-schema";
import {
  type ContactNamePayloadSchemaType,
  type ContactAddressSchemaType,
  type ContactEmailPayloadSchemaType,
  type ContactPhonePayloadSchemaType,
  type ContactUrlPayloadSchemaType,
  type ContactOrgPayloadSchemaType,
} from "./schema";

/**
 * Represents a contact.
 * @class Contact
 */
export class Contact {
  addresses?: z.infer<typeof ContactAddressSchemaType>[];
  urls?: z.infer<typeof ContactUrlPayloadSchemaType>[];
  emails?: z.infer<typeof ContactEmailPayloadSchemaType>[];
  phones?: z.infer<typeof ContactPhonePayloadSchemaType>[];
  birthday?: string;
  org?: z.infer<typeof ContactOrgPayloadSchemaType>;
  name: z.infer<typeof ContactNamePayloadSchemaType>;

  /**
   * Creates a new Contact instance.
   * @constructor
   * @param {Object} params - The parameters for creating a Contact instance.
   * @param {Object} params.name - The name of the contact.
   */
  constructor(params: { name: z.infer<typeof ContactNamePayloadSchemaType> }) {
    this.name = params.name;
  }

  /**
   * Sets the last name of the contact.
   * @param {string} lastName - The last name of the contact.
   */
  setLastName(lastName: string) {
    this.name.last_name = lastName;
  }

  /**
   * Sets the first name of the contact.
   * @param {string} firstName - The first name of the contact.
   */
  setFirstName(firstName: string) {
    this.name.first_name = firstName;
  }

  /**
   * Sets the middle name of the contact.
   * @param {string} middleName - The middle name of the contact.
   */
  setMiddleName(middleName: string) {
    this.name.middle_name = middleName;
  }

  /**
   * Sets the suffix of the contact's name.
   * @param {string} suffix - The suffix of the contact's name.
   */
  setNameSuffix(suffix: string) {
    this.name.suffix = suffix;
  }

  /**
   * Sets the prefix of the contact's name.
   * @param {string} prefix - The prefix of the contact's name.
   */
  setNamePrefix(prefix: string) {
    this.name.prefix = prefix;
  }

  /**
   * Sets the organization of the contact.
   * @param {Object} org - The organization of the contact.
   */
  setOrg(org: z.infer<typeof ContactOrgPayloadSchemaType>) {
    this.org = org;
  }

  /**
   * Adds an address to the contact.
   * @param {Object} address - The address to add to the contact.
   */
  addAddress(address: z.infer<typeof ContactAddressSchemaType>) {
    this.addresses?.length ? this.addresses.push(address) : [address];
  }

  /**
   * Adds a URL to the contact.
   * @param {Object} url - The URL to add to the contact.
   */
  addUrl(url: z.infer<typeof ContactUrlPayloadSchemaType>) {
    this.urls?.length ? this.urls.push(url) : [url];
  }

  /**
   * Adds an email to the contact.
   * @param {Object} email - The email to add to the contact.
   */
  addEmail(email: z.infer<typeof ContactEmailPayloadSchemaType>) {
    this.emails?.length ? this.emails.push(email) : [email];
  }

  /**
   * Adds a phone number to the contact.
   * @param {Object} phone - The phone number to add to the contact.
   */
  addPhone(phone: z.infer<typeof ContactPhonePayloadSchemaType>) {
    this.phones?.length ? this.phones.push(phone) : [phone];
  }

  /**
   * Sets the birthday of the contact.
   * @param {string} date - The birthday of the contact.
   */
  setBirthday(date: string) {
    this.birthday = date;
  }
}

/**
 * Represents a contact message.
 * @class
 * @extends {BaseMessage}
 * @implements {ContactMessageInterface}
 */
export class ContactMessage
  extends BaseMessage<"contacts">
  implements ContactMessageInterface
{
  contacts: Contact[];

  /**
   * Creates a new ContactMessage instance.
   * @constructor
   * @param {Object} params - The parameters for creating a ContactMessage instance.
   * @param {Array} params.contacts - The contacts in the message.
   */
  constructor(params: { contacts: Contact[] }) {
    super({ type: MessageTypeEnum.Contacts });
    this.contacts = params.contacts;
  }

  /**
   * Adds a contact to the message.
   * @function
   * @memberof ContactMessage
   * @param {Contact} contact - The contact to add to the message.
   */
  addContact(contact: Contact) {
    this.contacts.push(contact);
  }

  /**
   * Converts the ContactMessage instance to a JSON object.
   * @function
   * @memberof ContactMessage
   * @param {Object} params - The parameters for converting the ContactMessage instance to JSON.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
   * @returns {Object} - The JSON representation of the ContactMessage instance.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: "contacts" }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: params.to,
      type: MessageTypeEnum.Contacts,
      contacts: this.contacts,
    };
  }
}
