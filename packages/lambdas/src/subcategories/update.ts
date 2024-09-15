import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

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

  try {
    const existingProduct = await SubcategoryRepository.get(
      organizationId,
      subcategoryId
    );

    if (!existingProduct.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Subcategory not found" }),
      };
    }

    const result = await SubcategoryRepository.update(
      organizationId,
      subcategoryId,
      data
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the subcategory" }),
    };
  }
});
