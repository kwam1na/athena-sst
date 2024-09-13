import { z } from "zod";

export const productSchema = z.object({
  availability: z.string(),
  id: z.string(),
  sku: z.string().optional(),
  productName: z.string(),
  images: z.array(z.string()),
});

export type Product = z.infer<typeof productSchema>;
