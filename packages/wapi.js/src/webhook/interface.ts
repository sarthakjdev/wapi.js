/**
 * Represents the interface for a Webhook.
 * @interface WebhookInterface
 * @extends {EventEmitter}
 */
export interface WebhookInterface {
  /**
   * Gets the endpoint of the webhook.
   * @returns The endpoint URL.
   */
  getEndpoint(): string;

  /**
   * Sets the endpoint of the webhook.
   * @param path - The endpoint URL.
   */
  setEndpoint: (path: string) => void;

  /**
   * Gets the port number on which the webhook is listening.
   * @returns The port number.
   */
  getPort: () => number;

  /**
   * Sets the port number on which the webhook should listen.
   * @param port - The port number.
   */
  setPort: (port: number) => void;

  /**
   * Checks if the webhook is currently listening for incoming requests.
   * @returns A boolean indicating if the webhook is listening.
   */
  isListening: () => boolean;

  /**
   * Starts listening for incoming requests on the configured endpoint and port.
   * @param cb - A callback function to be executed when the webhook starts listening.
   */
  listen: (cb: () => void) => void;
}
