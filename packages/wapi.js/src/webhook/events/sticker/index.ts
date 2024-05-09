import { type Client } from "../../../client";
import { type StickerMessage } from "../../../structures";
import { MediaMessageEvent } from "../base";
import { type StickerMessageEventInterface } from "./interface";

/**
 * Represents a sticker message event.
 * @class
 * @extends {MediaMessageEvent}
 * @implements {StickerMessageEventInterface}
 */
export class StickerMessageEvent
  extends MediaMessageEvent
  implements StickerMessageEventInterface
{
  /**
   * The sticker message associated with the event.
   * @type {StickerMessage}
   */
  sticker: StickerMessage;

  /**
   * Creates a new StickerMessageEvent instance.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {StickerMessage} params.data.sticker - The sticker message.
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
      sticker: StickerMessage;
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
      sha256: params.data.sha256,
      mimeType: params.data.mimeType,
      isForwarded: params.data.isForwarded,
    });
    this.sticker = params.data.sticker;
  }
}
