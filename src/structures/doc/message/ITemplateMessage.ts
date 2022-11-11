import { Message } from './IMessage'
import { Template } from '../template'

export interface TemplateMessage extends Message {
    template: Template
}
