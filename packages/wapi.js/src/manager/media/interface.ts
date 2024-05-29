import { type z } from "zod";
import { type BaseManagerInterface } from "../base/interface";
import { type CloudApiGetMediaUrlRequestSuccessResponseSchemaType } from "../../client/schema";

/**
 * Media manager interface
 * @interface
 * @extends {BaseManagerInterface}
 */
export interface MediaManagerInterface extends BaseManagerInterface {
  /**
   * Get the URL of a media file by its ID
   * @param {string} mediaId - The ID of the media file
   * @returns {Promise<z.infer<typeof GetMediaUrlResponseBodySchemaType>>} The URL of the media file
   */
  getUrl: (
    mediaId: string,
  ) => Promise<
    z.infer<typeof CloudApiGetMediaUrlRequestSuccessResponseSchemaType>
  >;

  /**
   * Delete a media file by its ID
   * @param {string} mediaId - The ID of the media file to delete
   * @returns {Promise<boolean>} A boolean indicating whether the deletion was successful
   */
  delete: (mediaId: string) => Promise<boolean>;
}
