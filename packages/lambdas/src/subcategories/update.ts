import { z } from "zod";
import { Util } from "@athena/core/util";
import { GetItemCommand, UpdateItemCommand } from "dynamodb-toolbox";
import { SubcategoryEntity } from "../db/entities/SubcategoryEntity";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const subcategoryId = event?.pathParameters?.id;

  if (!subcategoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  try {
    const existingProduct = await SubcategoryEntity.build(GetItemCommand)
      .key({ id: subcategoryId })
      .send();

    if (!existingProduct.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Subcategory not found" }),
      };
    }

    const updateData = {
      id: subcategoryId,
      ...(data?.name && { subcategoryName: data.name }),
      ...(data?.categoryId && { categoryId: data.categoryId }),
      ...(data?.storeId && { storeId: data.storeId }),
    };

    const result = await SubcategoryEntity.build(UpdateItemCommand)
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
    console.error("Error updating subcategory:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the subcategory" }),
    };
  }
});
