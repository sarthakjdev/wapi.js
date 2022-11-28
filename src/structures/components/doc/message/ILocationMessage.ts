import { Location } from '../ILocation'
import { BaseMessage } from './IBaseMessage'

/**
 * location message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface LocationMessage extends BaseMessage {
    location: Location
}
