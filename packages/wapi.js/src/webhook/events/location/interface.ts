import { type LocationMessage } from '../../../structures'
import { type MessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface LocationMessageEventInterface extends MessageEventInterface {
	location: LocationMessage
}
