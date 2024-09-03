import { Context, APIGatewayProxyEvent } from "aws-lambda";

export module Util {
  export function handler(
    lambda: (
      evt: APIGatewayProxyEvent,
      context: Context
    ) => Promise<{ statusCode: number; body: string }>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;

      try {
        // Run the Lambda
        const { body, statusCode } = await lambda(event, context);
        return {
          body,
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      } catch (error) {
        return {
          body: JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
          }),
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      }
    };
  }

  export function generateSKU(
    category: string,
    subcategory: string,
    counter: number
  ) {
    const categoryCode = category.slice(0, 3).toUpperCase();
    const subcategoryCode = subcategory.slice(0, 3).toUpperCase();

    return `${categoryCode}-${subcategoryCode}-${counter}`;
  }
}
