import { Entity, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const StoreEntity = new Entity({
  name: "Store",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("sk").key(),
    organizationId: string().required().savedAs("pk").key(),
    currency: string().required(),
    storeName: string().required(),
    storeUrlSlug: string(),
    address: string().optional(),
    phoneNumber: string().optional(),
    createdByUserId: string().required(),
  }),
});

export default StoreEntity;
