import { secret, table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("AthenaApi", {
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
  "PUT /organizations/{organizationId}",
  "packages/lambdas/src/organizations/update.main"
);
api.route(
  "GET /organizations/{organizationId}",
  "packages/lambdas/src/organizations/get.main"
);
api.route(
  "GET /users/me/organizations",
  "packages/lambdas/src/organizations/list.main"
);
api.route(
  "DELETE /organizations/{organizationId}",
  "packages/lambdas/src/organizations/delete.main"
);

// Stores
api.route(
  "POST /organizations/{organizationId}/stores",
  "packages/lambdas/src/stores/create.main"
);
api.route(
  "PUT /organizations/{organizationId}/stores/{storeId}",
  "packages/lambdas/src/stores/update.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}",
  "packages/lambdas/src/stores/get.main"
);
api.route(
  "GET /organizations/{organizationId}/stores",
  "packages/lambdas/src/stores/list.main"
);
api.route(
  "DELETE /organizations/{organizationId}/stores/{storeId}",
  "packages/lambdas/src/stores/delete.main"
);

// Products
api.route(
  "POST /organizations/{organizationId}/stores/{storeId}/products",
  "packages/lambdas/src/products/create.main"
);
api.route(
  "PUT /organizations/{organizationId}/stores/{storeId}/products/{productId}",
  "packages/lambdas/src/products/update.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/products/{productId}",
  "packages/lambdas/src/products/get.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/products",
  "packages/lambdas/src/products/list.main"
);
api.route(
  "DELETE /organizations/{organizationId}/stores/{storeId}/products/{productId}",
  "packages/lambdas/src/products/delete.main"
);
api.route(
  "DELETE /organizations/{organizationId}/stores/{storeId}/products",
  "packages/lambdas/src/products/deleteAll.main"
);

// Categories
api.route(
  "POST /organizations/{organizationId}/stores/{storeId}/categories",
  "packages/lambdas/src/categories/create.main"
);
api.route(
  "PUT /organizations/{organizationId}/stores/{storeId}/categories/{categoryId}",
  "packages/lambdas/src/categories/update.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/categories/{categoryId}",
  "packages/lambdas/src/categories/get.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/categories",
  "packages/lambdas/src/categories/list.main"
);
api.route(
  "DELETE /organizations/{organizationId}/stores/{storeId}/categories/{categoryId}",
  "packages/lambdas/src/categories/delete.main"
);

// Subcategories
api.route(
  "POST /organizations/{organizationId}/stores/{storeId}/subcategories",
  "packages/lambdas/src/subcategories/create.main"
);
api.route(
  "PUT /organizations/{organizationId}/stores/{storeId}/subcategories/{subcategoryId}",
  "packages/lambdas/src/subcategories/update.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/subcategories/{subcategoryId}",
  "packages/lambdas/src/subcategories/get.main"
);
api.route(
  "GET /organizations/{organizationId}/stores/{storeId}/subcategories",
  "packages/lambdas/src/subcategories/list.main"
);
api.route(
  "DELETE /organizations/{organizationId}/stores/{storeId}/subcategories/{subcategoryId}",
  "packages/lambdas/src/subcategories/delete.main"
);
