// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Product_Images");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("InventoryDB", {
  fields: {
    pk: "string",
    storeId: "string",
    organizationId: "string",
    createdByUserId: "string",
  },
  primaryIndex: { hashKey: "pk" },
  globalIndexes: {
    byStoreId: {
      hashKey: "storeId",
    },
    byOrganizationId: {
      hashKey: "organizationId",
    },
    byCreatedByUserId: {
      hashKey: "createdByUserId",
    },
  },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");

export const awsAcessKey = new sst.Secret("AWSAccessKey");

export const awsSecretKey = new sst.Secret("AWSSecretKey");
