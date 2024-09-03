import { Util } from "@athena/core/util";
import { DeleteItemCommand } from "dynamodb-toolbox";
import { SubcategoryEntity } from "../db/entities/SubcategoryEntity";

export const main = Util.handler(async (event) => {
  const id = event?.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Subcategory ID is required" }),
    };
  }

  await SubcategoryEntity.build(DeleteItemCommand).key({ id }).send();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
});
