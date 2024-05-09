import { type Client } from "../../../client";
import { MessageEvent } from "../base";
import { type ProductInquiryEventInterface } from "./interface";

/**
 * Represents a product inquiry event.
 * @class
 * @extends {MessageEvent}
 * @implements {ProductInquiryEventInterface}
 */
export class ProductInquiryEvent
  extends MessageEvent
  implements ProductInquiryEventInterface
{
  /**
   * The ID of the product.
   * @type {string}
   */
  productId: string;
  /**
   * The ID of the catalog.
   * @type {string}
   */
  catalogId: string;
  /**
   * The text of the inquiry message.
   * @type {string}
   */
  text: string;

  /**
   * Creates a new instance of the ProductInquiryEvent class.
   * @param {Object} params - The parameters for creating the event.
   * @param {Client} params.client - The client object.
   * @param {Object} params.data - The data object containing event data.
   * @param {string} params.data.productId - The ID of the product.
   * @param {string} params.data.catalogId - The ID of the catalog.
   * @param {string} params.data.from - The sender of the message.
   * @param {string} params.data.id - The ID of the message.
   * @param {string} params.data.timestamp - The timestamp of the message.
   * @param {boolean} params.data.isForwarded - Indicates if the message is forwarded.
   * @param {string} params.data.text - The text of the inquiry message.
   */
  constructor(params: {
    client: Client;
    data: {
      productId: string;
      catalogId: string;
      from: string;
      id: string;
      timestamp: string;
      isForwarded: boolean;
      text: string;
    };
  }) {
    super({
      client: params.client,
      id: params.data.id,
      from: params.data.from,
      timestamp: params.data.timestamp,
      isForwarded: params.data.isForwarded,
    });

    this.productId = params.data.productId;
    this.catalogId = params.data.catalogId;
    this.text = params.data.text;
  }
}
