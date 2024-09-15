// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Product_Images");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Inventory", {
  fields: {
    pk: "string",
    sk: "string",
    storeId: "string",
    createdByUserId: "string",
  },
  primaryIndex: { hashKey: "pk", rangeKey: "sk" },
  globalIndexes: {
    byStoreId: {
      hashKey: "storeId",
      rangeKey: "sk",
    },
    byCreatedByUserId: {
      hashKey: "createdByUserId",
      rangeKey: "sk",
    },
  },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");

export const awsAcessKey = new sst.Secret("AWSAccessKey");

export const awsSecretKey = new sst.Secret("AWSSecretKey");
