import { type VideoMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface VideoMessageEventInterface extends MediaMessageEventInterface {
	video: VideoMessage
}
