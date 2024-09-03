import { Entity, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const CategoryEntity = new Entity({
  name: "Category",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("pk").key(),
    storeId: string().required(),
    categoryName: string().required(),
    description: string().optional(),
    createdByUserId: string().required(),
  }),
});

export default CategoryEntity;
