import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Entity, number, schema, string, Table } from "dynamodb-toolbox";
import { Resource } from "sst";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const ProductsTable = new Table({
  documentClient: dynamoDbClient,
  name: Resource.DB.name,
  partitionKey: {
    name: "productId",
    type: "string",
  },
  indexes: {
    storeIdIndex: {
      type: "global",
      partitionKey: { name: "storeId", type: "string" },
    },
  },
});

export const ProductEntity = new Entity({
  name: "Product",
  table: ProductsTable,
  schema: schema({
    categoryId: string().optional(),
    currency: string().required(),
    createdByUserId: string().required(),
    inventoryCount: number().required(),
    productId: string().key(),
    productName: string().required(),
    price: number().required(),
    sku: string().optional(),
    storeId: string().required(),
    subcategoryId: string().optional(),
    unitCost: number().required(),
  }),
});
