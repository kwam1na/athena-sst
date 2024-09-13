import SettingsView from "@/components/SettingsView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/$orgUrlSlug/settings/")({
  component: SettingsView,
});
