import { type Client } from "../../../client";
import { type ReactionMessage } from "../../../structures";
import { MessageEvent } from "../base";
import { type ReactionEventInterface } from "./interface";

/**
 * Represents a reaction event.
 * @class
 * @implements {ReactionEventInterface}
 * @extends {MessageEvent}
 */
export class ReactionEvent
  extends MessageEvent
  implements ReactionEventInterface
{
  /**
   * The reaction message associated with the event.
   */
  reaction: ReactionMessage;

  /**
   * Creates a new instance of ReactionEvent.
   * @param {Object} params - The parameters for creating the ReactionEvent.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {ReactionMessage} params.data.reaction - The reaction message.
   * @param {string} params.data.from - The sender of the reaction.
   * @param {string} params.data.id - The ID of the reaction event.
   * @param {string} params.data.timestamp - The timestamp of the reaction event.
   * @param {boolean} params.data.isForwarded - Indicates if the reaction event is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      reaction: ReactionMessage;
      from: string;
      id: string;
      timestamp: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      id: params.data.id,
      from: params.data.from,
      timestamp: params.data.timestamp,
      isForwarded: params.data.isForwarded,
    });

    this.reaction = params.data.reaction;
  }
}
