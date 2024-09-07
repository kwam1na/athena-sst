import React, { createContext, useContext, useState } from "react";
import { productSchema, ProductType } from "@/lib/schemas/product";
import { ZodError } from "zod";

type ProductContextType = {
  error: ZodError | null;
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

  return (
    <ProductContext.Provider
      value={{
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
