import { Util } from "@athena/core/util";
import { CategoryRepository } from "../db/repos/categoryRepository";

export const main = Util.handler(async (event) => {
  const categoryId = event?.pathParameters?.id;

  if (!categoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  const result = await CategoryRepository.get(categoryId);

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Category not found." }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
});
