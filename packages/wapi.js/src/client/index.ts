import { EventEmitter } from "node:events";

import { Webhook } from "../webhook";
import { PhoneNumberManager } from "../manager/phone";
import { MediaManager } from "../manager/media";
import { RequestClient } from "./request-client";
import { ClientStatusEnum, type ClientInterface } from "./interface";
import { MessageManager } from "../manager/message";
import { type WapiEventDataMap } from "../webhook/type";

/**
 * The main client to build a whatsapp bot instance
 * @implements {ClientInterface}
 * @extends {EventEmitter}
 * @class Client
 */
export class Client extends EventEmitter implements ClientInterface {
  /**
   * Phone number manager to verify phone numbers for your
   * @type {PhoneNumberManager}
   * @memberof Client
   */
  phone: PhoneNumberManager;

  /**
   * 	Media manager to upload, get and media via whatsapp cloud api
   * 	@type {MediaManager}
   * 	@memberof Client
   */
  media: MediaManager;

  /**
   * Webhook manager to handle the incoming message and event listening
   * 	@type {Webhook}
   * 	@memberof Client
   */
  webhook: Webhook;

  /**
   * Message manager to manage the outgoing messaging operations.
   * 	@type {MessageManager}
   * 	@memberof Client
   */
  message: MessageManager;

  /**
   * Status of the client
   * @type {ClientStatusEnum}
   * @memberof Client
   */
  status: ClientStatusEnum | null = null;

  /**
   * Unix Timestamp at which client gets into {@link ClientStatusEnum.Ready} state
   * @type {number}
   * @memberof Client
   * @readonly
   */
  readyAtTimeStamp: number | null = null;

  /**
   * Requester is an internal utility to communicate with Whatsapp cloud api
   * @type {RequestClient}
   * 	@memberof Client
   */
  requester: RequestClient;

  /**
   * The base url of the whatsapp cloud api
   * @ignore
   * @private
   * @static
   * @readonly
   * @type {string}
   */
  private static readonly baseUrl = "graph.facebook.com";

  /**
   * The API version of whatsapp cloud api to use
   * @ignore
   * @private
   * @static
   * @readonly
   * @type {string}
   */
  private static readonly apiVersion = "v19.0";

  /**
   * @param {object} params
   * @param {string} params.webhookSecret
   * @param {string} params.webhookEndpoint
   * @param {string} params.apiAccessToken
   * @param {string} params.phoneNumberId
   * @param {string} params.businessAccountId
   * @param {number} params.port
   * @constructor
   */
  constructor(params: {
    webhookSecret: string;
    webhookEndpoint: string;
    apiAccessToken: string;
    phoneNumberId: string;
    businessAccountId: string;
    port: number;
  }) {
    super();
    this.webhook = new Webhook({
      client: this,
      webhookSecret: params.webhookSecret,
      webhookEndpoint: params.webhookEndpoint,
      port: params.port,
    });
    this.phone = new PhoneNumberManager({ client: this });
    this.media = new MediaManager({
      client: this,
    });
    this.message = new MessageManager({ client: this });
    this.requester = new RequestClient({
      accessToken: params.apiAccessToken,
      businessAccountId: params.businessAccountId,
      phoneNumberId: params.phoneNumberId,
      client: this,
      host: Client.baseUrl,
      apiVersion: Client.apiVersion,
      protocol: "https",
    });
  }

  /**
   * getter for client
   * @returns {Client}
   * @memberof Client
   * @static
   */
  static getClient() {
    return this;
  }

  /**
   * Function to emit a new event on incoming webhook or wapi events
   * @param {T} eventName
   * @param {WapiEventDataMap[T]} data
   * @returns {boolean}
   * @memberof Client
   */
  emit<T extends keyof WapiEventDataMap>(
    eventName: T,
    data: WapiEventDataMap[T],
  ): boolean {
    return super.emit(eventName, data);
  }

  /**
   * Function to attach event listener to wapi client
   * @param {T} eventName
   * @param {(data: WapiEventDataMap[T])=> void} listener
   */
  on<T extends keyof WapiEventDataMap>(
    eventName: T,
    listener: (data: WapiEventDataMap[T]) => void,
  ): this {
    return super.on(eventName, listener);
  }

  /**
   * Timestamp at which the client switched to {@link ClientStatusEnum.Ready} state
   * @readonly
   * @returns {Date}
   */
  get getReadyAtTimestamp() {
    return this.readyAtTimeStamp && new Date(this.readyAtTimeStamp * 1000);
  }

  /**
   * Uptime in milliseconds since the client first got into {@link ClientStatusEnum.Ready} state
   * @type {number}
   * @readonly
   * @memberof Client
   */
  get uptime() {
    return this.readyAtTimeStamp && Date.now() - this.readyAtTimeStamp * 1000;
  }

  /**
   * Function to update the initial access token given at the point of client creations
   * @param {string} accessToken
   * @memberof Client
   *
   */
  set updateAccessToken(accessToken: string) {
    this.requester.accessToken = accessToken;
  }

  /**
   * Getter for phone number
   * @type {string}
   * @memberof Client
   * @readonly
   */
  get phoneNumberId() {
    return this.requester.phoneNumberId;
  }

  /**
   * Function to set the phone number id used to send messages
   * @param {string} phoneNumber
   * @memberof Client
   */
  set updateSenderPhoneNumberId(phoneNumber: string) {
    this.requester.phoneNumberId = phoneNumber;
  }

  /**
   * Function to initiate the wapi client and start listening to the incoming webhook events
   * @memberof Client
   */
  initiate() {
    this.webhook.listen(() => {
      this.status = ClientStatusEnum.Ready;
      this.emit("Ready", null);
      this.readyAtTimeStamp = Date.now() / 1000;
    });
  }
}
