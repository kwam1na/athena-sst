/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "athena",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const { trpc, client } = await import("./infra/trpc");

    return {
      api: trpc.url,
      client: client.url,
    };
  },
});
