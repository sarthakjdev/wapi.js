import { type Client } from "../../../client";
import { MessageEvent } from "../base";
import {
  type ButtonReplyInteractionMessageEventInterface,
  type ListInteractionMessageEventInterface,
  type InteractionMessageEventInterface,
  type QuickReplyButtonInteractionEventInterface,
  type AdInteractionEventInterface,
  type AdInteractionSourceTypeEnum,
  type AdInteractionSourceMediaTypeEnum,
} from "./interface";

/**
 * Represents an interaction event.
 * @class
 * @extends {MessageEvent}
 * @implements {InteractionMessageEventInterface}
 */
export abstract class InteractionEvent
  extends MessageEvent
  implements InteractionMessageEventInterface
{
  /**
   * Creates a new instance of InteractionEvent.
   * @param {Object} params - The parameters for creating the InteractionEvent.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates whether the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      messageId: string;
      timestamp: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      id: params.data.messageId,
      from: params.data.from,
      timestamp: params.data.timestamp,
      isForwarded: params.data.isForwarded,
    });
  }
}

/**
 * Represents a list interaction event.
 * @class
 * @extends {InteractionEvent}
 * @implements {ListInteractionMessageEventInterface}
 */
export class ListInteractionEvent
  extends InteractionEvent
  implements ListInteractionMessageEventInterface
{
  title: string;
  listId: string;
  description: string;

  /**
   * Creates a new instance of ListInteractionEvent.
   * @param {Object} params - The parameters for creating the ListInteractionEvent.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {string} params.data.title - The title of the list.
   * @param {string} params.data.listId - The ID of the list.
   * @param {string} params.data.description - The description of the list.
   * @param {boolean} params.data.isForwarded - Indicates whether the message is forwarded.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      messageId: string;
      timestamp: string;
      title: string;
      listId: string;
      description: string;
      isForwarded: boolean;
    };
  }) {
    super({
      client: params.client,
      data: {
        from: params.data.from,
        messageId: params.data.messageId,
        timestamp: params.data.timestamp,
        isForwarded: params.data.isForwarded,
      },
    });

    this.title = params.data.title;
    this.listId = params.data.listId;
    this.description = params.data.description;
  }
}

/**
 * Represents a reply button interaction event.
 * @class
 * @extends {InteractionEvent}
 * @implements {ButtonReplyInteractionMessageEventInterface}
 */
export class ReplyButtonInteractionEvent
  extends InteractionEvent
  implements ButtonReplyInteractionMessageEventInterface
{
  title: string;
  buttonId: string;

  /**
   * Creates a new instance of ReplyButtonInteractionEvent.
   * @param {Object} params - The parameters for creating the ReplyButtonInteractionEvent.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates whether the message is forwarded.
   * @param {string} params.data.title - The title of the button.
   * @param {string} params.data.buttonId - The ID of the button.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      messageId: string;
      timestamp: string;
      isForwarded: boolean;
      title: string;
      buttonId: string;
    };
  }) {
    super({
      client: params.client,
      data: {
        messageId: params.data.messageId,
        from: params.data.from,
        timestamp: params.data.timestamp,
        isForwarded: params.data.isForwarded,
      },
    });

    this.title = params.data.title;
    this.buttonId = params.data.buttonId;
  }
}

/**
 * Represents a quick reply button interaction event.
 * @class QuickReplyButtonInteractionEvent
 * @extends {InteractionEvent}
 * @implements {QuickReplyButtonInteractionEventInterface}
 */
export class QuickReplyButtonInteractionEvent
  extends InteractionEvent
  implements QuickReplyButtonInteractionEventInterface
{
  button: { text: string; payload: string };

  /**
   * Creates a new instance of QuickReplyButtonInteractionEvent.
   * @param {Object} params - The parameters for creating the QuickReplyButtonInteractionEvent.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.messageId - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates whether the message is forwarded.
   * @param {string} params.data.buttonText - The text of the button.
   * @param {string} params.data.buttonPayload - The payload of the button.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      messageId: string;
      timestamp: string;
      isForwarded: boolean;
      buttonText: string;
      buttonPayload: string;
    };
  }) {
    super({
      client: params.client,
      data: {
        messageId: params.data.messageId,
        from: params.data.from,
        timestamp: params.data.timestamp,
        isForwarded: params.data.isForwarded,
      },
    });

    this.button = {
      payload: params.data.buttonPayload,
      text: params.data.buttonText,
    };
  }
}

/**
 * Represents an ad interaction event.
 * @class
 * @extends {MessageEvent}
 * @implements {AdInteractionEventInterface}
 */
export class AdInteractionEvent
  extends MessageEvent
  implements AdInteractionEventInterface
{
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

  /**
   * Creates a new instance of AdInteractionEvent.
   * @param {Object} params - The parameters for creating the AdInteractionEvent.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.id - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates whether the message is forwarded.
   * @param {string} params.data.text - The text of the ad.
   * @param {Object} params.data.source - The source of the ad.
   * @param {string} params.data.source.url - The URL of the ad.
   * @param {string} params.data.source.id - The ID of the ad.
   * @param {AdInteractionSourceTypeEnum} params.data.source.type - The type of the ad source.
   * @param {string} params.data.source.title - The title of the ad.
   * @param {string} params.data.source.description - The description of the ad.
   * @param {string} params.data.source.mediaUrl - The media URL of the ad.
   * @param {AdInteractionSourceMediaTypeEnum} params.data.source.mediaType - The media type of the ad source.
   * @param {string} params.data.source.thumbnailUrl - The thumbnail URL of the ad.
   * @param {string} params.data.source.ctwaClid - The CTW CLID of the ad.
   */
  constructor(params: {
    client: Client;
    data: {
      from: string;
      id: string;
      timestamp: string;
      isForwarded: boolean;
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
    };
  }) {
    super({
      client: params.client,
      id: params.data.id,
      from: params.data.from,
      timestamp: params.data.timestamp,
      isForwarded: params.data.isForwarded,
    });

    this.text = params.data.text;
    this.source = params.data.source;
  }
}
