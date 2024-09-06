import { z } from "zod";

export const productSchema = z.object({
  availability: z.string(),
  inventoryCount: z.number().min(0),
  categoryId: z.string(),
  currency: z.string(),
  subcategoryId: z.string(),
  sku: z.string().min(3).optional(),
  productName: z.string().min(3),
  price: z.number().min(0),
  unitCost: z.number().min(0),
});

export type ProductType = z.infer<typeof productSchema>;

export type ProductResponse = ProductType & { id: string };
