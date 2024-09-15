import { Util } from "@athena/core/util";
import { ProductRepository } from "../db/repos/productRepository";

export const main = Util.handler(async (event) => {
  const productId = event?.pathParameters?.productId;
  const organizationId = event?.pathParameters?.organizationId;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  const result = await ProductRepository.get(organizationId, productId);

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
