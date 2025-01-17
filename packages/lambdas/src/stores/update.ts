import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

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

  try {
    const existingStore = await StoreRepository.get(organizationId, storeId);

    if (!existingStore.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Store not found" }),
      };
    }

    const result = await StoreRepository.update(organizationId, storeId, data);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating store:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the store" }),
    };
  }
});
