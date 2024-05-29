import * as EventEmitter from "events";
import { type Client } from "../client";
import { WhatsappApiNotificationPayloadSchemaType } from "./schema";
import * as express from "express";
import {
  type Express,
  json as expressJson,
  type Request,
  type Response,
} from "express";
import {
  InteractionNotificationTypeEnum,
  MessageStatusEnum,
  NotificationMessageTypeEnum,
  SystemNotificationTypeEnum,
} from "./type";
import { TextMessageEvent } from "./events/text";
import {
  AudioMessage,
  Contact,
  ContactMessage,
  DocumentMessage,
  ImageMessage,
  LocationMessage,
  ReactionMessage,
  StickerMessage,
  TextMessage,
  VideoMessage,
} from "../structures";
import { AudioMessageEvent } from "./events/audio";
import { VideoMessageEvent } from "./events/video";
import { ImageMessageEvent } from "./events/image";
import { DocumentMessageEvent } from "./events/document";
import { ContactMessageEvent } from "./events/contacts";
import { MessageDeliveryEvent } from "./events/message-delivered";
import { MessageSentEvent } from "./events/message-sent";
import { MessageReadEvent } from "./events/message-read";
import { MessageUndeliveredEvent } from "./events/message-undelivered";
import { MessageFailedEvent } from "./events/message-failed";
import {
  AdInteractionEvent,
  ListInteractionEvent,
  QuickReplyButtonInteractionEvent,
  ReplyButtonInteractionEvent,
} from "./events/interaction";
import { ReactionEvent } from "./events/reaction";
import { OrderMessageEvent } from "./events/order";
import { UnknownEvent } from "./events/unknown";
import { CustomerIdentityChangeEvent } from "./events/customer-identity-changed";
import { CustomerNumberChangeEvent } from "./events/customer-number-changed";
import { Order, ProductItem } from "../structures/order";
import { StickerMessageEvent } from "./events/sticker";
import { LocationMessageEvent } from "./events/location";
import { ProductInquiryEvent } from "./events/product-inquiry";
import { type WebhookInterface } from "./interface";

/**
 * The webhook client for listening to incoming event notifications
 * @class Webhook
 * @extends {EventEmitter}
 * @implements {WebhookInterface}
 */
export class Webhook implements WebhookInterface {
  private endpoint: string;
  private port = 3000;
  private server: Express;
  private listening = false;
  private webhookSecret: string;
  private client: Client;

  /**
   * Creates a new instance of the webhook client.
   * @constructor
   * @param params
   * @param {Client} params.client
   * @param {string} params.webhookSecret
   * @param {string} params.webhookEndpoint
   * @param {number} params.port
   */
  constructor(params: {
    client: Client;
    webhookSecret: string;
    webhookEndpoint: string;
    port: number;
  }) {
    this.client = params.client;
    this.endpoint = params.webhookEndpoint;
    this.webhookSecret = params.webhookSecret;
    this.port = params.port;
    this.server = express();
    this.server.use(expressJson());
    this.server.get(this.endpoint, (request, response) => {
      this._getRequestHandler(request, response);
    });

    this.server.post(this.endpoint, (request, response) => {
      this._postRequestHandler(request, response);
    });
  }

  private _getRequestHandler(request: Request, response: Response) {
    const queryToken = request.query["hub.verify_token"];
    if (typeof queryToken === "string") {
      if (queryToken === this.webhookSecret) {
        response.send(request.query["hub.challenge"]);
      } else {
        response.status(400).send();
      }
    } else {
      // ignore this request
    }
  }

