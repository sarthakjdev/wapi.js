import { type Client } from "../../../client";
import { type LocationMessage } from "../../../structures";
import { MessageEvent } from "../base";
import { type LocationMessageEventInterface } from "./interface";

/**
 * Represents a location message event.
 * @class
 * @extends {MessageEvent}
 * @implements {LocationMessageEventInterface}
 */
export class LocationMessageEvent
  extends MessageEvent
  implements LocationMessageEventInterface
{
  /**
   * The location message associated with the event.
   */
  location: LocationMessage;

  /**
   * Creates a new LocationMessageEvent instance.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {LocationMessage} params.data.location - The location message.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      location: LocationMessage;
      from: string;
      messageId: string;
      timestamp: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      id: params.data.messageId,
      from: params.data.from,
      timestamp: params.data.timestamp,
      isForwarded: params.data.isForwarded,
    });
    this.location = params.data.location;
  }
}
