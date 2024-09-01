import { Resource } from "sst";
import type { AppRouter } from "../trpc/index";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: Resource.Trpc.url,
    }),
  ],
});

export async function handler() {
  return {
    statusCode: 200,
    body: await client.greet.query({ name: "Eren Jaegar" }),
  };
}
