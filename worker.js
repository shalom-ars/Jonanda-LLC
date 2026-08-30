/**
 * Cloudflare Worker Gateway for JONANDA LLC Corporate Website
 * Serves static assets from ASSETS binding with SPA routing fallback.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      // Fetch asset from Cloudflare Assets binding
      const assetResponse = await env.ASSETS.fetch(request);
      
      // If asset exists and is valid, return it
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    } catch (err) {
      // Fall through to SPA fallback
    }

    // SPA fallback: Return index.html for client-side routing
    const spaUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(spaUrl.toString(), request));
  }
};
