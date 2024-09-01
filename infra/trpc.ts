export const trpc = new sst.aws.Function("Trpc", {
  url: true,
  handler: "packages/trpc/index.handler",
});

export const client = new sst.aws.Function("Client", {
  url: true,
  link: [trpc],
  handler: "packages/client/index.handler",
});
