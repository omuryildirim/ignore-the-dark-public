import { type StackContext, StaticSite } from 'sst/constructs';

export function PhotographySiteStack({ stack }: StackContext) {
  const site = new StaticSite(stack, 'PhotographySite', {
    path: 'photography/'
  });

  stack.addOutputs({
    PhotographySiteUrl: site.url
  });

  return { site };
}
