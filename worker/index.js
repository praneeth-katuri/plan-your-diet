// worker/index.js
const BACKEND_URL = "https://plan-your-diet-backend.onrender.com";
// const BACKEND_URL = "http://localhost:3000"; // Uncomment for local dev

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return fetch(`${BACKEND_URL}${url.pathname}${url.search}`, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
    }

    return env.ASSETS.fetch(request).catch(() =>
      env.ASSETS.fetch(new Request(`${url.origin}/index.html`))
    );
  }
};
