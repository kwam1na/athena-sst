import { Entity, number, prefix, schema, string } from "dynamodb-toolbox";
import { ProductTable } from "../ProductTable";

export const ProductEntity = new Entity({
  name: "Product",
  table: ProductTable,
  schema: schema({
    categoryId: string().optional(),
    currency: string().required(),
    createdByUserId: string().required(),
    inventoryCount: number().required(),
    pk: string().transform(prefix("PRODUCT")).key(),
    id: string().required(),
    productName: string().required(),
    price: number().required(),
    sku: string().optional(),
    storeId: string().required(),
    subcategoryId: string().optional(),
    unitCost: number().required(),
  }),
});
