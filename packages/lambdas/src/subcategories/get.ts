import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const subcategoryId = event?.pathParameters?.subcategoryId;

  if (!subcategoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  const result = await SubcategoryRepository.get(subcategoryId);

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
