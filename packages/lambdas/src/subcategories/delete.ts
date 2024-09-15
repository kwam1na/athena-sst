import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const subcategoryId = event?.pathParameters?.subcategoryId;
  const organizationId = event?.pathParameters?.organizationId;

  if (!subcategoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  if (!organizationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Organization ID is required" }),
    };
  }

  await SubcategoryRepository.remove(organizationId, subcategoryId);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
