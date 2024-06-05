import { type z } from "zod";
import { type BaseMessageInterface } from "../message/interface";
import { type ListInteractiveMessageSection } from "../../api-request-payload-schema";

/**
 * Represents the interface for an interactive message.
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface InteractiveMessageInterface extends BaseMessageInterface {
  interactiveMessageData: {
    type: InteractiveMessageTypeEnum;
    footerText?: string;
    bodyText: string;
  };
}

/**
 * Represents the interface for a button interaction message.
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ButtonInteractionMessageInterface
  extends InteractiveMessageInterface {
  data: {
    buttons: { id: string; title: string }[];
  };
}

/**
 * Represents the interface for a list interaction message.
 * @interface
 * @extends {InteractiveMessageInterface}
 */
export interface ListInteractionMessageInterface
  extends InteractiveMessageInterface {
  data: {
    buttonText: string;
    sections: z.infer<typeof ListInteractiveMessageSection>[];
  };
}

/**
 * Represents the enum for interactive message types.
 * @enum {string}
 */
export enum InteractiveMessageTypeEnum {
  Button = "button",
  Catalog = "catalog_message",
  List = "list",
  Product = "product",
  ProductList = "product_list",
  Flow = "flow",
}
