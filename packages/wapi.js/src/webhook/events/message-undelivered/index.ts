import { type Client } from "../../../client";
import { StatusUpdateEvent } from "../base/index";
import { type MessageUndeliveredEventInterface } from "./interface";

/**
 * Represents a message undelivered event.
 * This event occurs when a message fails to be delivered to the recipient.
 * @class MessageUndeliveredEvent
 * @extends {StatusUpdateEvent}
 * @implements {MessageUndeliveredEventInterface}
 */
export class MessageUndeliveredEvent
  extends StatusUpdateEvent
  implements MessageUndeliveredEventInterface
{
  /**
   * Creates a new instance of the MessageUndeliveredEvent class.
   * @param params - The parameters for creating the event.
   * @param params.client - The client instance.
   * @param params.data - The data for the event.
   * @param params.data.from - The sender of the undelivered message.
   * @param params.data.timestamp - The timestamp of the undelivered message.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      timestamp: string;
    };
  }) {
    super({
      client: params.client,
      from: params.data.from,
      timestamp: params.data.timestamp,
    });
  }
}
