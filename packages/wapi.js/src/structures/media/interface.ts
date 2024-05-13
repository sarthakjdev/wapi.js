import { type z } from "zod";
import { type BaseMessageInterface } from "../message/interface";
import {
  type ExternalVideoMediaObjectType,
  type MetaVideoMediaObjectSchemaType,
  type ExternalAudioMediaObjectType,
  type MetaAudioMediaObjectSchemaType,
  type MetaStickerMediaObjectSchemaType,
  type ExternalStickerMediaObjectType,
  type MetaDocumentMediaObjectSchemaType,
  type ExternalDocumentMediaObjectSchemaType,
  type ExternalImageMediaObjectType,
  type MetaImageMediaObjectSchemaType,
} from "./schema";

/**
 * Enum representing the media types.
 * @enum {string}
 */
export enum MediaTypeEnum {
  Audio = "audio",
  Image = "image",
  Sticker = "sticker",
  Document = "document",
  Video = "video",
}

/**
 * Interface representing a media message.
 * @interface
 */
export interface MediaMessageInterface {
  type: MediaTypeEnum;
  fileName?: string;
  link?: string;
  id?: string;
  caption?: string;
}

/**
 * Interface representing an audio message.
 * @extends {BaseMessageInterface}
 * @interface
 */
export interface AudioMessageInterface extends BaseMessageInterface {
  data: z.infer<
    typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType
  >;
}

/**
 * Interface representing a video message.
 * @extends {BaseMessageInterface}
 * @interface
 */
export interface VideoMessageInterface extends BaseMessageInterface {
  data: z.infer<
    typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType
  >;
}

/**
 * Interface representing an image message.
 * @extends {BaseMessageInterface}
 * @interface
 */
export interface ImageMessageInterface extends BaseMessageInterface {
  data: z.infer<
    typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType
  >;
}

/**
 * Interface representing a sticker message.
 * @extends {BaseMessageInterface}
 * @interface
 */
export interface StickerMessageInterface extends BaseMessageInterface {
  data: z.infer<
    | typeof MetaStickerMediaObjectSchemaType
    | typeof ExternalStickerMediaObjectType
  >;
}

/**
 * Interface representing a document message.
 * @extends {BaseMessageInterface}
 * @interface
 */
export interface DocumentMessageInterface extends BaseMessageInterface {
  data: z.infer<
    | typeof MetaDocumentMediaObjectSchemaType
    | typeof ExternalDocumentMediaObjectSchemaType
  >;
}
