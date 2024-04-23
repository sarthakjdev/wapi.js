import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface SystemMessageEventInterface extends MessageEventInterface {
	system: {}
}
