import { Util } from "@athena/core/util";
import { ProductRepository } from "../db/repos/productRepository";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const productId = event?.pathParameters?.productId;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  try {
    const existingProduct = await ProductRepository.get(productId);

    if (!existingProduct.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Product not found" }),
      };
    }

    let warning;

    // if updating sku, check that a record doesn't already exist
    if (data.sku && data.storeId) {
      const existingProductWithSku = await ProductRepository.find(
        data.storeId,
        { sku: data.sku }
      );

      if (existingProductWithSku && productId != existingProductWithSku?.id) {
        delete data.sku;
        warning = "SKU already assigned to a different product.";
      }
    }

    const result = await ProductRepository.update(productId, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ product: result.Attributes, warning }),
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the product" }),
    };
  }
});
