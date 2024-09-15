import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table } from "dynamodb-toolbox";
import { Resource } from "sst";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const InventoryTable = new Table({
  documentClient: dynamoDbClient,
  name: Resource.Inventory.name,
  partitionKey: { name: "pk", type: "string" }, // Now represents organizationId
  sortKey: { name: "sk", type: "string" }, // Now represents id
  indexes: {
    byStoreId: {
      type: "global",
      partitionKey: { name: "storeId", type: "string" },
      sortKey: { name: "sk", type: "string" },
    },
    byCreatedByUserId: {
      type: "global",
      partitionKey: { name: "createdByUserId", type: "string" },
      sortKey: { name: "sk", type: "string" },
    },
  },
});

export default InventoryTable;
