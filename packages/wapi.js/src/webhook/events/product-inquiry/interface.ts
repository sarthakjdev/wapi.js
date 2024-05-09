import { type MessageEventInterface } from "../base/interface";

/**
 * Represents the interface for a product inquiry event.
 * @interface
 * @extends {MessageEventInterface}
 */
export interface ProductInquiryEventInterface extends MessageEventInterface {
  /**
   * The ID of the product being inquired.
   * @type {string}
   */
  productId: string;

  /**
   * The ID of the catalog the product belongs to.
   * @type {string}
   */
  catalogId: string;

  /**
   * The text of the inquiry message.
   * @type {string}
   */
  text: string;
}
