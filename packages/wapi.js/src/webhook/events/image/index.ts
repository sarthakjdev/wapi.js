import { type Client } from "../../../client";
import { type ImageMessage } from "../../../structures";
import { MediaMessageEvent } from "../base";
import { type ImageMessageEventInterface } from "./interface";

/**
 * Represents an event for receiving an image message.
 * @class
 * @extends {MediaMessageEvent}
 * @implements {ImageMessageEventInterface}
 */
export class ImageMessageEvent
  extends MediaMessageEvent
  implements ImageMessageEventInterface
{
  /**
   * The image message received in the event.
   */
  image: ImageMessage;

  /**
   * Creates a new instance of ImageMessageEvent.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {ImageMessage} params.data.image - The image message received.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {string} params.data.mediaId - The ID of the media.
   * @param {string} params.data.mimeType - The MIME type of the media.
   * @param {string} params.data.sha256 - The SHA256 hash of the media.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      image: ImageMessage;
      from: string;
      messageId: string;
      timestamp: string;
      mediaId: string;
      mimeType: string;
      sha256: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      messageId: params.data.messageId,
      from: params.data.from,
      timestamp: params.data.timestamp,
      mediaId: params.data.mediaId,
      mimeType: params.data.mimeType,
      sha256: params.data.sha256,
      isForwarded: params.data.isForwarded,
    });
    this.image = params.data.image;
  }
}
