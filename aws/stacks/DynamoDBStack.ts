import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { type StackContext, Table } from 'sst/constructs';

export function DynamoDBStack({ stack }: StackContext) {
  const photosTable = new Table(stack, 'photos-table', {
    cdk: {
      table: dynamodb.Table.fromTableArn(stack, 'Photos', 'arn:aws:dynamodb:eu-west-1:259102000856:table/photos')
    }
  });

  return { photosTable };
}
