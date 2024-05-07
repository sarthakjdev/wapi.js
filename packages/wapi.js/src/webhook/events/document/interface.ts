import { type DocumentMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * Represents an event interface for a document message.
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface DocumentMessageEventInterface extends MediaMessageEventInterface {
	/**
	 * The document message associated with the event.
	 * @type {DocumentMessage}
	 */
	document: DocumentMessage
}
