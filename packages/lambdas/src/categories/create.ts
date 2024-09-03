import * as uuid from "uuid";
import { z } from "zod";
import { Util } from "@athena/core/util";
import { CategoryEntity } from "../db/entities/CategoryEntity";
import { PutItemCommand, PutItemInput } from "dynamodb-toolbox";
import { CreateCategoryPayload } from "./types/payloads";

const CategorySchema = z.object({
  name: z.string(),
  storeId: z.string(),
});

export const main = Util.handler(async (event) => {
  let data: CreateCategoryPayload | undefined;

  if (event.body != null) {
    try {
      data = CategorySchema.parse(JSON.parse(event.body));
    } catch (e) {
      if (e instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: e.errors }),
        };
      } else {
        throw e;
      }
    }
  }

  if (!data) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Body missing" }),
    };
  }

  const id = uuid.v1();
  const item: PutItemInput<typeof CategoryEntity> = {
    id,
    pk: id,
    storeId: data?.storeId,
    createdByUserId: "1",
    categoryName: data?.name,
  };

  await CategoryEntity.build(PutItemCommand).item(item).send();

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
});
