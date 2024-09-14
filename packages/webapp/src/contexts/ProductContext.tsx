import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { productSchema, ProductType } from "@/lib/schemas/product";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getProduct } from "@/api/product";
import { ImageFile } from "@/components/ui/image-uploader";
import useGetActiveStore from "@/hooks/useGetActiveStore";

type ProductContextType = {
  error: ZodError | null;
  isLoading: boolean;
  didProvideRequiredData: () => boolean;
  updateError: (error: ZodError | null) => void;
  images: ImageFile[];
  updateImages: Dispatch<SetStateAction<ImageFile[]>>;
  productData: Partial<ProductType>;
  updateProductData: (newData: Partial<ProductType>) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setProductData] = useState<Partial<ProductType>>({
    availability: "draft",
  });

  const [error, setError] = useState<ZodError | null>(null);

  const [images, updateImages] = useState<ImageFile[]>([]);

  const updateProductData = (newData: Partial<ProductType>) => {
    setProductData((prevData) => ({ ...prevData, ...newData }));
  };

  const updateError = (error: ZodError | null) => {
    setError(error);
  };

  const didProvideRequiredData = () => {
    try {
      productSchema.parse({
        ...productData,
        currency: "ghs",
        storeId: "1",
        images: images.map((file) => file.file?.path || file.preview),
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const { productId } = useParams({ strict: false });

  const { activeStore } = useGetActiveStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      getProduct({
        organizationId: activeStore!.organizationId,
        storeId: activeStore!.id,
        productId: productId!,
      }),
    enabled: Boolean(productId && activeStore),
  });

  useEffect(() => {
    if (product) {
      updateProductData(product);

      const t = product.images.map((url) => ({ preview: url }));
      updateImages(t);
    }
  }, [product]);

  return (
    <ProductContext.Provider
      value={{
        images,
        updateImages,
        isLoading,
        didProvideRequiredData,
        productData,
        updateProductData,
        error,
        updateError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
