import { Address } from './IAddress'
import { Email } from './IEmail'
import { Name } from './IName'
import { Phone } from './IPhones'
import { Org } from './IOrg'
/**
 * contact interface use to send a contact message
 * @interface
 * @export
 */
export interface Contact {
    /**
     *  full addresses
     * @memberof Contact
     */
    addresses?: Address[]

    /**
     *  birthday formatted in YYYY-MM-DD
     * @memberof Contact
     */
    birthday?: string

    /**
     *  contacts emails
     * @memberof Contact
     */
    emails?: Email[]

    /**
     *  full name
     * @memberof Contact
     */
    name: Name

    /**
     *  contact organisation information
     * @memberof Contact
     */
    org?: Org

    /**
     *  contact phone number(s)
     * @memberof Contact
     */
    phones?: Phone[]

    /**
     *  contact url(s)
     * @memberof Contact
     */
    url?: URL
}
