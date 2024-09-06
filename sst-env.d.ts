/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Api": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "IdentityPool": {
      "id": string
      "type": "sst.aws.CognitoIdentityPool"
    }
    "InventoryDB": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "Product_Images": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "StripeSecretKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "UserPool": {
      "id": string
      "type": "sst.aws.CognitoUserPool"
    }
    "UserPoolClient": {
      "id": string
      "secret": string
      "type": "sst.aws.CognitoUserPoolClient"
    }
    "WebApp": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
export {}
