import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to retrieve the full error object based on its path
export const getErrorForField = (error: ZodError | null, fieldPath: string) => {
  return error?.issues?.find((issue) => issue.path.join(".") === fieldPath);
};
