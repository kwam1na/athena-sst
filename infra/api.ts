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

api.route("POST /products", "packages/functions/src/products/create.main");
api.route("PUT /products/{id}", "packages/functions/src/products/update.main");
api.route("GET /products/{id}", "packages/functions/src/products/get.main");
api.route("GET /products", "packages/functions/src/products/list.main");
api.route(
  "DELETE /products/{id}",
  "packages/functions/src/products/delete.main"
);
