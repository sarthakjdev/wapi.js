import type { z } from "zod";
import type {
    InteractiveMessageApiPayloadSchemaType,
    ProductListInteractiveMessagePayload,
} from "../../api-request-payload-schema";
import { InteractiveMessage } from "../interaction";
import type {
    ProductInterface,
    ProductListMessageInterface,
    ProductListSectionInterface,
} from "./interface";
import {
    HeaderTypeEnum,
    type InteractiveMessageHeaderSchemaType,
} from "../interaction/schema";
import { InteractiveMessageTypeEnum } from "../interaction/interface";
import { MessageTypeEnum } from "../message/types";

/**
 * Represents a product.
 * @class
 * @implements {ProductInterface}
 */
export class Product implements ProductInterface {
    retailerId: string;
    constructor(retailerId: string) {
        this.retailerId = retailerId;
    }
}

/**
 * Represents a product list section.
 * @class
 * @implements {ProductListSectionInterface}
 */
export class ProductListSection implements ProductListSectionInterface {
    products: Product[];
    title: string;

    constructor(products: Product[], title: string) {
        this.products = products;
        this.title = title;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }
}

/**
 * Represents a product list interaction message.
 * @class
 * @extends {InteractiveMessage}
 * @implements {ProductListMessageInterface}
 */
export class ProductListMessage
    extends InteractiveMessage
    implements ProductListMessageInterface {
    data: {
        catalogId: string;
        productRetailerId: string;
        sections: ProductListSection[];
    };

    /**
     * Creates an instance of ProductListInteractionMessage.
     * @constructor
     * @memberof ProductListInteractionMessage
     * @param {Object} params - The parameters for creating the product list interaction message.
     * @param {string} params.buttonText - The button text of the message.
     * @param {string} [params.footerText] - The footer text of the message.
     * @param {string} params.bodyText - The body text of the message.
     * @param {string} params.catalogId - The catalog ID of the product.
     * @param {string} params.productRetailerId - The product retailer ID of the product.
     * @param {ProductListSection[]} params.sections - The sections of the product list.
     * @param {Object} params.header - The header of the message.
     */
    constructor(params: {
        buttonText: string;
        footerText?: string;
        bodyText: string;
        catalogId: string;
        productRetailerId: string;
        sections: ProductListSection[];
        header: z.infer<typeof InteractiveMessageHeaderSchemaType>;
    }) {
        super({
            type: InteractiveMessageTypeEnum.Button,
            footerText: params.footerText,
            bodyText: params.bodyText,
        });
        this.data = {
            catalogId: params.catalogId,
            productRetailerId: params.productRetailerId,
            sections: params.sections,
        };
    }

    /**
     * Adds a section to the message.
     * @param {ProductListSection} section - The section to be added.
     */
    addSection(section: ProductListSection) {
        this.data.sections.push(section);
    }

    /**
     * Adds a footer to the message.
     * @param {string} footerText - The footer text to be added.
     */
    addFooter(footerText: string) {
        this.interactiveMessageData.footerText = footerText;
    }

    /**
     * Converts the message to JSON format.
     * @memberof ProductListInteractionMessage
     * @param {Object} params - The parameters for converting the message to JSON.
     * @param {string} params.to - The recipient of the message.
     * @param {string} [params.replyToMessageId] - The ID of the message to reply to.
     * @returns {Object} The JSON representation of the message.
     */
    toJson(params: { to: string; replyToMessageId?: string }): z.infer<
        typeof InteractiveMessageApiPayloadSchemaType
    > & {
        interactive: z.infer<typeof ProductListInteractiveMessagePayload>;
    } {
        if (!this.interactiveMessageData.header)
            throw new Error("Header is required for ProductListInteractiveMessage");

        return {
            ...(params.replyToMessageId
                ? { context: { message_id: params.replyToMessageId } }
                : {}),
            to: params.to,
            messaging_product: "whatsapp",
            recipient_type: "individual",
            type: MessageTypeEnum.Interactive,
            interactive: {
                type: InteractiveMessageTypeEnum.ProductList,
                action: {
                    catalogId: this.data.catalogId,
                    productRetailerId: this.data.productRetailerId,
                    sections: this.data.sections.map((section) => {
                        return {
                            product_items: section.products.map((product) => {
                                return {
                                    product_retailer_id: product.retailerId,
                                };
                            }),
                            title: section.title,
                        };
                    }),
                },
                header: {
                    ...(this.interactiveMessageData.header.type === HeaderTypeEnum.Text
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
                            : this.interactiveMessageData.header.type === HeaderTypeEnum.Image
                                ? {
                                    type: HeaderTypeEnum.Image,
                                    image: this.interactiveMessageData.header.image,
                                }
                                : {
                                    type: HeaderTypeEnum.Video,
                                    video: this.interactiveMessageData.header.video,
                                }),
                },
                body: {
                    text: this.interactiveMessageData.bodyText,
                },
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
