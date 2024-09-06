import { createFileRoute } from "@tanstack/react-router";
import ProductsView from "@/components/ProductsView";

export const Route = createFileRoute("/")({
  component: ProductsView,
});
