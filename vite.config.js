import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// En local (npm run dev), sert aussi les fonctions de api/ comme le fait Vercel,
// avec les variables de .env.local.
function vercelApiInDev() {
  return {
    name: "vercel-api-in-dev",
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ""));
      server.middlewares.use("/api", async (req, res, next) => {
        try {
          const name = req.url.split("?")[0].replace(/^\//, "");
          const mod = await server.ssrLoadModule(`/api/${name}.js`);
          const handler = mod[req.method];
          if (!handler) return next();
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const request = new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: req.headers,
            body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
          });
          const response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiInDev()],
});
