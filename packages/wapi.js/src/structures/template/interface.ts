import { type BaseMessageInterface } from '../message/interface'
import { type LanguageEnum } from '../message/types'

/**
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface TemplateMessageInterface extends BaseMessageInterface {
	data: {
		templateName: string
		language: LanguageEnum
	}
}
