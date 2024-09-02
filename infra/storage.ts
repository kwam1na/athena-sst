// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Product_Images");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("DB", {
  fields: {
    productId: "string",
    storeId: "string",
  },
  primaryIndex: { hashKey: "productId" },
  globalIndexes: {
    storeIdIndex: {
      hashKey: "storeId",
    },
  },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");
