import { Entity, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const UserEntity = new Entity({
  name: "User",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("sk").key(),
    organizationId: string().required().savedAs("pk").key(),
    activeStoreId: string().required(),
    email: string().optional(),
    firstName: string().required(),
    lastName: string().required(),
    role: string().required(),
  }),
});

export default UserEntity;
