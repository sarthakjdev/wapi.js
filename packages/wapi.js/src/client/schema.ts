import { z } from "zod";
import { MessageStatusEnum } from "../webhook/type";

export const CloudApiSuccessResponseSchemaType = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
    }),
  ),
  messaging_product: z.literal("whatsapp"),
  contacts: z.array(
    z.object({
      input: z.string(),
      wa_id: z.string(),
    }),
  ),
});

export const CloudApiErrorResponseSchemaType = z.object({
  error: z.object({
    message: z.string(),
    type: z.string(),
    code: z.number(),
    error_data: z.object({
      messaging_product: z.string(),
      details: z.string(),
    }),
    error_subcode: z.string().optional(),
    fbtrace_id: z.string().optional(),
  }),
});

export const CloudApiResponseSchemaType = CloudApiSuccessResponseSchemaType.or(
  CloudApiErrorResponseSchemaType,
);

export const WapiMessageErrorResponseSchemaType = z.object({
  title: z.string(),
  description: z.string(),
  errorCode: z.number(),
  errorSubCode: z.string().optional(),
});

export const WapiMessageSuccessResponseSchemaType = z.object({
  messageId: z.string(),
  receiverPhoneNumber: z.string(),
  senderPhoneNumber: z.string(),
  status: z.nativeEnum(MessageStatusEnum),
});

export const WapiMessageResponseSchemaType = z
  .object({
    status: z.literal("success"),
    data: WapiMessageSuccessResponseSchemaType,
  })
  .or(
    z.object({
      status: z.literal("error"),
      error: WapiMessageErrorResponseSchemaType,
    }),
  );
