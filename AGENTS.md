# Architecture rules
- Student games use the existing member dataset and ephemeral React state, with shared draw logic in a hook; this keeps both game modes consistent without persistence.
- The student wheel renders SVG segments and uses transform-only rotation; this keeps selection alignment deterministic and animation independent of layout.
- The public MCP server lives in src/lib/mcp (one tool per file) and reads only the static class data; it exposes only data already shown on the public site.
- Keep "cloudflare:workers" in vite build.rollupOptions.external; the MCP package imports it optionally and non-Cloudflare builds (Vercel/Nitro) fail to resolve it otherwise.
- Class officers come from the Supabase `officers` table (static fallback, managed via SQL); class tasks come from the `tasks` table (public read, admin-only write) and are managed on /dashboard under the `_authenticated` gate.
