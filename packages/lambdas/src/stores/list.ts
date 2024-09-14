import { Util } from "@athena/core/util";
import { StoreRepository } from "../db/repos/storeRepository";

export const main = Util.handler(async (event) => {
  const organizationId = event.queryStringParameters?.organizationId;

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required." }),
    };
  }

  const stores = await StoreRepository.list(organizationId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      stores,
    }),
  };
});
