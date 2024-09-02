import { secret, table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, secret],
      },
      // args: {
      //   auth: { iam: true },
      // },
    },
  },
});

api.route("POST /products", "packages/lambdas/src/products/create.main");
api.route("PUT /products/{id}", "packages/lambdas/src/products/update.main");
api.route("GET /products/{id}", "packages/lambdas/src/products/get.main");
api.route("GET /products", "packages/lambdas/src/products/list.main");
api.route("DELETE /products/{id}", "packages/lambdas/src/products/delete.main");
