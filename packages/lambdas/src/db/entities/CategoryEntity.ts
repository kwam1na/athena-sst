import { Entity, prefix, schema, string } from "dynamodb-toolbox";
import { ProductTable } from "../ProductTable";

export const CategoryEntity = new Entity({
  name: "Category",
  table: ProductTable,
  schema: schema({
    pk: string().transform(prefix("CATEGORY")).key(),
    id: string().required(),
    storeId: string().required(),
    categoryName: string().required(),
    description: string().optional(),
    createdByUserId: string().required(),
  }),
});
