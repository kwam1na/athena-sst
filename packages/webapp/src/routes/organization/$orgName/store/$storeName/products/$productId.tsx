import ProductView from "@/components/ProductView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/$orgName/store/$storeName/products/$productId")({
  component: ProductView,
});
