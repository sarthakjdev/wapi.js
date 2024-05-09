import { type MessageEventInterface } from "../base/interface";

/**
 * Represents an interaction message event.
 * @extends {MessageEventInterface}
 */
export type InteractionMessageEventInterface = MessageEventInterface;

/**
 * Represents a list interaction message event.
 * @interface ListInteractionMessageEventInterface
 * @extends {InteractionMessageEventInterface}
 */
export interface ListInteractionMessageEventInterface
  extends InteractionMessageEventInterface {
  listId: string;
  title: string;
  description: string;
}

/**
 * Represents a button reply interaction message event.
 * @interface ButtonReplyInteractionMessageEventInterface
 * @extends {InteractionMessageEventInterface}
 */
export interface ButtonReplyInteractionMessageEventInterface
  extends InteractionMessageEventInterface {
  buttonId: string;
  title: string;
}

/**
 * Represents a quick reply button interaction event.
 * @interface QuickReplyButtonInteractionEventInterface
 * @extends {InteractionMessageEventInterface}
 */
export interface QuickReplyButtonInteractionEventInterface
  extends InteractionMessageEventInterface {
  button: {
    text: string;
    payload: string;
  };
}

/**
 * Represents an ad interaction source type.
 * @enum
 */
export enum AdInteractionSourceTypeEnum {
  Ad = "ad",
  Post = "post",
}

/**
 * Represents an ad interaction source media type.
 * @enum
 */
export enum AdInteractionSourceMediaTypeEnum {
  Image = "image",
  Video = "video",
}

/**
 * Represents an ad interaction event.
 * @interface
 * @extends {InteractionMessageEventInterface}
 */
export interface AdInteractionEventInterface
  extends InteractionMessageEventInterface {
  text: string;
  source: {
    url: string;
    id: string;
    type: AdInteractionSourceTypeEnum;
    title: string;
    description: string;
    mediaUrl?: string;
    mediaType: AdInteractionSourceMediaTypeEnum;
    thumbnailUrl: string;
    ctwaClid: string;
  };
}
