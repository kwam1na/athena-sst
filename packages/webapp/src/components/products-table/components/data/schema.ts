import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  sku: z.string().optional(),
  productName: z.string(),
});

export type Product = z.infer<typeof productSchema>;
