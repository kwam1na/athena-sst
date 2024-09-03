import { Util } from "@athena/core/util";
import { CategoryEntity } from "../db/entities/CategoryEntity";
import { DeleteItemCommand } from "dynamodb-toolbox";

export const main = Util.handler(async (event) => {
  const id = event?.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Category ID is required" }),
    };
  }

  await CategoryEntity.build(DeleteItemCommand).key({ pk: id }).send();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
