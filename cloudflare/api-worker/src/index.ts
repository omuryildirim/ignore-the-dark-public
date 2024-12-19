/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const ORIGIN_HOST_NAME = 'https://example.execute-api.eu-west-1.amazonaws.com';

export default {
  async fetch(request: Request) {
    if (request.method === 'OPTIONS') {
      const response = new Response();
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      );
      return response;
    }

    const url = request.url.replace('https://api.example.com', ORIGIN_HOST_NAME);

    const originRequest = new Request(url, { headers: { Authorization: request.headers.get('Authorization') } });

    const response = await fetch(originRequest);

    // Clone the response so that it's no longer immutable
    const newResponse = new Response(response.body, response);

    // Adjust the value for an existing header
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    newResponse.headers.set(
      'Access-Control-Allow-Headers',
      'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    return newResponse;
  }
};
