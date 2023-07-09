import { type Address } from './IAddress'
import { type Email } from './IEmail'
import { type Name } from './IName'
import { type Phone } from './IPhones'
import { type Org } from './IOrg'
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
