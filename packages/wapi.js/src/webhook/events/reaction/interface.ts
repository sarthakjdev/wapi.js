import { type ReactionMessage } from "../../../structures";
import { type MessageEventInterface } from "../base/interface";

/**
 * Represents the interface for a reaction event.
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ReactionEventInterface extends MessageEventInterface {
  /**
   * The reaction message associated with the event.
   * @type {ReactionMessage}
   */
  reaction: ReactionMessage;
}
