import { z } from "zod";
import { type Client } from "./index";
import {
  type RequestClientInterface,
  type RequestClientConfigOptions,
} from "./interface";
import {
  CloudApiResponseSchemaType,
  WapiMessageResponseSchemaType,
} from "./schema";
import { MessageStatusEnum } from "../webhook/type";

/**
 * Request client used to communicate with WhatsApp Cloud API using HTTP requests.
 * @class
 * @implements {RequestClientInterface}
 */
export class RequestClient implements RequestClientInterface {
  host: string;
  protocol: string;
  phoneNumberId: string;
  businessAccountId: string;
  apiVersion: string;
  client: Client;
  accessToken: string;
  private userAgent: string;

  /**
   *  Creates an instance of RequestClient.
   * @constructor
   * @memberof RequestClient
   * Creates an instance of RequestClient.
   * @param {RequestClientConfigOptions} options - The configuration options for the request client.
   */
  constructor(options: RequestClientConfigOptions) {
    this.host = options.host;
    this.protocol = "https";
    this.apiVersion = options.apiVersion;
    this.businessAccountId = options.businessAccountId;
    this.client = options.client;
    this.phoneNumberId = options.phoneNumberId;
    this.userAgent = "";
    this.accessToken = options.accessToken;
  }

  /**
   * Gets the request URL based on the current configuration.
   * @returns {string} The request URL.
   */
  getRequestUrl(): string {
    return `${this.protocol}://${this.host}/${this.apiVersion}`;
  }

  /**
   * Sends a request to the WhatsApp Cloud API.
   * @param {object} options - The request options.
   * @param {string} options.path - The API endpoint path.
   * @param {string} [options.body] - The request body.
   * @param {'GET' | 'POST' | 'DELETE'} [options.method='POST'] - The request method.
   * @returns {Promise<any>} A promise that resolves to the response body.
   */
  async requestCloudApi({
    body,
    path,
    method = "POST",
  }: {
    path: string;
    body?: string;
    method?: "GET" | "POST" | "DELETE";
  }): Promise<z.infer<typeof WapiMessageResponseSchemaType>> {
    try {
      const requestUrl = this.getRequestUrl();
      const response = await fetch(`${requestUrl}${path}`, {
        method: method,
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          "User-Agent": this.userAgent,
        },
      });

      const responseBody = await response.json();
      const parsedResponse = CloudApiResponseSchemaType.safeParse(responseBody);
      if (parsedResponse.success) {
        const responseData = parsedResponse.data;
        if (
          responseData &&
          typeof responseData === "object" &&
          "error" in responseData
        ) {
          // api returned errored response
          return {
            status: "error",
            error: {
              description: responseData.error.error_data.details,
              title: responseData.error.message,
              errorCode: responseData.error.code,
              errorSubCode: responseData.error.error_subcode,
            },
          };
        } else {
          return {
            status: "success",
            data: {
              messageId: responseData.messages[0].id,
              receiverPhoneNumber: responseData.contacts[0].input,
              senderPhoneNumber: responseData.contacts[0].wa_id,
              status: MessageStatusEnum.Sent,
            },
          };
        }
      } else {
        throw new Error('Failed to parse response, Report to sarthak@softlancer.co urgently. or raise an issue on github.')
      }
    } catch (error) {
      if (error instanceof Error) this.client.emit("Error", error);
      return {
        status: "error",
        error: {
          title: "Request Error",
          description: error instanceof Error ? error.message : "",
          errorCode: "",
          errorSubCode: "",
        },
      };
    }
  }
}
