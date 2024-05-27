import { z } from "zod";
import { MessageStatusEnum } from "../../webhook/type";
import { ErrorSchemaType } from "../message/schema";

export enum MediaTypeEnum {
  // Audio
  AAC = "audio/aac",
  AMR = "audio/amr",
  MP3 = "audio/mpeg",
  MP4_AUDIO = "audio/mp4",
  OGG_AUDIO = "audio/ogg",

  // Document
  TEXT = "text/plain",
  MS_EXCEL = "application/vnd.ms-excel",
  MS_EXCEL_X = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  MS_WORD = "application/msword",
  MS_WORD_X = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  MS_POWERPOINT = "application/vnd.ms-powerpoint",
  MS_POWERPOINT_X = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PDF = "application/pdf",

  // Image
  JPEG = "image/jpeg",
  PNG = "image/png",
  WEBP = "image/webp",

  // Sticker
  ANIMATED_STICKER = "image/webp",
  STATIC_STICKER = "image/webp",

  // Video
  _3GPP = "video/3gp",
  MP4_VIDEO = "video/mp4",
}

export const MediaUploadSuccessResponseSchemaType = z.object({
  mediaId: z.string(),
});

export const MediaUploadResponseSchemaType = z
  .object({
    status: z.literal("success"),
    data: MediaUploadSuccessResponseSchemaType,
  })
  .or(
    z.object({
      status: z.literal("error"),
      error: ErrorSchemaType,
    }),
  );
