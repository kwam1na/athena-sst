import { Util } from "@athena/core/util";
import { CategoryRepository } from "../db/repos/categoryRepository";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const categoryId = event?.pathParameters?.categoryId;
  const storeId = event?.pathParameters?.storeId;
  const organizationId = event?.pathParameters?.organizationId;

  if (!categoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required" }),
    };
  }

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  await Promise.all([
    CategoryRepository.remove(organizationId, categoryId),
    SubcategoryRepository.removeAllSubcategoriesByStoreId(storeId, {
      categoryId,
    }),
  ]);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
