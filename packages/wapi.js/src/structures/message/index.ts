import { type z, type ZodSchema } from "zod";
import { type BaseMessageInterface } from "./interface";
import { type MessageTypeEnum } from "./types";
import { type WhatsappCloudApiRequestPayloadSchemaType } from "../../api-request-payload-schema";

/**
 * Represents the base message class.
 * @template T - The type of the message.
 * @class
 * @implements {BaseMessageInterface}
 * @abstract
 */
export abstract class BaseMessage<T extends string>
  implements BaseMessageInterface
{
  type: MessageTypeEnum;
  messaging_product: "whatsapp";
  recipient_type: "individual";

  /**
   * Converts the message object to JSON format.
   * @param params - The parameters required for converting the message to JSON.
   * @returns The JSON representation of the message.
   */
  abstract toJson(params: {
    to: string;
    replyToMessageId?: string;
  }): Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: T }
  >;

  // ! TODO: fix types here

  /**
   * Parses the constructor payload using the provided schema.
   * @param schema - The Zod schema used for parsing the payload.
   * @param payload - The payload to be parsed.
   * @returns The parsed data.
   * @throws An error if the parsing fails.
   */
  protected parseConstructorPayload(schema: ZodSchema<any>, payload: any) {
    const response = schema.safeParse(payload);
    if (!response.success) {
      throw new Error(
        JSON.stringify(
          {
            type: "Parsing Error",
            errors: response.error.errors,
          },
          null,
          4,
        ),
      );
    } else {
      return response.data;
    }
  }

  /**
   * Creates a new instance of the BaseMessage class.
   * @param params - The parameters required for creating the message.
   */
  constructor(params: { type: MessageTypeEnum }) {
    this.type = params.type;
    this.messaging_product = "whatsapp";
    this.recipient_type = "individual";
  }
}
