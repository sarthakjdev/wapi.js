import { type Client } from "../../../client";

/**
 * Represents the interface for the Customer Number Change event.
 * @interface CustomerNumberChangeEventInterface
 */
export interface CustomerNumberChangeEventInterface {
  /**
   * The client associated with the event.
   * @type {Client}
   */
  client: Client;

  /**
   * The description of the change.
   */
  changeDescription: string;

  /**
   * The new WhatsApp ID.
   */
  newWaId: string;

  /**
   * The timestamp of the event.
   */
  timestamp: number;

  /**
   * The old WhatsApp ID.
   */
  oldWaId: string;
}
