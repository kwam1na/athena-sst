import { Entity, number, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const ProductEntity = new Entity({
  name: "Product",
  table: InventoryTable,
  schema: schema({
    categoryId: string().optional(),
    currency: string().required(),
    createdByUserId: string().required(),
    inventoryCount: number().required(),
    id: string().required().savedAs("pk").key(),
    productName: string().required(),
    price: number().required(),
    sku: string().optional(),
    storeId: string().required(),
    subcategoryId: string().optional(),
    unitCost: number().required(),
  }),
});

export default ProductEntity;
