import { type StickerMessage } from '../../../structures'
import { type MediaMessageEventInterface } from '../base/interface'

/**
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface StickerMessageEventInterface extends MediaMessageEventInterface {
	sticker: StickerMessage
}
