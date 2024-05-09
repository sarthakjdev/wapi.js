import { z } from "zod";
import { InteractiveMessageTypeEnum } from "./interface";
import {
  ExternalDocumentMediaObjectSchemaType,
  ExternalImageMediaObjectType,
  ExternalVideoMediaObjectType,
  MetaDocumentMediaObjectSchemaType,
  MetaImageMediaObjectSchemaType,
  MetaVideoMediaObjectSchemaType,
} from "../media/schema";

export enum HeaderTypeEnum {
  Text = "text",
  Video = "video",
  Image = "image",
  Document = "document",
}

export const ButtonComponentSchemaType = z.object({
  type: z.literal("reply"),
  reply: z.object({
    title: z.string(),
    id: z.string(),
  }),
});
const ImageHeaderObjectSchemaType = z.object({
  type: z.literal(HeaderTypeEnum.Image),
  image: MetaImageMediaObjectSchemaType.or(ExternalImageMediaObjectType),
});

const VideoHeaderObjectSchemaType = z.object({
  type: z.literal(HeaderTypeEnum.Video),
  video: MetaVideoMediaObjectSchemaType.or(ExternalVideoMediaObjectType),
});

const DocumentHeaderObjectSchemaType = z.object({
  type: z.literal(HeaderTypeEnum.Document),
  document: MetaDocumentMediaObjectSchemaType.or(
    ExternalDocumentMediaObjectSchemaType,
  ),
});

const TextHeaderObjectSchemaType = z.object({
  type: z.literal(HeaderTypeEnum.Text),
  text: z.string(),
});

export const InteractiveMessageHeaderSchemaType = z.union([
  TextHeaderObjectSchemaType,
  VideoHeaderObjectSchemaType,
  DocumentHeaderObjectSchemaType,
  ImageHeaderObjectSchemaType,
]);

// * reference: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#interactive-object
export const InteractiveMessageBuilderParamsSchemaType = z
  .object({
    type: z.literal(InteractiveMessageTypeEnum.Product),
    bodyText: z.string().optional(),
    catalogId: z.string(),
    productRetailerId: z.string(),
  })
  .or(
    z.object({
      type: z.literal(InteractiveMessageTypeEnum.List),
      bodyText: z.string(),
      buttonText: z.string(),
      sections: z.array(z.object({})).min(1),
    }),
  )
  .or(
    z.object({
      type: z.literal(InteractiveMessageTypeEnum.Button),
      bodyText: z.string(),
      buttons: z.array(ButtonComponentSchemaType).min(1).max(3),
    }),
  )
  .or(
    z.object({
      type: z.literal(InteractiveMessageTypeEnum.Catalog),
      bodyText: z.string(),
    }),
  )
  .or(
    z.object({
      type: z.literal(InteractiveMessageTypeEnum.ProductList),
      bodyText: z.string(),
      header: z.object({}),
      catalogId: z.string(),
      productRetailerId: z.string(),
    }),
  )
  .and(
    z.object({
      footerText: z.string().optional(),
    }),
  );
