import { z } from "zod";
import { Util } from "@athena/core/util";
import { CreateCategoryPayload } from "./types/payloads";
import { CategoryRepository } from "../db/repos/categoryRepository";

const CategorySchema = z.object({
  categoryName: z.string(),
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

  const category = await CategoryRepository.create(data);

  return {
    statusCode: 200,
    body: JSON.stringify(category),
  };
});