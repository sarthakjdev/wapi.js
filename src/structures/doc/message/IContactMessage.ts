import { type BaseMessage } from './IBaseMessage'
import { type Contact } from '../contact'

/**
 * contact message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface ContactMessage extends BaseMessage {
	contacts: Contact[]
}
