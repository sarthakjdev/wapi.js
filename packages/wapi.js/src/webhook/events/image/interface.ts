import { type ImageMessage } from "../../../structures";
import { type MediaMessageEventInterface } from "../base/interface";

/**
 * Represents an event interface for an image message.
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface ImageMessageEventInterface extends MediaMessageEventInterface {
  /**
   * The image message associated with the event.
   * @type {ImageMessage}
   */
  image: ImageMessage;
}
