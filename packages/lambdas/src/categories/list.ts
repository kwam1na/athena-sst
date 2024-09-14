import { Util } from "@athena/core/util";
import { CategoryRepository } from "../db/repos/categoryRepository";

export const main = Util.handler(async (event) => {
  const storeId = event.queryStringParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  const { Items, LastEvaluatedKey } = await CategoryRepository.list(storeId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      categories: Items,
      lastEvaluatedKey: LastEvaluatedKey,
    }),
  };
});
