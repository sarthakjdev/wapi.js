import { z } from "zod";
import {
  type ButtonInteractionMessageInterface,
  InteractiveMessageTypeEnum,
  type InteractiveMessageInterface,
  type ListInteractionMessageInterface,
} from "./interface";
import { MessageTypeEnum } from "../message/types";
import { BaseMessage } from "../message";
import {
  type InteractiveMessageApiPayloadSchemaType,
  type ButtonInteractiveMessagePayload,
  type ListInteractiveMessagePayload,
  ListInteractiveMessageSection,
} from "../../api-request-payload-schema";
import {
  HeaderTypeEnum,
  type InteractiveMessageHeaderSchemaType,
} from "./schema";

/**
 * Represents an interactive message.
 * @extends {BaseMessage}
 * @implements {InteractiveMessageInterface}
 * @abstract
 */
export abstract class InteractiveMessage
  extends BaseMessage<MessageTypeEnum.Interactive>
  implements InteractiveMessageInterface
{
  readonly interactiveMessageData: {
    type: InteractiveMessageTypeEnum;
    footerText?: string;
    bodyText: string;
    header?: z.infer<typeof InteractiveMessageHeaderSchemaType>;
  };

  /**
   * Creates an instance of InteractiveMessage.
   * @constructor
   * @memberof InteractiveMessage
   * @param {Object} params - The parameters for creating the interactive message.
   * @param {InteractiveMessageTypeEnum} params.type - The type of the interactive message.
   * @param {string} [params.footerText] - The footer text of the interactive message.
   * @param {string} params.bodyText - The body text of the interactive message.
   */
  constructor(params: {
    type: InteractiveMessageTypeEnum;
    footerText?: string;
    bodyText: string;
  }) {
    super({ type: MessageTypeEnum.Interactive });
    this.interactiveMessageData = {
      type: params.type,
      footerText: params.footerText,
      bodyText: params.bodyText,
    };
  }
}

/**
 * Represents a button interaction message.
 * @extends {InteractiveMessage}
 * @implements {ButtonInteractionMessageInterface}
 * @class
 */
export class ButtonInteractionMessage
  extends InteractiveMessage
  implements ButtonInteractionMessageInterface
{
  data: {
    buttons: { id: string; title: string }[];
  };

  /**
   * Creates an instance of ButtonInteractionMessage.
   * @constructor
   * @memberof ButtonInteractionMessage
   * @param {Object} params - The parameters for creating the button interaction message.
   * @param {Array<{ id: string; title: string }>} params.buttons - The buttons of the message.
   * @param {string} [params.footerText] - The footer text of the message.
   * @param {string} params.bodyText - The body text of the message.
   */
  constructor(params: {
    buttons: { id: string; title: string }[];
    footerText?: string;
    bodyText: string;
  }) {
    super({
      type: InteractiveMessageTypeEnum.Button,
      footerText: params.footerText,
      bodyText: params.bodyText,
    });
    this.data = {
      buttons: params.buttons,
    };
  }

  /**
   * Adds a header to the message.
   */
  addHeader() {}

  /**
   * Adds a footer to the message.
   * @param {string} footerText - The footer text to be added.
   */
  addFooter(footerText: string) {
    this.interactiveMessageData.footerText = footerText;
  }

  /**
   * Converts the message to JSON format.
   * @memberof ButtonInteractionMessage
   * @param {Object} params - The parameters for converting the message to JSON.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
   * @returns {Object} The JSON representation of the message.
   */
  toJson(params: { to: string; replyToMessageId?: string }): z.infer<
    typeof InteractiveMessageApiPayloadSchemaType
  > & {
    interactive: z.infer<typeof ButtonInteractiveMessagePayload>;
  } {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      to: params.to,
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: MessageTypeEnum.Interactive,
      interactive: {
        action: {
          buttons: this.data.buttons.map((btn) => ({
            reply: {
              id: btn.id,
              title: btn.title,
            },
            type: "reply",
          })),
        },
        body: {
          text: this.interactiveMessageData.bodyText,
        },
        ...(this.interactiveMessageData.header
          ? {
              header: {
                ...(this.interactiveMessageData.header.type ===
                HeaderTypeEnum.Text
                  ? {
                      type: HeaderTypeEnum.Text,
                      text: this.interactiveMessageData.header.text,
                    }
                  : this.interactiveMessageData.header.type ===
                      HeaderTypeEnum.Document
                    ? {
                        type: HeaderTypeEnum.Document,
                        document: this.interactiveMessageData.header.document,
                      }
                    : this.interactiveMessageData.header.type ===
                        HeaderTypeEnum.Image
                      ? {
                          type: HeaderTypeEnum.Image,
                          image: this.interactiveMessageData.header.image,
                        }
                      : {
                          type: HeaderTypeEnum.Video,
                          video: this.interactiveMessageData.header.video,
                        }),
              },
            }
          : {}),
        type: InteractiveMessageTypeEnum.Button,
      },
    };
  }
}

