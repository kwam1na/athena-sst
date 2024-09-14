import { z } from "zod";

export const storeSchema = z.object({
  address: z.string().optional(),
  currency: z.string(),
  storeName: z.string(),
  organizationId: z.string(),
  phoneNumber: z.string().optional(),
  createdByUserId: z.string(),
});

export type CreateStorePayload = z.infer<typeof storeSchema>;

export type UpdateStorePayload = Partial<CreateStorePayload>;
