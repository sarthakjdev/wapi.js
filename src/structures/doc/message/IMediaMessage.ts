import { Media } from '../IMedia'
import { Message } from './IMessage'

export interface MediaMessage extends Message {
    media: Media
}
