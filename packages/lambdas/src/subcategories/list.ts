import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const storeId = event.pathParameters?.storeId;

  const categoryId = event?.queryStringParameters?.categoryId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  const { Items } = await SubcategoryRepository.list(
    storeId,
    undefined,
    undefined,
    {
      categoryId,
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      subcategories: Items,
    }),
  };
});
