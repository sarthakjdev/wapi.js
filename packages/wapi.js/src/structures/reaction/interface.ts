import { type BaseMessageInterface } from '../message/interface'

export interface ReactionMessageInterface extends BaseMessageInterface {
    data: {
        messageId: string,
        emoji: string
    }

}
