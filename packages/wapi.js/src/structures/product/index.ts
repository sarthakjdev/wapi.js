import { type z } from "zod";
import type {
  InteractiveMessageApiPayloadSchemaType,
  ProductInteractiveMessagePayload,
} from "../../api-request-payload-schema";
import { InteractiveMessage } from "../interaction";
import { InteractiveMessageTypeEnum } from "../interaction/interface";
import type { ProductMessageMessageInterface } from "./interface";
import { MessageTypeEnum } from "../message/types";
import { HeaderTypeEnum } from "../interaction/schema";

/**
 * Represents a product interaction message.
 * @extends {InteractiveMessage}
 * @implements {ProductMessageMessageInterface}
 * @class
 */
export class ProductMessage
  extends InteractiveMessage
  implements ProductMessageMessageInterface {
  data: {
    catalogId: string;
    productRetailerId: string;
  };

  /**
   * Creates an instance of ProductInteractionMessage.
   * @constructor
   * @memberof ProductInteractionMessage
   * @param {Object} params - The parameters for creating the product interaction message.
   * @param {string} params.buttonText - The button text of the message.
   * @param {string} [params.footerText] - The footer text of the message.
   * @param {string} params.bodyText - The body text of the message.
   * @param {string} params.catalogId - The catalog ID of the product.
   * @param {string} params.productRetailerId - The product retailer ID of the product.
   */
  constructor(params: {
    buttonText: string;
    footerText?: string;
    bodyText: string;
    catalogId: string;
    productRetailerId: string;
  }) {
    super({
      type: InteractiveMessageTypeEnum.Button,
      footerText: params.footerText,
      bodyText: params.bodyText,
    });
    this.data = {
      catalogId: params.catalogId,
      productRetailerId: params.productRetailerId,
    };
  }

  /**
   * Adds a header to the message.
   */
  addHeader() { }

  /**
   * Adds a footer to the message.
   * @param {string} footerText - The footer text to be added.
   */
  addFooter(footerText: string) {
    this.interactiveMessageData.footerText = footerText;
  }

  /**
   * Converts the message to JSON format.
   * @memberof ProductInteractionMessage
   * @param {Object} params - The parameters for converting the message to JSON.
   * @param {string} params.to - The recipient of the message.
   * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
   * @returns {Object} The JSON representation of the message.
   */
  toJson(params: { to: string; replyToMessageId?: string }): z.infer<
    typeof InteractiveMessageApiPayloadSchemaType
  > & {
    interactive: z.infer<typeof ProductInteractiveMessagePayload>;
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
        type: InteractiveMessageTypeEnum.Product,
        action: {
          catalogId: this.data.catalogId,
          productRetailerId: this.data.productRetailerId,
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
