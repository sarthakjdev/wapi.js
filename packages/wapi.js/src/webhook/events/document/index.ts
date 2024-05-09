import { type Client } from "../../../client";
import { type DocumentMessage } from "../../../structures";
import { MediaMessageEvent } from "../base";
import { type DocumentMessageEventInterface } from "./interface";

/**
 * Represents an event that occurs when a document message is received.
 * @class
 * @extends {MediaMessageEvent}
 * @implements {DocumentMessageEventInterface}
 */
export class DocumentMessageEvent
  extends MediaMessageEvent
  implements DocumentMessageEventInterface
{
  /**
   * The document message associated with the event.
   */
  document: DocumentMessage;

  /**
   * Creates a new instance of DocumentMessageEvent.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client associated with the event.
   * @param {Object} params.data - The data associated with the event.
   * @param {DocumentMessage} params.data.document - The document message.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {string} params.data.mediaId - The ID of the media.
   * @param {string} params.data.mimeType - The MIME type of the document.
   * @param {string} params.data.sha256 - The SHA256 hash of the document.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      document: DocumentMessage;
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

    this.document = params.data.document;
    this.sha256 = params.data.sha256;
  }
}
