import { type Client } from "../../../client";
import { type TextMessage } from "../../../structures";
import { MessageEvent } from "../base";
import { type TextMessageEventInterface } from "./interface";

/**
 * Represents a text message event.
 * @class TextMessageEvent
 * @implements {TextMessageEventInterface}
 * @extends {MessageEvent}
 */
export class TextMessageEvent
  extends MessageEvent
  implements TextMessageEventInterface
{
  /**
   * The text message associated with the event.
   * @type {TextMessage}
   */
  text: TextMessage;

  /**
   * Creates a new instance of TextMessageEvent.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {TextMessage} params.data.text - The text message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      messageId: string;
      text: TextMessage;
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
    this.text = params.data.text;
  }
}
