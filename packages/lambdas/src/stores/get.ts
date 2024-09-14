import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";

export const main = Util.handler(async (event) => {
  const storeId = event?.pathParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required" }),
    };
  }

  const result = await StoreRepository.get(storeId);

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Store not found." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
});
