import { type BaseMessageInterface } from "../message/interface";

/**
 * Represents the interface for a reaction message.
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface ReactionMessageInterface extends BaseMessageInterface {
  data: {
    /**
     * The ID of the message.
     */
    messageId: string;
    /**
     * The emoji associated with the reaction.
     */
    emoji: string;
  };
}
