import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  type DeleteCommandInput,
  DynamoDBDocument,
  type GetCommandInput,
  type GetCommandOutput,
  type NativeAttributeValue,
  type PutCommandInput,
  type ScanCommandOutput,
  type UpdateCommandInput
} from '@aws-sdk/lib-dynamodb';
import type { ScanCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/ScanCommand';

const client = new DynamoDBClient();
const documentClient = DynamoDBDocument.from(client);

export const putItem = async (params: PutCommandInput): Promise<{ message: string; error: Error | undefined }> => {
  try {
    await documentClient.put(params);
    return { message: 'Success', error: undefined };
  } catch (e) {
    return { message: '', error: e as Error };
  }
};

export const updateItem = async (
  params: UpdateCommandInput
): Promise<{ message: string; error: Error | undefined }> => {
  try {
    await documentClient.update(params);
    return { message: 'Success', error: undefined };
  } catch (e) {
    return { message: '', error: e as Error };
  }
};

export const getItem = async (
  params: GetCommandInput
): Promise<{ item: GetCommandOutput | undefined; error: Error | undefined }> => {
  try {
    const movie = await documentClient.get(params);
    return { item: movie, error: undefined };
  } catch (e) {
    return { item: undefined, error: e as Error };
  }
};

export const scanTable = async (
  tableName: string
): Promise<{ items: Record<string, NativeAttributeValue>[] | undefined; error: Error | undefined }> => {
  try {
    const params: ScanCommandInput = {
      TableName: tableName
    };

    const scanResults: Record<string, NativeAttributeValue>[] = [];
    let items: ScanCommandOutput;
    do {
      items = await documentClient.scan(params);
      if (items.Items) {
        for (const item of items.Items) {
          scanResults.push(item);
        }
      }
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== 'undefined');

    return { items: scanResults, error: undefined };
  } catch (e) {
    return { items: undefined, error: e as Error };
  }
};

export const deleteItem = async (
  params: DeleteCommandInput
): Promise<{ message: string; error: Error | undefined }> => {
  try {
    await documentClient.delete(params);
    return { message: 'Success', error: undefined };
  } catch (e) {
    return { message: '', error: e as Error };
  }
};
