import { type Client } from "../../../client";
import { type ContactMessage } from "../../../structures";
import { MessageEvent } from "../base";
import { type ContactMessageEventInterface } from "./interface";

/**
 * Represents an event that occurs when a contact message is received.
 * @class
 * @extends {MessageEvent}
 * @implements {ContactMessageEventInterface}
 */
export class ContactMessageEvent
  extends MessageEvent
  implements ContactMessageEventInterface
{
  /**
   * The contact message associated with this event.
   * @type {ContactMessage}
   * @memberof ContactMessageEvent
   */
  contact: ContactMessage;

  /**
   * Creates a new instance of ContactMessageEvent.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {ContactMessage} params.data.contact - The contact message.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates whether the message was forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      contact: ContactMessage;
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
    this.contact = params.data.contact;
  }
}
