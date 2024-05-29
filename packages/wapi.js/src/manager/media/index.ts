import { type z } from "zod";
import { type Client } from "../../client";
import { BaseManager } from "../base";
import { type MediaManagerInterface } from "./interface";
import {
  CloudApiGetMediaUrlRequestSuccessResponseSchemaType,
  CloudApiResponseSchemaType,
  type CloudApiRequestResourceType,
} from "../../client/schema";
import { type MediaUploadResponseSchemaType } from "./schema";


/**
 * Manager to handle media.
 * @class
 * @implements {MediaManagerInterface}
 * @extends {BaseManager}
 */
export class MediaManager extends BaseManager implements MediaManagerInterface {
  client: Client;

  /**
   * Creates an instance of MediaManager.
   * @constructor
   * @param {Object} props - The properties for the MediaManager.
   * @param {Client} props.client - The client instance.
   */
  constructor(props: { client: Client }) {
    super(props.client);
    this.client = props.client;
  }

  /**
   * Get the URL of a media by its ID.
   * @param {string} mediaId - The ID of the media.
   * @memberof MediaManager
   * @returns {Promise<z.infer<typeof GetMediaUrlResponseBodySchemaType>>} - A promise that resolves to the URL of the media.
   */
  async getUrl(
    mediaId: string,
  ): Promise<
    z.infer<typeof CloudApiGetMediaUrlRequestSuccessResponseSchemaType>
  > {
    const response =
      await this.client.requester.requestCloudApi<CloudApiRequestResourceType.Media>(
        {
          path: `/${mediaId}`,
          method: "GET",
        },
      );

    const parsedResponse =
      CloudApiGetMediaUrlRequestSuccessResponseSchemaType.safeParse(response);

    if (parsedResponse.success) {
      return parsedResponse.data;
    } else {
      throw new Error("Something went wrong while getting media URL");
    }
  }

  /**
   * Delete uploaded media on WhatsApp using the media ID.
   * @param {string} mediaId - The ID of the media to delete.
   * @memberof MediaManager
   * @returns {Promise<boolean>} - A promise that resolves to true if the media is deleted successfully.
   */
  async delete(mediaId: string): Promise<boolean> {
    const response =
      await this.client.requester.requestCloudApi<CloudApiRequestResourceType.Media>(
        {
          path: `/${mediaId}`,
          method: "DELETE",
        },
      );

    if ("success" in response) {
      return true;
    } else {
      return false;
    }
  }
}
