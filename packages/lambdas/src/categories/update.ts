import { Util } from "@athena/core/util";
import { CategoryRepository } from "../db/repos/categoryRepository";

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const categoryId = event?.pathParameters?.categoryId;

  if (!categoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  try {
    const existingCategory = await CategoryRepository.get(categoryId);

    if (!existingCategory.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Category not found" }),
      };
    }

    const result = await CategoryRepository.update(categoryId, data);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the category" }),
    };
  }
});
