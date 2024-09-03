import { Util } from "@athena/core/util";
import { ProductEntity } from "../db/entities/productEntity";
import { DeleteItemCommand } from "dynamodb-toolbox";
import { ProductRepository } from "../db/repos/productRepository";

export const main = Util.handler(async (event) => {
  const productId = event?.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  await ProductRepository.remove(productId);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
