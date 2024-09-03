import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";

export const main = Util.handler(async (event) => {
  const id = event?.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  await SubcategoryRepository.remove(id);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
