import { type BaseMessage } from './IBaseMessage'
import { type Template } from '../template'

/**
 * template message
 * @interface
 * @extends BaseMessage
 * @export
 */
export interface TemplateMessage extends BaseMessage {
	template: Template
}
