import { Link, useNavigate } from "@tanstack/react-router";
import Product from "./Product";
import View from "./View";
import { Button } from "./ui/button";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { productSchema } from "@/lib/schemas/product";
import { ProductProvider, useProductContext } from "../contexts/ProductContext";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban } from "lucide-react";
import { createProduct } from "@/api/product";
import { LoadingButton } from "./ui/loading-button";

function ProductViewContent() {
  const { productData, updateError } = useProductContext();

  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: () => saveProduct(),
    onSuccess: () => {
      toast(`Product created`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });
      navigate({ to: "/products" });
    },
    onError: (e) => {
      if (e instanceof ZodError) return;
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  const saveProduct = async () => {
    updateError(null);
    try {
      const data = productSchema.parse({
        ...productData,
        currency: "ghs",
        storeId: "1",
      });

      console.log("sending data ->", data);
      return await createProduct(data);
    } catch (error) {
      updateError(error as ZodError);
      throw error;
    }
  };

  const onSubmit = () => {
    updateMutation.mutate();
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
          <LoadingButton
            isLoading={updateMutation.isPending}
            onClick={onSubmit}
          >
            Save
          </LoadingButton>
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
