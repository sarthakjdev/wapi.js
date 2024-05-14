import { z } from "zod";
import { type Client } from "../../../client";
import { WapiMessageResponseSchemaType } from "../../../client/schema";
import { ReactionMessage } from "../../../structures";
import { type BaseMessage } from "../../../structures/message";
import {
  type MessageEventInterface,
  type BaseEventInterface,
  type StatusUpdateEventInterface,
  type MessageContext,
  type MediaMessageEventInterface,
} from "./interface";

/**
 * Represents the base event for webhook events.
 * @class
 * @implements {BaseEventInterface}
 */
export class BaseEvent implements BaseEventInterface {
  client: Client;
  constructor(params: { client: Client }) {
    this.client = params.client;
  }
}

/**
 * Represents the message event for webhook events.
 * @class
 * @extends {BaseEvent}
 * @implements {MessageEventInterface}
 */
export abstract class MessageEvent
  extends BaseEvent
  implements MessageEventInterface {
  messageId: string;
  context: MessageContext;
  timestamp: number;
  isForwarded: boolean;

  /**
   * Creates a new instance of the MessageEvent class.
   * @constructor
   * @memberof MessageEvent
   * @param {Object} params - The parameters for creating the MessageEvent.
   * @param {Client} params.client - The client instance.
   * @param {string} params.id - The message ID.
   * @param {string} params.from - The sender's phone number.
   * @param {string} params.timestamp - The timestamp of the message.
   * @param {boolean} params.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    id: string;
    from: string;
    timestamp: string;
    isForwarded: boolean;
  }) {
    super({ client: params.client });
    this.messageId = params.id;
    this.timestamp = Number(params.timestamp);
    this.context = {
      from: params.from,
    };
    this.isForwarded = params.isForwarded;
  }

  /**
   * Sends a reply to the message.
   * @param {Object} props - The properties for the reply.
   * @param {BaseMessage<string>} props.message - The message to send as a reply.
   * @returns {Promise<void>} - A promise that resolves when the reply is sent.
   * @throws {Error} - If the context message ID is not found.
   */
  async reply<T extends BaseMessage<string>>(props: {
    message: T;
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>> {
    if (!this.context.from) {
      throw new Error(
        "No context message id found while replying to message!!",
      );
    }

    const response = await this.client.message.reply({
      message: props.message,
      phoneNumber: this.context.from,
      replyToMessageId: this.messageId,
    });

    return response;
  }

  /**
   * Reacts to the message with an emoji.
   * @param {Object} params - The parameters for the reaction.
   * @param {string} params.emoji - The emoji to react with.
   * @param {string} params.phoneNumber - The phone number of the sender.
   * @returns {Promise<any>} - A promise that resolves with the reaction response.
   */
  async react(params: { emoji: string; phoneNumber: string }) {
    const reactionMessage = new ReactionMessage({
      emoji: params.emoji,
      messageId: this.messageId,
    });

    // inject the context here this time
    const replyResponse = await this.client.message.reply({
      message: reactionMessage,
      phoneNumber: this.context.from,
      replyToMessageId: this.messageId,
    });

    return replyResponse;
  }

  /**
   * Marks the message as read.
   * @memberof MessageEvent
   * @returns {Promise<any>} - A promise that resolves with the read response.
   */
  async read() {
    const response = await this.client.requester.requestCloudApi({
      path: `/${this.client.phoneNumberId}/messages`,
      body: JSON.stringify({
        messaging_product: "whatsapp",
        status: "read",
        message_id: this.messageId,
      }),
      method: "POST",
    });

    // ! TODO: here return a boolean may be @sarthakjdev
    return response;
  }
}

/**
 * Represents the media message event for webhook events.
 * @class
 * @extends {MessageEvent}
 * @implements {MediaMessageEventInterface}
 */
export abstract class MediaMessageEvent
  extends MessageEvent
  implements MediaMessageEventInterface {
  mediaId: string;
  mimeType: string;
  sha256: string;

  /**
   * Creates a new instance of the MediaMessageEvent class.
   * @constructor
   * @memberof MediaMessageEvent
   * @param {Object} params - The parameters for creating the MediaMessageEvent.
   * @param {Client} params.client - The client instance.
   * @param {string} params.from - The sender's phone number.
   * @param {string} params.messageId - The message ID.
   * @param {string} params.timestamp - The timestamp of the message.
   * @param {string} params.mediaId - The ID of the media.
   * @param {string} params.mimeType - The MIME type of the media.
   * @param {string} params.sha256 - The SHA256 hash of the media.
   * @param {boolean} params.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    from: string;
    messageId: string;
    timestamp: string;
    mediaId: string;
    mimeType: string;
    sha256: string;
    isForwarded: boolean;
  }) {
    super({
      client: params.client,
      from: params.from,
      id: params.messageId,
      timestamp: params.timestamp,
      isForwarded: params.isForwarded,
    });
    this.mediaId = params.mediaId;
    this.mimeType = params.mimeType;
    this.sha256 = params.sha256;
  }

  /**
   * Gets the URL of the media.
   * @returns {Promise<string>} - A promise that resolves with the URL of the media.
   */
  async getUrl() {
    const response = await this.client.media.getUrl(this.mediaId);
    return response.url;
  }
}

/**
 * Represents the status update event for webhook events.
 * @class
 * @extends {BaseEvent}
 * @implements {StatusUpdateEventInterface}
 */
export abstract class StatusUpdateEvent
  extends BaseEvent
  implements StatusUpdateEventInterface {
  context: MessageContext;
  timestamp: number;

  /**
   * Creates a new instance of the StatusUpdateEvent class.
   * @constructor
   * @memberof StatusUpdateEvent
   * @param {Object} params - The parameters for creating the StatusUpdateEvent.
   * @param {Client} params.client - The client instance.
   * @param {string} params.from - The sender's phone number.
   * @param {string} params.timestamp - The timestamp of the status update.
   */
  constructor(params: { client: Client; from: string; timestamp: string }) {
    super({ client: params.client });
    this.timestamp = Number(params.timestamp);
    this.context = {
      from: params.from,
    };
  }
}
