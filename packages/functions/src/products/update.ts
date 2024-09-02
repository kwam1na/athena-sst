import { z } from "zod";
import { Util } from "@athena/core/util";
import { UpdateProductPayload } from "./types";
import { ProductEntity } from "./ProductEntity";
import { GetItemCommand, UpdateItemCommand } from "dynamodb-toolbox";

const UpdateProductPayloadSchema = z.object({
  categoryId: z.string().optional(),
  currency: z.string().optional(),
  inventoryCount: z.number().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
  sku: z.string().optional(),
  subcategoryId: z.string().optional(),
  unitCost: z.number().optional(),
});

export const main = Util.handler(async (event) => {
  let data: UpdateProductPayload | undefined;

  if (event.body != null) {
    try {
      data = UpdateProductPayloadSchema.parse(JSON.parse(event.body));
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

  const productId = event?.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  try {
    // First, check if the product exists
    const getCommand = ProductEntity.build(GetItemCommand);
    const existingProduct = await getCommand
      .key({ productId: productId })
      .send();

    if (!existingProduct.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Product not found" }),
      };
    }

    const updateItemCommand = ProductEntity.build(UpdateItemCommand);

    const updateData = {
      productId: productId,
      ...(data?.categoryId && { categoryId: data.categoryId }),
      ...(data?.inventoryCount !== undefined && {
        inventoryCount: data.inventoryCount,
      }),
      ...(data?.name && { productName: data.name }),
      ...(data?.currency && { currency: data.currency }),
      ...(data?.price !== undefined && { price: data.price }),
      ...(data?.sku !== undefined && { sku: data.sku }),
      ...(data?.subcategoryId && { subcategoryId: data.subcategoryId }),
      ...(data?.unitCost !== undefined && { unitCost: data.unitCost }),
    };

    const result = await updateItemCommand
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the product" }),
    };
  }
});
