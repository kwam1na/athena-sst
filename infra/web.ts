import { api } from "./api";
import { awsAcessKey, awsSecretKey, bucket } from "./storage";
import { userPool, identityPool, userPoolClient } from "./auth";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("WebApp", {
  path: "packages/webapp",
  build: {
    output: "dist",
    command: "npm run build",
  },
  environment: {
    VITE_AWS_ACCESS: awsAcessKey.value,
    VITE_AWS_SECRET: awsSecretKey.value,
    VITE_REGION: region,
    VITE_API_URL: api.url,
    VITE_BUCKET: bucket.name,
    VITE_BUCKET_DOMAIN: bucket.domain,
    VITE_USER_POOL_ID: userPool.id,
    VITE_IDENTITY_POOL_ID: identityPool.id,
    VITE_USER_POOL_CLIENT_ID: userPoolClient.id,
  },
});
