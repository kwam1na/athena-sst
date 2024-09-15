import { Util } from "@athena/core/util";
import { ProductRepository } from "../db/repos/productRepository";

export const main = Util.handler(async (event) => {
  const storeId = event.pathParameters?.storeId;
  const organizationId = event.pathParameters?.organizationId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required." }),
    };
  }

  const products = await ProductRepository.list(storeId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      products: products.Items,
      lastEvaluatedKey: products.LastEvaluatedKey,
    }),
  };
});
