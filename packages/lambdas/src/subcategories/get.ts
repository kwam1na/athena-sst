import { Util } from "@athena/core/util";
import { CategoryEntity } from "../db/entities/CategoryEntity";
import { GetItemCommand } from "dynamodb-toolbox";
import { SubcategoryEntity } from "../db/entities/SubcategoryEntity";

export const main = Util.handler(async (event) => {
  const subcategoryId = event?.pathParameters?.id;

  if (!subcategoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  const result = await SubcategoryEntity.build(GetItemCommand)
    .key({ id: subcategoryId })
    .send();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Subcategory not found." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
});
