import { type VideoMessage } from "../../../structures";
import { type MediaMessageEventInterface } from "../base/interface";

/**
 * Represents an event interface for a video message.
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface VideoMessageEventInterface extends MediaMessageEventInterface {
  /**
   * The video message associated with the event.
   * @type {VideoMessage}
   */
  video: VideoMessage;
}
