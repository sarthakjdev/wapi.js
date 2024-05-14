import { type z } from "zod";
import { type Client } from "../../client";
import { type BaseMessage } from "../../structures/message";
import { BaseManager } from "../base";
import { type MessageManagerInterface } from "./interface";
import { type WapiMessageResponseSchemaType } from "../../client/schema";

/**
 * Manager to handle outgoing messages for wapi.
 * @implements {MessageManagerInterface}
 * @extends {BaseManager}
 * @class
 */
export class MessageManager
  extends BaseManager
  implements MessageManagerInterface
{
  client: Client;
  constructor(props: { client: Client }) {
    super(props.client);
    this.client = props.client;
  }

  /**
   * Function used to send a message.
   * @param {{ message: {T}; phoneNumber: {string} }} props - The properties for sending a message.
   * @param {T} props.message - The message to be sent.
   * @param {string} props.phoneNumber - The phone number to send the message to.
   * @returns {Promise<string>} - A promise that resolves to the response from the server.
   */
  async send<T extends BaseMessage<string>>(props: {
    message: T;
    phoneNumber: string;
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>> {
    const response = await this.client.requester.requestCloudApi({
      path: `/${this.client.phoneNumberId}/messages`,
      body: JSON.stringify(props.message.toJson({ to: props.phoneNumber })),
      method: "POST",
    });

    return response;
  }

  /**
   * Function used to reply to a message using a message id.
   * @param {{ replyToMessageId: {string}; message: {T}; phoneNumber: {string} }} props - The properties for replying to a message.
   * @param {string} props.replyToMessageId - The id of the message to reply to.
   * @param {T} props.message - The message to be sent as a reply.
   * @param {string} props.phoneNumber - The phone number to send the reply to.
   * @returns {Promise<string>} - A promise that resolves to the response from the server.
   */
  async reply<T extends BaseMessage<string>>(props: {
    replyToMessageId: string;
    message: T;
    phoneNumber: string;
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>> {
    const response = await this.client.requester.requestCloudApi({
      path: `/${this.client.phoneNumberId}/messages`,
      body: JSON.stringify(
        props.message.toJson({
          to: props.phoneNumber,
          replyToMessageId: props.replyToMessageId,
        }),
      ),
      method: "POST",
    });

    return response;
  }
}
