export type CreateProductPayload = {
  categoryId?: string;
  currency: string;
  inventoryCount: number;
  name: string;
  price: number;
  sku?: string;
  storeId: string;
  subcategoryId?: string;
  unitCost: number;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;
