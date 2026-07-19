# Jeongcheon Law Office Homepage

Official website for 법률사무소 정천, built with Next.js App Router and Sanity CMS.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` for local Next.js development. Copy `.dev.vars.example`
to `.dev.vars` when previewing with Cloudflare Workers locally.

## Required Environment Variables

These values are required for local builds, Cloudflare Workers Builds, and future deployments:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

`SANITY_API_READ_TOKEN` is optional for published public-dataset reads, but should remain
server-only if added later for preview or draft reads.

For local or CI deployment commands, configure Cloudflare credentials outside the repository:

```bash
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
```

Do not commit real secrets. In Cloudflare, add the `NEXT_PUBLIC_...` values as build variables
and add server-only values as runtime secrets.

## Cloudflare Workers With OpenNext

This project is prepared for Cloudflare Workers using `@opennextjs/cloudflare`.

Configuration files:

- `wrangler.jsonc`: Worker entry, static assets, Node.js compatibility, and observability.
- `open-next.config.ts`: OpenNext Cloudflare adapter configuration.
- `public/_headers`: immutable caching for Next static assets and public images.
- `.dev.vars.example`: local Workers preview environment variable template.

Local validation:

```bash
npm run cf:build
```

Local Workers runtime preview:

```bash
npm run cf:preview
```

Future deployment command:

```bash
npm run cf:deploy
```

Upload a version without serving it immediately:

```bash
npm run cf:upload
```

Generate Cloudflare binding types if bindings are added later:

```bash
npm run cf:typegen
```

## Compatibility Notes

- The app uses the Next.js Node.js runtime. No `runtime = "edge"` routes are currently used.
- The Sanity revalidation route remains unchanged and uses `runtime = "nodejs"`.
- Cloudflare deployment, custom domains, DNS, and production secrets are not configured in this repository.
- If Cloudflare Workers Builds is used, configure build variables and secrets in the Cloudflare dashboard before deploying.
- OpenNext currently emits a Windows compatibility warning during `cf:build`; use WSL or Linux CI for the most production-like Cloudflare validation.
- No Cloudflare R2 cache binding is configured yet. Add cache bindings later if production ISR/cache persistence requires it.

## Validation

Before opening a pull request, run:

```bash
npm run lint
npm run build
npm run cf:build
cd studio && npm run build
git diff --check
```
