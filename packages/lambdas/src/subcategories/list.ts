import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const storeId = event.queryStringParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  const subcategories = await SubcategoryRepository.list(storeId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      subcategories,
    }),
  };
});
