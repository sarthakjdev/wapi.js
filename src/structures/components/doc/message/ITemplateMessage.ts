import { BaseMessage } from './IBaseMessage'
import { Template } from '../template'

/**
 * template message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface TemplateMessage extends BaseMessage {
    template: Template
}
