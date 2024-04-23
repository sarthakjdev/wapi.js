import { type AudioMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface AudioMessageEventInterface extends MediaMessageEventInterface {
	audio: AudioMessage
}
