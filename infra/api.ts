import { secret, table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, secret],
      },
      args: {
        auth: { iam: true },
      },
    },
  },
});
