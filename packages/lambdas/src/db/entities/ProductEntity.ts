import { Entity, list, number, schema, string } from "dynamodb-toolbox";
import InventoryTable from "../tables/inventoryTable";

const ProductEntity = new Entity({
  name: "Product",
  table: InventoryTable,
  schema: schema({
    availability: string().required(),
    categoryId: string().optional(),
    currency: string().required(),
    createdByUserId: string().required(),
    inventoryCount: number().required(),
    id: string().required().savedAs("pk").key(),
    productName: string().required(),
    images: list(string()),
    price: number().required(),
    sku: string().optional(),
    storeId: string().required(),
    subcategoryId: string().optional(),
    unitCost: number().required(),
  }),
});

export default ProductEntity;
