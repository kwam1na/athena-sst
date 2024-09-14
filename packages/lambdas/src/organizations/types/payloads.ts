import { z } from "zod";

export const organizationSchema = z.object({
  organizationName: z.string(),
  createdByUserId: z.string(),
});

export type CreateOrganizationPayload = z.infer<typeof organizationSchema>;
