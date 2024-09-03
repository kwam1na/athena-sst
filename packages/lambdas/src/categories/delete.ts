import { Util } from "@athena/core/util";
import { CategoryRepository } from "../db/repos/categoryRepository";

export const main = Util.handler(async (event) => {
  const id = event?.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  await CategoryRepository.remove(id);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
