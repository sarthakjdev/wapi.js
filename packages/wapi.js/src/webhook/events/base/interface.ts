import { type Client } from "../../../client";

/**
 * Represents the context of a message.
 */
export type MessageContext = {
  from: string;
};

/**
 * Represents the base interface for all events.
 * @interface BaseEventInterface
 */
export interface BaseEventInterface {
  /**
   * The client instance associated with the event.
   */
  client: Client;
}

/**
 * Represents the interface for a message event.
 * @interface MessageEventInterface
 * @extends {BaseEventInterface}
 */
export interface MessageEventInterface extends BaseEventInterface {
  /**
   * The ID of the message.
   */
  messageId: string;
  /**
   * The context of the message.
   * @type {MessageContext}
   */
  context: MessageContext;
  /**
   * The timestamp of the message.
   */
  timestamp: number;
}

/**
 * Represents the interface for a media message event.
 * @interface MediaMessageEventInterface
 * @extends {MessageEventInterface}
 */
export interface MediaMessageEventInterface extends MessageEventInterface {
  /**
   * The ID of the media.
   */
  mediaId: string;
  /**
   * The MIME type of the media.
   */
  mimeType: string;
  /**
   * The SHA256 hash of the media.
   */
  sha256: string;
  /**
   * A function that returns the URL of the media.
   * @returns {Promise<string>} - A promise that resolves with the URL of the media.
   */
  getUrl: () => Promise<string>;
}

/**
 * Represents the interface for a status update event.
 * @interface StatusUpdateEventInterface
 * @extends {BaseEventInterface}
 */
export interface StatusUpdateEventInterface extends BaseEventInterface {
  /**
   * The context of the status update.
   * @type {MessageContext}
   */
  context: MessageContext;
  /**
   * The timestamp of the status update.
   */
  timestamp: number;
}
