export type CreateProductPayload = {
  availability: string;
  categoryId?: string;
  currency: string;
  inventoryCount: number;
  productName: string;
  price: number;
  sku?: string;
  storeId: string;
  subcategoryId?: string;
  unitCost: number;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;
