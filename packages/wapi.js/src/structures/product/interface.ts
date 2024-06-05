import { type InteractiveMessageInterface } from "../interaction/interface";

/**
 * Represents the interface for a product interaction message.
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ProductMessageMessageInterface
  extends InteractiveMessageInterface {
  data: {
    catalogId: string;
    productRetailerId: string;
  };
}
