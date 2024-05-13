import { type z } from "zod";
import {
  type ImageMessageInterface,
  type AudioMessageInterface,
  type VideoMessageInterface,
  type StickerMessageInterface,
  type DocumentMessageInterface,
} from "./interface";
import {
  MetaAudioMediaObjectSchemaType,
  ExternalAudioMediaObjectType,
  type ExternalVideoMediaObjectType,
  type MetaVideoMediaObjectSchemaType,
  type MetaImageMediaObjectSchemaType,
  type ExternalImageMediaObjectType,
  type ExternalDocumentMediaObjectSchemaType,
  type MetaDocumentMediaObjectSchemaType,
  type ExternalStickerMediaObjectType,
  type MetaStickerMediaObjectSchemaType,
} from "./schema";
import { BaseMessage } from "../message";
import { MessageTypeEnum } from "../message/types";
import { type WhatsappCloudApiRequestPayloadSchemaType } from "../../api-request-payload-schema";

/**
 * Represents an audio message.
 * @extends {BaseMessage<MessageTypeEnum.Audio>}
 * @implements {AudioMessageInterface}
 * @class
 */
export class AudioMessage
  extends BaseMessage<MessageTypeEnum.Audio>
  implements AudioMessageInterface {
  data: z.infer<
    typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType
  >;

  private readonly _constructorPayloadSchema = MetaAudioMediaObjectSchemaType.or(ExternalAudioMediaObjectType)

  /**
   * Creates a new instance of the AudioMessage class.
   * @constructor
   * @memberof AudioMessage
   * @param {z.infer<typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType>} params - The parameters to initialize the audio message.
   */
  constructor(
    params: z.infer<
      | typeof MetaAudioMediaObjectSchemaType
      | typeof ExternalAudioMediaObjectType
    >,
  ) {
    super({ type: MessageTypeEnum.Audio });
    this.parseConstructorPayload(this._constructorPayloadSchema, params)
    this.data = params;
  }

  /**
   * Converts the audio message to the WhatsApp Cloud API payload.
   * @memberof AudioMessage
   * @param {Object} params - The parameters for the WhatsApp Cloud API payload.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
   * @returns {Object} - The WhatsApp Cloud API payload for the audio message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Audio }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      type: MessageTypeEnum.Audio,
      to: params.to,
      messaging_product: this.messaging_product,
      recipient_type: this.recipient_type,
      audio: {
        ...("id" in this.data
          ? { id: this.data.id }
          : { link: this.data.link }),
      },
    };
  }
}

/**
 * Represents a video message.
 * @extends {BaseMessage<MessageTypeEnum.Video>}
 * @implements {VideoMessageInterface}
 * @class
 */
export class VideoMessage
  extends BaseMessage<MessageTypeEnum.Video>
  implements VideoMessageInterface {
  data: z.infer<
    typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType
  >;

  /**
   * Creates a new instance of the VideoMessage class.
   * @constructor
   * @memberof VideoMessage
   * @param {z.infer<typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType>} params - The parameters to initialize the video message.
   */
  constructor(
    params: z.infer<
      | typeof MetaVideoMediaObjectSchemaType
      | typeof ExternalVideoMediaObjectType
    >,
  ) {
    super({ type: MessageTypeEnum.Video });
    this.data = params;
  }

  /**
   * Converts the video message to the WhatsApp Cloud API payload.
   * @memberof VideoMessage
   * @param {Object} params - The parameters for the WhatsApp Cloud API payload.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
   * @returns {Object} - The WhatsApp Cloud API payload for the video message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Video }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      type: MessageTypeEnum.Video,
      to: params.to,
      messaging_product: this.messaging_product,
      recipient_type: this.recipient_type,
      video: {
        ...("id" in this.data
          ? { id: this.data.id }
          : { link: this.data.link }),
        caption: this.data.caption,
      },
    };
  }
}

/**
 * Represents an image message.
 * @extends {BaseMessage<MessageTypeEnum.Image>}
 * @implements {ImageMessageInterface}
 * @class
 */
export class ImageMessage
  extends BaseMessage<MessageTypeEnum.Image>
  implements ImageMessageInterface {
  data: z.infer<
    typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType
  >;

  /**
   * Creates a new instance of the ImageMessage class.
   * @constructor
   * @memberof ImageMessage
   * @param {z.infer<typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType>} params - The parameters to initialize the image message.
   */
  constructor(
    params: z.infer<
      | typeof MetaImageMediaObjectSchemaType
      | typeof ExternalImageMediaObjectType
    >,
  ) {
    super({ type: MessageTypeEnum.Image });
    this.data = params;
  }

  /**
   * Converts the image message to the WhatsApp Cloud API payload.
   * @memberof ImageMessage
   * @param {Object} params - The parameters for the WhatsApp Cloud API payload.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
   * @returns {Object} - The WhatsApp Cloud API payload for the image message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Image }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      type: MessageTypeEnum.Image,
      to: params.to,
      messaging_product: this.messaging_product,
      recipient_type: this.recipient_type,
      image: {
        ...("id" in this.data
          ? { id: this.data.id }
          : { link: this.data.link }),
        caption: this.data.caption,
      },
    };
  }
}

/**
 * Represents a sticker message.
 * @extends {BaseMessage<MessageTypeEnum.Sticker>}
 * @implements {StickerMessageInterface}
 * @class
 */
export class StickerMessage
  extends BaseMessage<MessageTypeEnum.Sticker>
  implements StickerMessageInterface {
  data: z.infer<
    | typeof MetaStickerMediaObjectSchemaType
    | typeof ExternalStickerMediaObjectType
  >;

  /**
   * Creates a new instance of the StickerMessage class.
   * @constructor
   * @memberof StickerMessage
   * @param {z.infer<typeof MetaStickerMediaObjectSchemaType | typeof ExternalStickerMediaObjectType>} params - The parameters to initialize the sticker message.
   */
  constructor(
    params: z.infer<
      | typeof MetaStickerMediaObjectSchemaType
      | typeof ExternalStickerMediaObjectType
    >,
  ) {
    super({ type: MessageTypeEnum.Sticker });
    this.data = params;
  }

  /**
   * Converts the sticker message to the WhatsApp Cloud API payload.
   * @memberof StickerMessage
   * @param {Object} params - The parameters for the WhatsApp Cloud API payload.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
   * @returns {Object} - The WhatsApp Cloud API payload for the sticker message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Sticker }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      type: MessageTypeEnum.Sticker,
      to: params.to,
      messaging_product: this.messaging_product,
      recipient_type: this.recipient_type,
      sticker: {
        ...("id" in this.data
          ? { id: this.data.id }
          : { link: this.data.link }),
      },
    };
  }
}

/**
 * Represents a document message.
 * @extends {BaseMessage<MessageTypeEnum.Document>}
 * @implements {DocumentMessageInterface}
 * @class
 */
export class DocumentMessage
  extends BaseMessage<MessageTypeEnum.Document>
  implements DocumentMessageInterface {
  data: z.infer<
    | typeof MetaDocumentMediaObjectSchemaType
    | typeof ExternalDocumentMediaObjectSchemaType
  >;

  /**
   * Creates a new instance of the DocumentMessage class.
   * @constructor
   * @memberof DocumentMessage
   * @param {z.infer<typeof MetaDocumentMediaObjectSchemaType | typeof ExternalDocumentMediaObjectSchemaType>} params - The parameters to initialize the document message.
   */
  constructor(
    params: z.infer<
      | typeof MetaDocumentMediaObjectSchemaType
      | typeof ExternalDocumentMediaObjectSchemaType
    >,
  ) {
    super({ type: MessageTypeEnum.Document });
    this.data = params;
  }

  /**
   * Converts the document message to the WhatsApp Cloud API payload.
   * @memberof DocumentMessage
   * @param {Object} params - The parameters for the WhatsApp Cloud API payload.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message being replied to.
   * @returns {Object} - The WhatsApp Cloud API payload for the document message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Document }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      type: MessageTypeEnum.Document,
      to: params.to,
      messaging_product: this.messaging_product,
      recipient_type: this.recipient_type,
      document: {
        ...("id" in this.data
          ? { id: this.data.id }
          : { link: this.data.link }),
        caption: this.data.caption,
        filename: this.data.filename,
      },
    };
  }
}
