import OrganizationsView from "@/components/OrganizationsView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/")({
  component: OrganizationsView,
});
