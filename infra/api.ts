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

// Organization
api.route(
  "POST /organizations",
  "packages/lambdas/src/organizations/create.main"
);
api.route(
  "PUT /organizations/{id}",
  "packages/lambdas/src/organizations/update.main"
);
api.route(
  "GET /organizations/{id}",
  "packages/lambdas/src/organizations/get.main"
);
api.route("GET /organizations", "packages/lambdas/src/organizations/list.main");
api.route(
  "DELETE /organizations/{id}",
  "packages/lambdas/src/organizations/delete.main"
);

// Stores
api.route("POST /stores", "packages/lambdas/src/stores/create.main");
api.route("PUT /stores/{id}", "packages/lambdas/src/stores/update.main");
api.route("GET /stores/{id}", "packages/lambdas/src/stores/get.main");
api.route("GET /stores", "packages/lambdas/src/stores/list.main");
api.route("DELETE /stores/{id}", "packages/lambdas/src/stores/delete.main");

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

// Subcategories
api.route(
  "POST /subcategories",
  "packages/lambdas/src/subcategories/create.main"
);
api.route(
  "PUT /subcategories/{id}",
  "packages/lambdas/src/subcategories/update.main"
);
api.route(
  "GET /subcategories/{id}",
  "packages/lambdas/src/subcategories/get.main"
);
api.route("GET /subcategories", "packages/lambdas/src/subcategories/list.main");
api.route(
  "DELETE /subcategories/{id}",
  "packages/lambdas/src/subcategories/delete.main"
);
