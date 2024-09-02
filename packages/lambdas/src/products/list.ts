import { Resource } from "sst";
import { Util } from "@athena/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const storeId = event.queryStringParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  const params = {
    TableName: Resource.DB.name,
    IndexName: "storeIdIndex",
    KeyConditionExpression: "storeId = :storeId",
    ExpressionAttributeValues: {
      ":storeId": storeId,
    },
  };

  const result = await dynamoDb.send(new QueryCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify({
      products: result.Items,
    }),
  };
});
