/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const ORIGIN_HOST_NAME = 'example.cloudfront.net';

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    url.hostname = ORIGIN_HOST_NAME;

    return await fetch(new Request(url.toString(), {}), {
      redirect: 'follow',
      cf: {
        cacheTtlByStatus: { '200-299': 60 * 60 * 24 * 365, 404: 1, '500-599': 0 },
        cacheEverything: true
      }
    });
  }
};
