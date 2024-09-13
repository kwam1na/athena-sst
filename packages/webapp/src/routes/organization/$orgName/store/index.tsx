import StoreView from "@/components/StoreView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/$orgName/store/")({
  component: StoreView,
});