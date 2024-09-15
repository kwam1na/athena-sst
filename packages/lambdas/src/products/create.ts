import { z } from "zod";
import { Util } from "@athena/core/util";
import { ProductRepository } from "../db/repos/productRepository";
import { productSchema, ProductType } from "../schemas/product";

export const main = Util.handler(async (event) => {
  let data: ProductType | undefined;

  if (event.body != null) {
    try {
      data = productSchema.parse(JSON.parse(event.body));
    } catch (e) {
      if (e instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: e.errors }),
        };
      } else {
        throw e;
      }
    }
  }

  if (!data) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Body missing" }),
    };
  }

  const product = await ProductRepository.create(data);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
});
