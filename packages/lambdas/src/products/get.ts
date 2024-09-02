import { Util } from "@athena/core/util";
import { ProductEntity } from "./entities/ProductEntity";
import { GetItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const productId = event?.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  const result = await ProductEntity.build(GetItemCommand)
    .key({ productId })
    .send();

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
