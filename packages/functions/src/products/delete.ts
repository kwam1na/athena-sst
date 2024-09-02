import { Util } from "@athena/core/util";
import { ProductEntity } from "./ProductEntity";
import { DeleteItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const productId = event?.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  await ProductEntity.build(DeleteItemCommand)
    .key({ productId: productId })
    .send();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
