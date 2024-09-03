import { Entity, schema, string } from "dynamodb-toolbox";
import { ProductTable } from "../ProductTable";

export const SubcategoryEntity = new Entity({
  name: "Subcategory",
  table: ProductTable,
  schema: schema({
    id: string().required().savedAs("pk").key(),
    storeId: string().required(),
    categoryId: string().required(),
    subcategoryName: string().required(),
    description: string().optional(),
    createdByUserId: string().required(),
  }),
});
