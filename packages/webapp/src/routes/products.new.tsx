import ProductView from "@/components/ProductView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/new")({
  component: ProductView,
});
