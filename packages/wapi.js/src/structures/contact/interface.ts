import { type BaseMessageInterface } from '../message/interface'
import { type Contact } from './index'

/**
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface ContactMessageInterface extends BaseMessageInterface {
	contacts: Contact[]
}
