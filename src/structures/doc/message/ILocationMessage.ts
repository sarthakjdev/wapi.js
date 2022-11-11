import { Location } from '../ILocation'
import { Message } from './IMessage'

export interface LocationMessage extends Message {
    location: Location
}
