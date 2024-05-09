import { z } from "zod";

export const MessageStatusSchemaType = z.object({
  deleted: z.boolean(),
  delivered: z.boolean(),
  sent: z.boolean(),
  failed: z.boolean(),
  read: z.boolean(),
  warning: z.string().nullish(),
});
