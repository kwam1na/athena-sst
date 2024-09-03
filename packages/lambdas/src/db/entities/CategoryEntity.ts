import { Entity, prefix, schema, string } from "dynamodb-toolbox";
import { ProductTable } from "../ProductTable";

export const CategoryEntity = new Entity({
  name: "Category",
  table: ProductTable,
  schema: schema({
    id: string().required().savedAs("pk").key(),
    storeId: string().required(),
    categoryName: string().required(),
    description: string().optional(),
    createdByUserId: string().required(),
  }),
});
