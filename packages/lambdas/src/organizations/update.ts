import { Util } from "@athena/core/util";
import { OrganizationRepository } from "../db/repos/organizationRepository";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const organizationId = event?.pathParameters?.id;

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  try {
    const existingOrganization =
      await OrganizationRepository.get(organizationId);

    if (!existingOrganization.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Organization not found" }),
      };
    }

    const result = await OrganizationRepository.update(organizationId, data);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating organization:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the organization" }),
    };
  }
});
