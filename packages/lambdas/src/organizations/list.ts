import { Util } from "@athena/core/util";
import { OrganizationRepository } from "../db/repos/organizationRepository";

export const main = Util.handler(async (event) => {
  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required." }),
    };
  }

  const organizations = await OrganizationRepository.listByCreator(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      organizations,
    }),
  };
});
