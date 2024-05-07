import { type BaseMessageInterface } from '../message/interface'
import { type Contact } from './index'

/**
 * Represents the interface for a contact message.
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface ContactMessageInterface extends BaseMessageInterface {
	/**
	 * An array of contacts associated with the message.
	 * @type {Contact[]}
	 */
	contacts: Contact[]
}
