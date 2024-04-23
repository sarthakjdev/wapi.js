import { type DocumentMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface DocumentMessageEventInterface extends MediaMessageEventInterface {
	document: DocumentMessage
}
