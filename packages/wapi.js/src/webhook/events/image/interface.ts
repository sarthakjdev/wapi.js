import { type ImageMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ImageMessageEventInterface extends MediaMessageEventInterface {
	image: ImageMessage
}