  /**
   * Handles the incoming POST request from the webhook
   * @param {Request} request
   * @param {Response} response
   */
  public _postRequestHandler(request: Request, response: Response) {
    const parsedPayload = WhatsappApiNotificationPayloadSchemaType.safeParse(
      request.body,
    );
    if (parsedPayload.success) {
      if (parsedPayload.data.entry.length) {
        parsedPayload.data.entry.forEach((entry) => {
          entry.changes.forEach((change) => {
            const messages = change.value.messages;
            const statuses = change.value.statuses;

            if (statuses) {
              statuses.forEach((status) => {
                switch (status.status) {
                  case MessageStatusEnum.Delivered: {
                    this.client.emit(
                      "MessageDelivered",
                      new MessageDeliveryEvent({
                        client: this.client,
                        data: {
                          from: status.recipient_id,
                          timestamp: status.timestamp,
                        },
                      }),
                    );

                    return;
                  }

                  case MessageStatusEnum.Sent: {
                    this.client.emit(
                      "MessageSent",
                      new MessageSentEvent({
                        client: this.client,
                        data: {
                          from: status.recipient_id,
                          timestamp: status.timestamp,
                        },
                      }),
                    );

                    return;
                  }

                  case MessageStatusEnum.Read: {
                    this.client.emit(
                      "MessageRead",
                      new MessageReadEvent({
                        client: this.client,
                        data: {
                          from: status.recipient_id,
                          timestamp: status.timestamp,
                        },
                      }),
                    );

                    return;
                  }

                  case MessageStatusEnum.Failed: {
                    if (status.errors) {
                      if (status.errors.find((err) => err.code === 130472)) {
                        this.client.emit(
                          "MessageUndelivered",
                          new MessageUndeliveredEvent({
                            client: this.client,
                            data: {
                              from: status.recipient_id,
                              timestamp: status.timestamp,
                            },
                          }),
                        );
                      } else {
                        this.client.emit(
                          "MessageFailed",
                          new MessageFailedEvent({
                            client: this.client,
                            data: {
                              from: status.recipient_id,
                              timestamp: status.timestamp,
                              // ! TODO: consider the whole array here
                              failReason: status.errors[0].message,
                            },
                          }),
                        );
                      }
                    } else {
                      // do nothing
                    }

                    return;
                  }

                  default:
                    break;
                }
              });
            }

            if (messages) {
              messages.forEach((message) => {
                switch (message.type) {
                  case NotificationMessageTypeEnum.Text: {
                    if (message.context?.referred_product) {
                      this.client.emit(
                        "ProductInquiry",
                        new ProductInquiryEvent({
                          client: this.client,
                          data: {
                            text: message.text.body,
                            from: message.from,
                            id: message.id,
                            timestamp: message.timestamp,
                            catalogId:
                              message.context.referred_product.catalog_id,
                            productId:
                              message.context.referred_product
                                .product_retailer_id,
                            isForwarded: message.context?.forwarded || false,
                          },
                        }),
                      );
                    } else if (message.referral) {
                      this.client.emit(
                        "AdInteraction",
                        new AdInteractionEvent({
                          client: this.client,
                          data: {
                            text: message.text.body,
                            from: message.from,
                            id: message.id,
                            timestamp: message.timestamp,
                            isForwarded: message.context?.forwarded || false,
                            source: {
                              ctwaClid: message.referral.ctwa_clid,
                              description: message.referral.body,
                              id: message.referral.source_id,
                              thumbnailUrl: message.referral.thumbnail_url,
                              title: message.referral.headline,
                              type: message.referral.source_type,
                              url: message.referral.source_url,
                              mediaType: message.referral.media_type,
                              mediaUrl:
                                message.referral.image_url ||
                                message.referral.video_url,
                            },
                          },
                        }),
                      );
                    } else {
                      this.client.emit(
                        "TextMessage",
                        new TextMessageEvent({
                          client: this.client,
                          data: {
                            text: new TextMessage({
                              text: message.text.body,
                            }),
                            from: message.from,
                            messageId: message.id,
                            timestamp: message.timestamp,
                            isForwarded: message.context?.forwarded || false,
                          },
                        }),
                      );
                    }

                    return;
                  }

                  case NotificationMessageTypeEnum.Audio: {
                    this.client.emit(
                      "AudioMessage",
                      new AudioMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          audio: new AudioMessage({
                            id: message.audio.id,
                          }),
                          timestamp: message.timestamp,
                          mimeType: message.audio.mime_type,
                          sha256: message.audio.sha256,
                          mediaId: message.audio.id,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );

                    return;
                  }

                  case NotificationMessageTypeEnum.Video: {
                    this.client.emit(
                      "VideoMessage",
                      new VideoMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          video: new VideoMessage({
                            id: message.id,
                          }),
                          mediaId: message.video.id,
                          mimeType: message.video.mime_type,
                          sha256: message.video.sha256,
                          timestamp: message.timestamp,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );
                    return;
                  }

                  case NotificationMessageTypeEnum.Image: {
                    this.client.emit(
                      "ImageMessage",
                      new ImageMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          image: new ImageMessage({
                            id: message.id,
                          }),
                          mediaId: message.image.id,
                          timestamp: message.timestamp,
                          mimeType: message.image.mime_type,
                          sha256: message.image.sha256,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );

                    return;
                  }

                  case NotificationMessageTypeEnum.Document: {
                    this.client.emit(
                      "DocumentMessage",
                      new DocumentMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          document: new DocumentMessage({
                            id: message.id,
                            caption: message.document.caption,
                            filename: message.document.filename,
                          }),
                          timestamp: message.timestamp,
                          mediaId: message.document.id,
                          mimeType: message.document.mime_type,
                          sha256: message.document.sha256,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );

                    return;
                  }

                  case NotificationMessageTypeEnum.Contacts: {
                    const contacts = message.contacts.map((contact) => {
                      const contactToReturn = new Contact({
                        name: contact.name,
                      });
                      contact.addresses?.forEach((add) =>
                        contactToReturn.addAddress(add),
                      );
                      contact.urls?.forEach((url) =>
                        contactToReturn.addUrl(url),
                      );
                      contact.phones?.forEach((phone) =>
                        contactToReturn.addPhone(phone),
                      );
                      contact.emails?.forEach((email) =>
                        contactToReturn.addEmail(email),
                      );
                      return contactToReturn;
                    });

                    this.client.emit(
                      "ContactsMessage",
                      new ContactMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          contact: new ContactMessage({
                            contacts: contacts,
                          }),
                          timestamp: message.timestamp,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );

                    return;
                  }

                  case NotificationMessageTypeEnum.Interactive: {
                    if (
                      message.interactive.type ===
                      InteractionNotificationTypeEnum.ListReply
                    ) {
                      this.client.emit(
                        "ListInteraction",
                        new ListInteractionEvent({
                          client: this.client,
                          data: {
                            from: message.from,
                            messageId: message.id,
                            timestamp: message.timestamp,
                            isForwarded: message.context?.forwarded || false,
                            description:
                              message.interactive.list_reply.description,
                            title: message.interactive.list_reply.title,
                            listId: message.interactive.list_reply.id,
                          },
                        }),
                      );
                    } else if (
                      message.interactive.type ===
                      InteractionNotificationTypeEnum.ButtonReply
                    ) {
                      this.client.emit(
                        "ReplyButtonInteraction",
                        new ReplyButtonInteractionEvent({
                          client: this.client,
                          data: {
                            from: message.from,
                            messageId: message.id,
                            timestamp: message.timestamp,
                            isForwarded: message.context?.forwarded || false,
                            title: message.interactive.button_reply.title,
                            buttonId: message.interactive.button_reply.id,
                          },
                        }),
                      );
                    }

                    return;
                  }

                  case NotificationMessageTypeEnum.Button: {
                    this.client.emit(
                      "QuickReplyButtonInteraction",
                      new QuickReplyButtonInteractionEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          timestamp: message.timestamp,
                          isForwarded: message.context?.forwarded || false,
                          buttonPayload: message.button.payload,
                          buttonText: message.button.text,
                        },
                      }),
                    );
                    return;
                  }

                  case NotificationMessageTypeEnum.Order: {
                    this.client.emit(
                      "OrderReceived",
                      new OrderMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          messageId: message.id,
                          timestamp: message.timestamp,
                          order: new Order({
                            catalogId: message.order.catalog_id,
                            productItems: message.order.product_items.map(
                              (item) =>
                                new ProductItem({
                                  currency: item.currency,
                                  itemPrice: item.item_price,
                                  productRetailerId: item.product_retailer_id,
                                  quantity: item.quantity,
                                }),
                            ),
                            text: message.text,
                          }),
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );
                    return;
                  }

                  case NotificationMessageTypeEnum.System: {
                    if (
                      message.system.type ===
                      SystemNotificationTypeEnum.CustomerNumberChange
                    ) {
                      this.client.emit(
                        "CustomerNumberChanged",
                        new CustomerNumberChangeEvent({
                          client: this.client,
                          changeDescription: message.system.body,
                          newWaId: message.system.wa_id,
                          timestamp: message.timestamp,
                          oldWaId: message.system.customer,
                        }),
                      );
                    } else if (
                      message.system.type ===
                      SystemNotificationTypeEnum.CustomerIdentityChange
                    ) {
                      this.client.emit(
                        "CustomerIdentityChanged",
                        new CustomerIdentityChangeEvent({
                          client: this.client,
                          creationTimestamp: message.identity.created_timestamp,
                          hash: message.identity.hash,
                          acknowledged: message.identity.acknowledged,
                          timestamp: message.timestamp,
                        }),
                      );
                    } else {
                      // ! TOOD: warning here
                    }
                    return;
                  }

                  case NotificationMessageTypeEnum.Reaction: {
                    this.client.emit(
                      "Reaction",
                      new ReactionEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          id: message.id,
                          reaction: new ReactionMessage({
                            emoji: message.reaction.emoji,
                            messageId: message.reaction.message_id,
                          }),
                          timestamp: message.timestamp,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );
                    return;
                  }

                  case NotificationMessageTypeEnum.Location: {
                    this.client.emit(
                      "LocationMessage",
                      new LocationMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          location: new LocationMessage({
                            address: message.location.address,
                            latitude: message.location.latitude,
                            longitude: message.location.latitude,
                            name: message.location.name,
                          }),
                          messageId: message.id,
                          timestamp: message.timestamp,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );
                    return;
                  }

                  case NotificationMessageTypeEnum.Sticker: {
                    this.client.emit(
                      "StickerMessage",
                      new StickerMessageEvent({
                        client: this.client,
                        data: {
                          from: message.from,
                          sticker: new StickerMessage({
                            id: message.sticker.id,
                          }),
                          messageId: message.id,
                          timestamp: message.timestamp,
                          mediaId: message.sticker.id,
                          mimeType: message.sticker.mime_type,
                          sha256: message.sticker.sha256,
                          isForwarded: message.context?.forwarded || false,
                        },
                      }),
                    );
                    return;
                  }
                  case NotificationMessageTypeEnum.Unknown: {
                    this.client.emit(
                      "UnknownEvent",
                      new UnknownEvent({
                        code: String(message.errors?.[0].code || ""),
                        message: message.errors?.[0].message || "",
                        title: message.errors?.[0].title || "",
                      }),
                    );
                    return;
                  }

                  default:
                    break;
                }
              });
            }
          });
        });
      }

      response.status(200).send();
    } else {
      console.error({
        parsedPayloadError: JSON.stringify(parsedPayload.error),
      });
      this.client.emit(
        "Error",
        new Error("Notification payload parsing failed"),
      );
      response.status(500).send();
    }
  }

  /**
   * Getter for the webhook endpoint
   * @returns {string} - The webhook endpoint
   * @memberof Webhook
   */
  getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Set new webhook endpoint (this will replace the previously set webhook endpoint)
   * @param {string} path - The new webhook endpoint
   * @memberof Webhook
   */
  setEndpoint(path: string) {
    this.endpoint = path;
  }

  /**
   * Returns current configured webhook port
   * @memberof Webhook
   * @returns {number}
   */
  getPort() {
    return this.port;
  }

  /**
   * Set new webhook port (this will replace the previously set webhook port)
   * @param {number} port - The new port to listen on
   * @memberof Webhook
   */
  setPort(port: number) {
    this.port = port;
  }

  /**
   * Returns if webhooks is listening
   * @returns {boolean}
   * @memberof Webhook
   */
  isListening(): boolean {
    return this.listening;
  }

  /**
   * Start listening for incoming webhook events
   * @memberof Webhook
   * @param {() => void} cb - The callback to be called when the server starts listening
   */
  listen(cb: () => void) {
    this.server.listen(this.port, cb);
    this.server.on("error", (error) => {
      console.error(error);
      // ! TODO: emit the error with JS error here
      // this.client.emit('Error', )
    });

    this.listening = true;
  }
}
