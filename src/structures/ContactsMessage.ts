import { MessageComponent } from './MessageComponent'
import { Contact } from './doc/contact'

export class ContactMessageComponent extends MessageComponent {
    /**
     * contacts to send in the contact message
     * @memberof ContactMessageComponent
     */
    contacts: Contact[]

    /**
     * add a contact in the contacts component
     * @param {Contact} contact
     * @returns
     */
    public addContact(contact: Contact): this {
        this.contacts.push(contact)

        return this
    }

    /**
     *  add multiple contacts to the contact component
     * @param {Contact[]} contacts
     * @returns
     */
    public addContacts(contacts: Contact[]): this {
        contacts.map((c) => {
            this.contacts.push(c)

            return this.contacts
        })

        return this
    }
}
