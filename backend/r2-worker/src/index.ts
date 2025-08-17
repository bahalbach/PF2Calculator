/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		console.log(`Request received for ${url.pathname}`);
		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');
		headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		switch (request.method) {
			case 'OPTIONS':
				return new Response(null, {
					status: 204,
					headers: headers,
				});
			case 'GET':
				if (url.pathname.startsWith('/tab/')) {
					const tabId = url.pathname.split('/')[2];
					console.log(`Fetching tab with ID: ${tabId}`);
					const tabData = await env.PF2_CALCULATOR_R2_BUCKET.get(tabId);
					if (tabData === null) {
						console.log(`Tab with ID ${tabId} not found`);
						return new Response('Not Found', { status: 404 });
					}
					tabData.writeHttpMetadata(headers);
					headers.set('etag', tabData.httpEtag);
					return new Response(tabData.body, { status: 200, headers });
				}
				return new Response('Not Found', { status: 404 });
			case 'POST':
				if (url.pathname === '/tab') {
					console.log('Received POST request to /tab');
					// Assuming the request body contains JSON data
					if (!request.headers.get('Content-Type')?.includes('application/json')) {
						return new Response('Invalid Content-Type', { status: 400 });
					}
					if (!request.body) {
						return new Response('No body provided', { status: 400 });
					}
					type TabRequestBody = {
						tab: unknown;
						routines: unknown[];
						[key: string]: unknown;
					};
					const body = (await request.json()) as TabRequestBody;
					if (!body || typeof body !== 'object') {
						return new Response('Invalid JSON body', { status: 400 });
					}
					if (!body.tab || !Array.isArray(body.routines)) {
						return new Response('Invalid body', { status: 400 });
					}
					console.log('Received POST data:', body);
					const tabId = crypto.randomUUID(); // Generate a new ID if not provided
					const tabData = new Blob([JSON.stringify(body)], { type: 'application/json' });
					await env.PF2_CALCULATOR_R2_BUCKET.put(tabId, tabData);
					console.log(`Tab with ID ${tabId} saved`);
					headers.set('Content-Type', 'application/json');
					return new Response(JSON.stringify({ tabId }), { status: 200, headers });
				}
				return new Response('Not Found', { status: 404 });
			default:
				console.log(`Unsupported method: ${request.method}`);
				return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, POST' } });
		}
	},
} satisfies ExportedHandler<Env>;
