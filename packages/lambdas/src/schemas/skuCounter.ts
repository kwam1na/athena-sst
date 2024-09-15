import { z } from "zod";

export const skuSchema = z.object({
  storeId: z.string(),
  organizationId: z.string(),
  categoryId: z.string(),
  subcategoryId: z.string(),
  lastUsed: z.number(),
});

export type SkuType = z.infer<typeof skuSchema>;
