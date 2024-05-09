import { type z } from "zod";
import {
  type TemplateMessageParameterSchemaType,
  type WhatsappCloudApiRequestPayloadSchemaType,
} from "../../api-request-payload-schema";
import { BaseMessage } from "../message";
import {
  type LanguageEnum,
  MessageTypeEnum,
  TemplateMessageComponentTypeEnum,
  type TemplateMessageButtonComponentTypeEnum,
} from "../message/types";
import { type TemplateMessageInterface } from "./interface";

/**
 * Represents a parameter for a template message.
 * @class
 */
export class TemplateParameter {
  parameterData: z.infer<typeof TemplateMessageParameterSchemaType>;

  /**
   * @constructor
   * @param params - The parameter data.
   */
  constructor(params: z.infer<typeof TemplateMessageParameterSchemaType>) {
    this.parameterData = params;
  }
}

/**
 * Represents a component of a template message.
 * @class
 */
export class TemplateComponent {
  componentData:
    | {
        type: TemplateMessageComponentTypeEnum.Button;
        subType: TemplateMessageButtonComponentTypeEnum;
        parameters: TemplateParameter[];
      }
    | {
        type: TemplateMessageComponentTypeEnum.Header;
        parameters?: TemplateParameter[];
      }
    | {
        type: TemplateMessageComponentTypeEnum.Body;
        parameters?: TemplateParameter[];
      };

  /**
   * @constructor
   * @param params - The component data.
   */
  constructor(
    params:
      | {
          type: TemplateMessageComponentTypeEnum.Header;
        }
      | {
          type: TemplateMessageComponentTypeEnum.Body;
        }
      | {
          type: TemplateMessageComponentTypeEnum.Button;
          subType: TemplateMessageButtonComponentTypeEnum;
          parameters: TemplateParameter[];
        },
  ) {
    if (params.type === TemplateMessageComponentTypeEnum.Header) {
      this.componentData = {
        type: TemplateMessageComponentTypeEnum.Header,
      };
    } else if (params.type === TemplateMessageComponentTypeEnum.Body) {
      this.componentData = {
        type: TemplateMessageComponentTypeEnum.Body,
      };
    } else if (params.type === TemplateMessageComponentTypeEnum.Button) {
      this.componentData = {
        type: TemplateMessageComponentTypeEnum.Button,
        subType: params.subType,
        parameters: params.parameters,
      };
    } else {
      throw new Error("Check component payload");
    }
  }

  /**
   * Adds a parameter to the component.
   * @param parameter - The parameter to add.
   */
  addParameters(parameter: TemplateParameter) {
    this.componentData.parameters?.push(parameter);
  }
}

/**
 * Represents a template message.
 * @class
 */
export class TemplateMessage
  extends BaseMessage<MessageTypeEnum.Template>
  implements TemplateMessageInterface
{
  data: {
    templateName: string;
    language: LanguageEnum;
  };

  /**
   * @constructor
   * @memberof TemplateMessage
   * @param params - The template message data.
   */
  constructor(params: { templateName: string; language: LanguageEnum }) {
    super({ type: MessageTypeEnum.Interactive });
    this.data = {
      language: params.language,
      templateName: params.templateName,
    };
  }

  /**
   * Adds a component to the template message.
   */
  addComponent() {
    // TODO: Implement addComponent method
  }

  /**
   * Converts the template message to a JSON object.
   * @param params - The parameters for the JSON object.
   * @returns The JSON object representing the template message.
   */
  toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: MessageTypeEnum.Template }
  > {
    return {
      ...(params.replyToMessageId
        ? { context: { message_id: params.replyToMessageId } }
        : {}),
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: params.to,
      type: MessageTypeEnum.Template,
      template: {
        name: this.data.templateName,
        language: {
          code: this.data.language,
          policy: "deterministic",
        },
      },
    };
  }
}
