import { z } from "zod";

export const organizationSchema = z.object({
  organizationName: z.string().min(3),
  createdByUserId: z.string(),
});

export type OrganizationType = z.infer<typeof organizationSchema>;

export type OrganizationResponse = OrganizationType & {
  id: string;
  organizationUrlSlug: string;
};

export type OrganizationsResponse = {
  organizations: OrganizationResponse[];
};
