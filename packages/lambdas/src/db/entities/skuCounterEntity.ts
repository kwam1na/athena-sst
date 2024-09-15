import { Entity, number, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const SkuCounterEntity = new Entity({
  name: "SkuCounter",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("sk").key(),
    organizationId: string().required().savedAs("pk").key(),
    storeId: string().required(),
    categoryId: string().required(),
    subcategoryId: string().required(),
    lastUsed: number().required(),
  }),
});

export default SkuCounterEntity;
