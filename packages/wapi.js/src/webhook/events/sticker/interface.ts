import { type StickerMessage } from "../../../structures";
import { type MediaMessageEventInterface } from "../base/interface";

/**
 * Represents an event interface for a sticker message.
 * @interface StickerMessageEventInterface
 * @extends {MediaMessageEventInterface}
 */
export interface StickerMessageEventInterface
  extends MediaMessageEventInterface {
  /**
   * The sticker message associated with the event.
   * @type {StickerMessage}
   */
  sticker: StickerMessage;
}
