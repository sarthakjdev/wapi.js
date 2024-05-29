import { type Client } from "./index";
import {
  type RequestClientInterface,
  type RequestClientConfigOptions,
} from "./interface";
import { type CloudApiRequesterResourceTypeToResponseTypeMap } from "./schema";

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
  async requestCloudApi<
    T extends keyof CloudApiRequesterResourceTypeToResponseTypeMap,
  >({
    body,
    path,
    method = "POST",
  }: {
    path: string;
    body?: string;
    method?: "GET" | "POST" | "DELETE";
  }): Promise<CloudApiRequesterResourceTypeToResponseTypeMap[T]> {
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

      return responseBody as CloudApiRequesterResourceTypeToResponseTypeMap[T];
    } catch (error) {
      if (error instanceof Error) this.client.emit("Error", error);
      throw error;
    }
  }
}
