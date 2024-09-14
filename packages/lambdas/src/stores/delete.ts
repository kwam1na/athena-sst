import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";

export const main = Util.handler(async (event) => {
  const storeId = event?.pathParameters?.id;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required" }),
    };
  }

  await StoreRepository.remove(storeId);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
