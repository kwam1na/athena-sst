import React, { createContext, useContext, useEffect, useState } from "react";
import { productSchema, ProductType } from "@/lib/schemas/product";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getProduct } from "@/api/product";

type ProductContextType = {
  error: ZodError | null;
  isLoading: boolean;
  didProvideRequiredData: () => boolean;
  updateError: (error: ZodError | null) => void;
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
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  const { productId } = useParams({ strict: false });

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId || ""),
    enabled: !!productId,
  });

  useEffect(() => {
    if (product) {
      updateProductData(product);
    }
  }, [product]);

  return (
    <ProductContext.Provider
      value={{
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
