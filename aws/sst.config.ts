import type { SSTConfig } from 'sst/project';
import { ApiStack } from './stacks/ApiStack';
import { AuthStack } from './stacks/AuthStack';
import { DynamoDBStack } from './stacks/DynamoDBStack';
import { PhotographySiteStack } from './stacks/PhotographySiteStack';
import { RemixStack } from './stacks/RemixStack';

export default {
  config(_input) {
    return {
      name: 'ignore-the-dark-sst',
      region: 'eu-west-1'
    };
  },
  stacks(app) {
    app.stack(DynamoDBStack);
    app.stack(ApiStack);
    app.stack(RemixStack);
    app.stack(PhotographySiteStack);
  }
} as SSTConfig;
