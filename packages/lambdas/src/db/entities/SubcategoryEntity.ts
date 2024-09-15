import { Entity, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const SubcategoryEntity = new Entity({
  name: "Subcategory",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("sk").key(),
    organizationId: string().required().savedAs("pk").key(),
    storeId: string().required(),
    categoryId: string().required(),
    subcategoryName: string().required(),
    description: string().optional(),
    createdByUserId: string().required(),
  }),
});

export default SubcategoryEntity;
