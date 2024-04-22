import { type ContactMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import {
    type ContactNamePayloadSchemaType,
    type ContactAddressSchemaType,
    type ContactEmailPayloadSchemaType,
    type ContactPhonePayloadSchemaType,
    type ContactUrlPayloadSchemaType,
    type ContactOrgPayloadSchemaType
} from './schema'

/**
 * @class
 */
export class Contact {
    addresses?: z.infer<typeof ContactAddressSchemaType>[]
    urls?: z.infer<typeof ContactUrlPayloadSchemaType>[]
    emails?: z.infer<typeof ContactEmailPayloadSchemaType>[]
    phones?: z.infer<typeof ContactPhonePayloadSchemaType>[]
    birthday?: string
    org?: z.infer<typeof ContactOrgPayloadSchemaType>
    name: z.infer<typeof ContactNamePayloadSchemaType>

    constructor(params: { name: z.infer<typeof ContactNamePayloadSchemaType> }) {
        this.name = params.name
    }

    setLastName(lastName: string) {
        this.name.last_name = lastName
    }

    setFirstName(firstName: string) {
        this.name.first_name = firstName
    }

    setMiddleName(middleName: string) {
        this.name.middle_name = middleName
    }

    setNameSuffix(suffix: string) {
        this.name.suffix = suffix
    }

    setNamePrefix(prefix: string) {
        this.name.prefix = prefix
    }

    setOrg(org: z.infer<typeof ContactOrgPayloadSchemaType>) {
        this.org = org
    }

    addAddress(address: z.infer<typeof ContactAddressSchemaType>) {
        this.addresses?.length ? this.addresses.push(address) : [address]
    }

    addUrl(url: z.infer<typeof ContactUrlPayloadSchemaType>) {
        this.urls?.length ? this.urls.push(url) : [url]

    }

    addEmail(email: z.infer<typeof ContactEmailPayloadSchemaType>) {
        this.emails?.length ? this.emails.push(email) : [email]

    }

    addPhone(phone: z.infer<typeof ContactPhonePayloadSchemaType>) {
        this.phones?.length ? this.phones.push(phone) : [phone]
    }

    setBirthday(date: string) {
        this.birthday = date
    }
}

/**
 * @class
 * @extends {BaseMessage}
 * @implements {ContactMessageInterface}
 */
export class ContactMessage extends BaseMessage<'contacts'> implements ContactMessageInterface {
    contacts: Contact[]

    /**
     * @constructor
     * @memberof ContactMessage
     */
    constructor(params: { contacts: Contact[] }) {
        super({ type: MessageTypeEnum.Contacts })
        this.contacts = params.contacts
    }

    /**
     * @function
     * @memberof ContactMessage
     */
    addContact(contact: Contact) {
        this.contacts.push(contact)
    }

    toJson(params: {
        to: string
    }): Extract<z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>, { type: 'contacts' }> {
        return {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: params.to,
            type: MessageTypeEnum.Contacts,
            contacts: this.contacts
        }
    }
}
