import * as uuid from "uuid";
import { z } from "zod";
import { Util } from "@athena/core/util";
import { CreateProductPayload } from "./types";
import { ProductEntity } from "./ProductEntity";
import { PutItemCommand, PutItemInput } from "dynamodb-toolbox";

const CreateProductPayloadSchema = z.object({
  categoryId: z.string().optional(),
  currency: z.string(),
  inventoryCount: z.number(),
  name: z.string(),
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

  const item: PutItemInput<typeof ProductEntity> = {
    productId: uuid.v1(),
    categoryId: data?.categoryId,
    createdByUserId: "1",
    currency: data?.currency,
    inventoryCount: data?.inventoryCount,
    productName: data?.name,
    price: data?.price,
    sku: data?.sku,
    storeId: data?.storeId,
    subcategoryId: data?.subcategoryId,
    unitCost: data?.unitCost,
  };

  await ProductEntity.build(PutItemCommand)
    .item(item)
    .options({
      returnValues: "ALL_OLD",
    })
    .send();

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
});
