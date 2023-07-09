import { type Location } from '../ILocation'
import { type BaseMessage } from './IBaseMessage'

/**
 * location message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface LocationMessage extends BaseMessage {
	location: Location
}
