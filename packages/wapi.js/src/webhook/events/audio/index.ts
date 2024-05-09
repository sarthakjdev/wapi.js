import { type Client } from "../../../client";
import { type AudioMessage } from "../../../structures";
import { MediaMessageEvent } from "../base";
import { type AudioMessageEventInterface } from "./interface";

/**
 * Represents an event for an audio message.
 * @class
 * @extends {MediaMessageEvent}
 * @implements {AudioMessageEventInterface}
 */
export class AudioMessageEvent
  extends MediaMessageEvent
  implements AudioMessageEventInterface
{
  audio: AudioMessage;

  /**
   * Creates a new instance of AudioMessageEvent.
   * @constructor
   * @memberof AudioMessageEvent
   * @param {Object} params - The parameters for creating the AudioMessageEvent.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {AudioMessage} params.data.audio - The audio message.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {string} params.data.mimeType - The MIME type of the audio.
   * @param {string} params.data.sha256 - The SHA256 hash of the audio.
   * @param {string} params.data.mediaId - The ID of the media.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      audio: AudioMessage;
      from: string;
      messageId: string;
      timestamp: string;
      mimeType: string;
      sha256: string;
      mediaId: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      messageId: params.data.messageId,
      from: params.data.from,
      timestamp: params.data.timestamp,
      mimeType: params.data.mimeType,
      sha256: params.data.sha256,
      mediaId: params.data.mediaId,
      isForwarded: params.data.isForwarded,
    });
    this.audio = params.data.audio;
  }
}
