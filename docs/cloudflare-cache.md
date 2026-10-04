# Cloudflare cache setup

OpenNext 1.20.1 uses a dummy incremental cache unless configured. The application
now uses R2 for page/data cache, a Durable Object queue for time-based
revalidation, and D1 for the existing Sanity webhook's path/tag invalidation.
Binding names are fixed by the adapter; resource names are project-specific.
Cache interception serves cached pages without loading the Next page renderer.
No optional regional Cache API layer is enabled, so no additional cache-purge
service is required for that layer.

## One-time remote setup

Run from the repository directory in the intended Cloudflare account:

```powershell
npx wrangler r2 bucket create jeongcheon-homepage-cache
npx wrangler d1 create jeongcheon-homepage-tags
```

If a named resource already exists, reuse it instead of recreating it. Put the
actual D1 `database_id` from the command output into `wrangler.jsonc`. The current
configuration contains the existing production database ID; reuse that resource.
The Durable Object namespace is created by the checked-in SQLite migration on
deployment; no separate queue resource or manually invented namespace ID is used.
Keep the migration after the first deployment.

## Build and deployment

Cloudflare Builds production settings must use:

- Build command: `npm run cf:build`
- Deploy command: `npx opennextjs-cloudflare deploy`

For a version upload without promoting production, use
`npx opennextjs-cloudflare upload` after the build. Locally, `npm run cf:deploy`
and `npm run cf:upload` include the build first. These OpenNext commands populate
the R2 build cache and initialize D1's revalidation table before calling Wrangler.
Using bare `wrangler deploy`, `wrangler versions upload`, or `wrangler preview`
skips that cache-population step.
The legacy `cf:cloudflare-preview` script still invokes bare Wrangler; do not
use it for this cache-backed deployment. Use `cf:upload` with a correctly
isolated preview configuration instead.

Branch preview Workers must have their own R2 bucket and D1 database and a
`WORKER_SELF_REFERENCE` pointing to that preview Worker, not production. Use an
explicit separate Wrangler configuration with those real resources for remote
preview; do not reuse the production self-reference for a renamed Worker.
`npm run cf:preview` uses local emulated resources and initializes their cache.

## Behavior and verification

Existing application intervals remain unchanged: homepage ISR is 3,600 seconds,
featured selection is keyed by the Korean calendar date and cached for 86,400
seconds, and case detail/data caches use 300 seconds. After midnight the next
homepage revalidation selects the new day's cases. Quiet sites revalidate on
the next visit, not on a background daily schedule.

Check `/` and `/cases/case_021` on a configured preview:

1. Confirm R2 contains populated build/page/data cache entries and D1 contains
   the `revalidations` table after OpenNext deployment.
2. Request each page repeatedly, including RSC navigation; inspect response
   cache headers and Worker CPU/outcome logs.
3. Wait beyond its revalidation interval and request again. Confirm the queue
   refreshes the page and subsequent requests use the updated cache.
4. Publish an intentional test change through Sanity and verify its webhook
   succeeds and the corresponding page updates. Do not send a production test
   invalidation merely to benchmark CPU.
5. Test a missing cache entry only in isolated preview storage. A hard refresh
   alone is not proof of a server-side cache miss.

Local Workers do not enforce production CPU quotas. Successful local responses
do not prove Error 1102 is resolved; inspect cold-render and revalidation CPU
in Cloudflare. If failures remain, profile Next/OpenNext cold initialization
and detail-page rendering separately. The existing missing `IMAGES` binding
warning concerns image optimization and is outside this cache change.

## Local validation recorded for this change

- Lint passed with generated `studio/dist/**` excluded.
- Next production build/type checking and OpenNext build passed (62 pages).
- Local preview populated 310 R2 entries and initialized the D1 table.
- `/cases/case_021` returned 200 repeatedly with `x-opennext-cache: HIT`.
- The initial Turbopack build returned 500 for `/` with a server mapper
  `ChunkLoadError`. This also occurred in production; it was not merely a local
  Windows preview limitation.

## Emergency recovery, 2026-10-05

Production version `784157ff-802c-4c0c-9f2e-eb53f75352e9` logged that same
Turbopack `ChunkLoadError` for `/`. The generated Worker already exported
`DOQueueHandler`; the CLI warning occurs while `getPlatformProxy` loads
environment bindings before cache population and does not establish that the
deployment bundle lacks the class.

The production build now explicitly uses `next build --webpack`. Keep this until
a separately tested OpenNext/Turbopack build passes uncached page rendering.
Local OpenNext requests for `/` and `/cases/case_021` both returned 200 repeatedly
after rebuilding; the latter also returned `x-opennext-cache: HIT`.

Keep `v1-opennext-cache-queue`, its binding and exported class intact. An older
version predating the applied DO lifecycle migration cannot be used as a simple
rollback target. Recover with a new compatible deployment, never a deletion
migration. R2 and D1 resources remain in place. Error 1102 and stale-revalidation
CPU behavior require separate validation after service recovery.

Recovery deployment: `npx opennextjs-cloudflare deploy` published version
`ff21c74c-2864-477c-92d6-60cdd3bfe258`. Both production URLs returned HTML with
HTTP 200 twice; their new-version tail events had no exceptions or binding
errors. Homepage CPU samples were 168/165 ms and detail samples 14/16 ms;
these samples establish recovery, not resolution of intermittent Error 1102.
