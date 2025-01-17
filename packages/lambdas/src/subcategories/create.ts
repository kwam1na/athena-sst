import { z } from "zod";
import { Util } from "@athena/core/util";
import { SubcategoryRepository } from "../db/repos/subcategoryRepository";
import { subcategorySchema, SubcategoryType } from "../schemas/subcategory";

export const main = Util.handler(async (event) => {
  let data: SubcategoryType | undefined;

  if (event.body != null) {
    try {
      data = subcategorySchema.parse(JSON.parse(event.body));
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

  const subcategory = await SubcategoryRepository.create(data);

  return {
    statusCode: 200,
    body: JSON.stringify(subcategory),
  };
});
