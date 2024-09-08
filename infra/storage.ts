// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Product_Images");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("InventoryDB", {
  fields: {
    pk: "string",
    storeId: "string",
  },
  primaryIndex: { hashKey: "pk" },
  globalIndexes: {
    byStoreId: {
      hashKey: "storeId",
    },
  },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");

export const awsAcessKey = new sst.Secret("AWSAccessKey");

export const awsSecretKey = new sst.Secret("AWSSecretKey");
