# wanderlust

Next.js 16.4.2 / React 19.3 travel app (App Router, all code under `src/`). Early stage: `src/app/page.tsx` is a stub, but `src/components/ui/` contains a complete pre-scaffolded shadcn component library.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — Turbopack dev server; `npm run build` + `npm start` for a production check.
- Lint: `npm run lint` (flat config in `eslint.config.mjs`, eslint-config-next).
- No test framework, CI, or formatter is configured. Typecheck has no script — use `npx tsc --noEmit`.
- `@/*` maps to `src/*`.

## Toolchain quirks (differ from defaults)

- Tailwind CSS v4 is loaded via Turbopack loader rules in `next.config.ts` (`@tailwindcss/turbopack`), **not** PostCSS — there is no `postcss.config`; don't add one.
- `reactCompiler: true` — don't add manual `useMemo`/`useCallback` memoization; follow the Rules of React.
- `cacheComponents: true` and `partialPrefetching: true` — async data in components must follow Next 16's cacheComponents conventions (Suspense boundaries / `use cache`); check `node_modules/next/dist/docs/` when in doubt.

## UI components (shadcn, "base-nova" style)

- `src/components/ui/*` are built on **`@base-ui/react`** primitives, not Radix — don't import `@radix-ui/*` or use Radix prop APIs.
- `cn` is imported from the npm package `cn` (re-exported at `@/lib/utils`); match the existing `import { cn } from "cn"` style. Don't reach for `clsx` + `tailwind-merge`.
- Theme/style config is `components.json`; add new components with `npx shadcn add <name>`. Design tokens live in `src/app/globals.css` (Tailwind v4 `@theme inline` + `shadcn/tailwind.css`).
- Root layout loads Josefin Sans via `next/font/google` — reuse it instead of adding another font.
