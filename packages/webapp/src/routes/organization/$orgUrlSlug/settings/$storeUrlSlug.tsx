import StoreSettingsView from "@/components/StoreSettingsView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/organization/$orgUrlSlug/settings/$storeUrlSlug"
)({
  component: StoreSettingsView,
});
