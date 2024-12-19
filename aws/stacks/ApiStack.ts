import { Api, type StackContext, use } from 'sst/constructs';
import { DynamoDBStack } from './DynamoDBStack';

export function ApiStack({ stack }: StackContext) {
  const { photosTable } = use(DynamoDBStack);
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [photosTable],
        runtime: 'nodejs18.x'
      }
    },
    routes: {
      'GET /photography': {
        function: 'packages/functions/src/photography/getPhotos.handler',
        authorizer: 'none'
      }
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