/**
 * Represents a list interaction message.
 * @class
 * @implements {ListInteractionMessageInterface}
 * @extends {InteractiveMessage}
 */
export class ListInteractionMessage
  extends InteractiveMessage
  implements ListInteractionMessageInterface
{
  data: {
    buttonText: string;
    sections: z.infer<typeof ListInteractiveMessageSection>[];
  };

  private readonly _constructorPayloadSchema = z.object({
    buttonText: z.string(),
    footerText: z.string().optional(),
    bodyText: z.string(),
    sections: ListInteractiveMessageSection.array().max(10).min(1),
  });

  /**
   * Creates an instance of ListInteractionMessage.
   * @constructor
   * @memberof ListInteractionMessage
   * @param {Object} params - The parameters for creating the list interaction message.
   * @param {string} params.buttonText - The button text of the message.
   * @param {string} [params.footerText] - The footer text of the message.
   * @param {string} params.bodyText - The body text of the message.
   * @param {Array} params.sections - The sections of the message.
   */
  constructor(params: {
    buttonText: string;
    footerText?: string;
    bodyText: string;
    sections: z.infer<typeof ListInteractiveMessageSection>[];
  }) {
    super({
      type: InteractiveMessageTypeEnum.Button,
      footerText: params.footerText,
      bodyText: params.bodyText,
    });
    this.parseConstructorPayload(this._constructorPayloadSchema, params);
    this.data = {
      buttonText: params.buttonText,
      sections: params.sections,
    };
  }

  /**
   * Adds a section to the message.
   * @param {Object} section - The section to be added.
   */
  addSection(section: z.infer<typeof ListInteractiveMessageSection>) {
    this.data.sections.push(section);
  }

  /**
   * Adds a header to the message.
   */
  addHeader() {}

  /**
   * Adds a footer to the message.
   * @param {string} footerText - The footer text to be added.
   */
  addFooter(footerText: string) {
    this.interactiveMessageData.footerText = footerText;
  }

  /**
   * Converts the message to JSON format.
   * @memberof ListInteractionMessage
   * @param {Object} params - The parameters for converting the message to JSON.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
   * @returns {Object} The JSON representation of the message.
   */
  toJson(params: { to: string; replyToMessageId?: string }): z.infer<
    typeof InteractiveMessageApiPayloadSchemaType
  > & {
    interactive: z.infer<typeof ListInteractiveMessagePayload>;
  } {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      to: params.to,
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: MessageTypeEnum.Interactive,
      interactive: {
        type: InteractiveMessageTypeEnum.List,
        action: {
          button: this.data.buttonText,
          sections: this.data.sections,
        },
        body: {
          text: this.interactiveMessageData.bodyText,
        },
        ...(this.interactiveMessageData.header
          ? {
              header: {
                ...(this.interactiveMessageData.header.type ===
                HeaderTypeEnum.Text
                  ? {
                      type: HeaderTypeEnum.Text,
                      text: this.interactiveMessageData.header.text,
                    }
                  : this.interactiveMessageData.header.type ===
                      HeaderTypeEnum.Document
                    ? {
                        type: HeaderTypeEnum.Document,
                        document: this.interactiveMessageData.header.document,
                      }
                    : this.interactiveMessageData.header.type ===
                        HeaderTypeEnum.Image
                      ? {
                          type: HeaderTypeEnum.Image,
                          image: this.interactiveMessageData.header.image,
                        }
                      : {
                          type: HeaderTypeEnum.Video,
                          video: this.interactiveMessageData.header.video,
                        }),
              },
            }
          : {}),
        ...(this.interactiveMessageData.footerText
          ? {
              footer: {
                text: this.interactiveMessageData.footerText,
              },
            }
          : {}),
      },
    };
  }
}

// ! TODO: flow interactions
