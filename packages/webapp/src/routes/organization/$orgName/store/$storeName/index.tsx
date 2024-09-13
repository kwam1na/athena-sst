import ProductsView from "@/components/ProductsView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/organization/$orgName/store/$storeName/"
)({
  component: ProductsView,
});
