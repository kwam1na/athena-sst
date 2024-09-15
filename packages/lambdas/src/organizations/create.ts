import { z } from "zod";
import { Util } from "@athena/core/util";
import { OrganizationRepository } from "../db/repos/organizationRepository";
import { organizationSchema, OrganizationType } from "../schemas/organization";

export const main = Util.handler(async (event) => {
  let data: OrganizationType | undefined;

  if (event.body != null) {
    try {
      data = organizationSchema.parse(JSON.parse(event.body));
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

  const store = await OrganizationRepository.create(data);

  return {
    statusCode: 200,
    body: JSON.stringify(store),
  };
});
