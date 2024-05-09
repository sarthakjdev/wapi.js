import { type AudioMessage } from "../../../structures";
import { type MediaMessageEventInterface } from "../base/interface";

/**
 * Represents an audio message event.
 * @interface
 * @extends {MediaMessageEventInterface}
 */
export interface AudioMessageEventInterface extends MediaMessageEventInterface {
  /**
   * The audio message associated with the event.
   * @type {AudioMessage}
   */
  audio: AudioMessage;
}
