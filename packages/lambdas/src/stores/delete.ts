import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";
import { CategoryRepository } from "../db/repos/categoryRepository";
import { SkuCounterRepository } from "../db/repos/skuCounterRepository";

export const main = Util.handler(async (event) => {
  const storeId = event?.pathParameters?.storeId;
  const organizationId = event?.pathParameters?.organizationId;

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

  const store = await StoreRepository.get(organizationId, storeId);

  if (!store.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "No store with the given id" }),
    };
  }

  await Promise.all([
    SkuCounterRepository.removeAllSkuCountersByStoreId(storeId),
    SubcategoryRepository.removeAllSubcategoriesByStoreId(storeId),
    CategoryRepository.removeAllCategoriesByStoreId(storeId),
    StoreRepository.remove(organizationId, storeId),
  ]);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
