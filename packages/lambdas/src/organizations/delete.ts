import { Util } from "@athena/core/util";
import { OrganizationRepository } from "../db/repos/organizationRepository";

export const main = Util.handler(async (event) => {
  const organizationId = event?.pathParameters?.organizationId;

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  await OrganizationRepository.remove(organizationId);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
