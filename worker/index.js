export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle API requests - proxy them to backend
    if (url.pathname.startsWith("/api/")) {
      const backendUrl = env.BACKEND_URL;
      const proxyUrl = `${backendUrl}${url.pathname}${url.search}`;

      return fetch(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
    }

    // For all other requests, try to serve static assets
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // If asset not found, serve index.html for SPA routing
      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`));
    }
  }
};
