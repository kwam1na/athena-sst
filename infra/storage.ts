// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Product_Images");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Products", {
  fields: {
    productId: "string",
  },
  primaryIndex: { hashKey: "productId" },
});

// Create a secret for Stripe
export const secret = new sst.Secret("StripeSecretKey");
