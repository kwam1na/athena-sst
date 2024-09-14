import { Util } from "@athena/core/util";
import { ProductRepository } from "../db/repos/productRepository";

export const main = Util.handler(async (event) => {
  const storeId = event?.queryStringParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required" }),
    };
  }

  await ProductRepository.removeAllProductsByStoreId(storeId);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
