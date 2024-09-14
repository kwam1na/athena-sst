import { Util } from "@athena/core/util";
import { OrganizationRepository } from "../db/repos/organizationRepository";

export const main = Util.handler(async (event) => {
  const organizationId = event?.pathParameters?.id;

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  const result = await OrganizationRepository.get(organizationId);

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Organization not found." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
});
