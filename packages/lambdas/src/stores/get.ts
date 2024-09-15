import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";

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

  const result = await StoreRepository.get(organizationId, storeId);

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
