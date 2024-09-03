import { z } from "zod";
import { Util } from "@athena/core/util";
import { CategoryEntity } from "../db/entities/CategoryEntity";
import { GetItemCommand, UpdateItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const categoryId = event?.pathParameters?.id;

  if (!categoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Product ID is required" }),
    };
  }

  try {
    const existingProduct = await CategoryEntity.build(GetItemCommand)
      .key({ pk: categoryId })
      .send();

    if (!existingProduct.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Category not found" }),
      };
    }

    const updateData = {
      pk: categoryId,
      ...(data?.name && { categoryName: data.name }),
      ...(data?.storeId && { storeId: data.storeId }),
    };

    const result = await CategoryEntity.build(UpdateItemCommand)
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
