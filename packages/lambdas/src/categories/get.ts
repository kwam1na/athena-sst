import { Util } from "@athena/core/util";
import { CategoryEntity } from "../db/entities/CategoryEntity";
import { GetItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const categoryId = event?.pathParameters?.id;

  if (!categoryId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  const result = await CategoryEntity.build(GetItemCommand)
    .key({ pk: categoryId })
    .send();

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
