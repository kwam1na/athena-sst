import OrganizationView from "@/components/OrganizationView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/$orgName/")({
  component: OrganizationView,
});