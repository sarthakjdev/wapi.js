import { type Client } from "../../../client";
import { type VideoMessage } from "../../../structures";
import { MediaMessageEvent } from "../base";
import { type VideoMessageEventInterface } from "./interface";

/**
 * Represents a video message event.
 * @class VideoMessageEvent
 * @extends {MediaMessageEvent}
 * @implements {VideoMessageEventInterface}
 */
export class VideoMessageEvent
  extends MediaMessageEvent
  implements VideoMessageEventInterface
{
  /**
   * The video message associated with the event.
   * @type {VideoMessage}
   */
  video: VideoMessage;

  /**
   * Creates a new instance of VideoMessageEvent.
   * @constructor
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client instance.
   * @param {Object} params.data - The data for the event.
   * @param {VideoMessage} params.data.video - The video message.
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
      video: VideoMessage;
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
    this.video = params.data.video;
  }
}
