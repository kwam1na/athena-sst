import { Link } from "@tanstack/react-router";
import Product from "./Product";
import View from "./View";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { productSchema } from "@/lib/schemas/product";
import { ProductProvider, useProductContext } from "../contexts/ProductContext";
import { ZodError } from "zod";

function ProductViewContent() {
  const { productData, updateError } = useProductContext();

  const handleSave = () => {
    console.log("saving ->", productData);
    try {
      productSchema.parse(productData);
      console.log("Saving product:", productData);
      updateError(null);
    } catch (error) {
      updateError(error as ZodError);
    }
  };

  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px] justify-between">
        <Link to="/products" className="flex items-center gap-2">
          <Button variant="ghost" className="h-8 px-2 lg:px-3 ">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <p className="text-sm">Add Product</p>
        </Link>

        <div className="flex space-x-2">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    );
  };

  return (
    <View header={<Navigation />}>
      <Product />
    </View>
  );
}

export default function ProductView() {
  return (
    <ProductProvider>
      <ProductViewContent />
    </ProductProvider>
  );
}
