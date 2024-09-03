import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table } from "dynamodb-toolbox";
import { Resource } from "sst";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const InventoryTable = new Table({
  documentClient: dynamoDbClient,
  name: Resource.InventoryDB.name,
  partitionKey: { name: "pk", type: "string" },
  indexes: {
    byStoreId: {
      type: "global",
      partitionKey: { name: "storeId", type: "string" },
    },
  },
});

export default InventoryTable;
