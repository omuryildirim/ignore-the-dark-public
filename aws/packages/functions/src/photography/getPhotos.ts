import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { PhotographyTableName } from '../dynamoDB/dynamoDB.constants.js';
import { scanTable } from '../dynamoDB/index.js';

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const response = await scanTable(PhotographyTableName);

  if (response.error) {
    return {
      statusCode: 400,
      body: response.error.message
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response.items)
  };
};
