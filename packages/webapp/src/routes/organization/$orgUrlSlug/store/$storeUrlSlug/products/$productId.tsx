import ProductView from "@/components/ProductView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId")({
  component: ProductView,
});
