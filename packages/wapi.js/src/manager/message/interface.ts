import { type z } from "zod";
import { type Client } from "../../client";
import { type BaseMessage } from "../../structures/message";
import { type BaseManagerInterface } from "../base/interface";
import { type WapiMessageResponseSchemaType } from "../../client/schema";

/**
 * Message manager interface
 * @interface
 * @extends {BaseManagerInterface}
 */
export interface MessageManagerInterface extends BaseManagerInterface {
  /**
   * The client associated with the message manager.
   */
  client: Client;

  /**
   * Sends a message to the specified phone number.
   * @param props - The properties for sending the message.
   * @returns A promise that resolves to the message ID.
   */
  send<T extends BaseMessage<string>>(props: {
    message: T;
    phoneNumber: string;
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>>;

  /**
   * Replies to a message with the specified message.
   * @param props - The properties for replying to the message.
   * @returns A promise that resolves to the message ID.
   */
  reply<T extends BaseMessage<string>>(props: {
    replyToMessageId: string;
    message: T;
    phoneNumber: string;
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>>;
}
