import { z } from "zod";
import { Util } from "@athena/core/util";
import { CreateProductPayload } from "./types/payloads";
import { ProductRepository } from "../db/repos/productRepository";

const CreateProductPayloadSchema = z.object({
  availability: z.string(),
  categoryId: z.string().optional(),
  currency: z.string(),
  inventoryCount: z.number(),
  productName: z.string(),
  price: z.number(),
  sku: z.string().optional(),
  storeId: z.string(),
  subcategoryId: z.string().optional(),
  unitCost: z.number(),
});

export const main = Util.handler(async (event) => {
  let data: CreateProductPayload | undefined;

  if (event.body != null) {
    try {
      data = CreateProductPayloadSchema.parse(JSON.parse(event.body));
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
