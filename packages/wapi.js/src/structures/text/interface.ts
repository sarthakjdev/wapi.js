import { type z } from "zod";
import { type BaseMessageInterface } from "../message/interface";
import { type WhatsappCloudApiRequestPayloadSchemaType } from "../../api-request-payload-schema";

/**
 * Represents the interface for a text message.
 * @interface
 * @extends {BaseMessageInterface}
 */
export interface TextMessageInterface extends BaseMessageInterface {
  /**
   * The data property of the text message.
   */
  data: { text: string | null };

  /**
   * Converts the text message to a JSON object that can be sent as a request payload to the WhatsApp Cloud API.
   * @param params - The parameters for converting the text message to JSON.
   * @returns The JSON representation of the text message.
   */
  toJson: (params: {
    to: string;
  }) => Extract<
    z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
    { type: "text" }
  >;
}
