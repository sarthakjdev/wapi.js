import { type AudioMessage } from '../../../structures'
import { type MessageEvent } from '../base'

export interface AudioMessageEventInterface extends MessageEvent {
	audio: AudioMessage
}
