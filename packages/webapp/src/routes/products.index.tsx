import ProductsView from "@/components/ProductsView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: ProductsView,
});