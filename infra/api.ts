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

// Products
api.route("POST /products", "packages/lambdas/src/products/create.main");
api.route("PUT /products/{id}", "packages/lambdas/src/products/update.main");
api.route("GET /products/{id}", "packages/lambdas/src/products/get.main");
api.route("GET /products", "packages/lambdas/src/products/list.main");
api.route("DELETE /products/{id}", "packages/lambdas/src/products/delete.main");

// Categories
api.route("POST /categories", "packages/lambdas/src/categories/create.main");
api.route(
  "PUT /categories/{id}",
  "packages/lambdas/src/categories/update.main"
);
api.route("GET /categories/{id}", "packages/lambdas/src/categories/get.main");
api.route("GET /categories", "packages/lambdas/src/categories/list.main");
api.route(
  "DELETE /categories/{id}",
  "packages/lambdas/src/categories/delete.main"
);
