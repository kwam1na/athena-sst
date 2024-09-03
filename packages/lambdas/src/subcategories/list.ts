import { Util } from "@athena/core/util";
import { Query, QueryCommand } from "dynamodb-toolbox";
import { ProductTable } from "../db/ProductTable";
import { SubcategoryEntity } from "../db/entities/SubcategoryEntity";

export const main = Util.handler(async (event) => {
  const storeId = event.queryStringParameters?.storeId;

  if (!storeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Store ID is required." }),
    };
  }

  const query: Query<typeof ProductTable> = {
    index: "byStoreId",
    partition: storeId,
  };

  const { Items } = await ProductTable.build(QueryCommand)
    .query(query)
    .entities(SubcategoryEntity)
    .send();

  return {
    statusCode: 200,
    body: JSON.stringify({
      subcategories: Items,
    }),
  };
});
