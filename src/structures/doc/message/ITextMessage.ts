import { Message } from './IMessage'
import { Text } from '../IText'

export interface TextMessage extends Message {
    text: Text
}
