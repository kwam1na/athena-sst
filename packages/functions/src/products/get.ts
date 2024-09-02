import { Util } from "@athena/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ProductEntity } from "./ProductEntity";
import { GetItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const productId = event?.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  const getCommand = ProductEntity.build(GetItemCommand);
  const result = await getCommand.key({ productId: productId }).send();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Product not found." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
});
