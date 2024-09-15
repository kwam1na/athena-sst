import { Entity, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const OrganizationEntity = new Entity({
  name: "Organization",
  table: InventoryTable,
  schema: schema({
    id: string().required().savedAs("pk").key(),
    _et: string().required().default("Organization").savedAs("sk").key(),
    organizationName: string().required(),
    organizationUrlSlug: string(),
    createdByUserId: string().required(),
  }),
});

export default OrganizationEntity;
