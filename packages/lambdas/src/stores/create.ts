import { z } from "zod";
import { Util } from "@athena/core/util";
import { CreateStorePayload, storeSchema } from "./types/payloads";
import { StoreRepository } from "../db/repos/storeRepository";
import { OrganizationRepository } from "../db/repos/organizationRepository";

export const main = Util.handler(async (event) => {
  let data: CreateStorePayload | undefined;

  if (event.body != null) {
    try {
      data = storeSchema.parse(JSON.parse(event.body));
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

  const organization = await OrganizationRepository.get(data.organizationId);

  if (!organization.Item) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No organization with the id provided" }),
    };
  }

  const store = await StoreRepository.create(data);

  return {
    statusCode: 200,
    body: JSON.stringify(store),
  };
});
