import { z } from "zod";

export const userSchema = z.object({
  organizationId: z.string(),
  activeStoreId: z.string(),
  userName: z.string(),
  firstName: z.string().min(3),
  lastName: z.string().min(1),
  role: z.string(),
  email: z.string().email().optional(),
});

export type UserType = z.infer<typeof userSchema>;

export type UserResponse = UserType & { id: string };
