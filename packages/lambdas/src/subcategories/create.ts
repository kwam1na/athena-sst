import * as uuid from "uuid";
import { z } from "zod";
import { Util } from "@athena/core/util";
import { PutItemCommand, PutItemInput } from "dynamodb-toolbox";
import { CreateSubategoryPayload } from "./types/payloads";
import { SubcategoryEntity } from "../db/entities/SubcategoryEntity";

const SubcategorySchema = z.object({
  name: z.string(),
  categoryId: z.string(),
  storeId: z.string(),
});

export const main = Util.handler(async (event) => {
  let data: CreateSubategoryPayload | undefined;

  if (event.body != null) {
    try {
      data = SubcategorySchema.parse(JSON.parse(event.body));
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
  const item: PutItemInput<typeof SubcategoryEntity> = {
    id,
    categoryId: data?.categoryId,
    storeId: data?.storeId,
    createdByUserId: "1",
    subcategoryName: data?.name,
  };

  await SubcategoryEntity.build(PutItemCommand).item(item).send();

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
});
