import { type BaseMessageInterface } from "../message/interface";
import { type LanguageEnum } from "../message/types";

/**
 * Represents the interface for a template message.
 * @interface TemplateMessageInterface
 * @extends {BaseMessageInterface}
 */
export interface TemplateMessageInterface extends BaseMessageInterface {
  data: {
    /**
     * The name of the template.
     */
    templateName: string;
    /**
     * The language of the template.
     * @type {LanguageEnum}
     */
    language: LanguageEnum;
  };
}
