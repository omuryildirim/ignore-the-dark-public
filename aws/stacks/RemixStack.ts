import { RemixSite, type StackContext } from 'sst/constructs';

export function RemixStack({ stack }: StackContext) {
  const site = new RemixSite(stack, 'Site', {
    path: 'remix/'
  });

  stack.addOutputs({
    RemixSiteURL: site.url
  });
}
