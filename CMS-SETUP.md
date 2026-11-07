# SmartAIIntel production CMS integration — prepared, not deployed

## What is included
- Decap CMS 3.17.3 loaded from the pinned external unpkg URL. Production requires internet access; the external script is a trust dependency.
- GitHub backend for prompt-ai-creator/smartaiintel, main, connected to the separately deployed OAuth Worker.
- Editorial workflow drafts stored in GitHub branches/pull requests; no approval based on localStorage.
- Section-derived bylines; no author photos or fabricated biographies.
- Markdown article renderer (raw HTML disabled), real dates, source links, title/description/canonical/Open Graph and NewsArticle JSON-LD.
- Article index, related links and sitemap. Only explicitly indexable articles enter sitemap. Production origin is currently smartaiintel.pages.dev; update origin/config when domain changes.
- Current homepage source is not replaced. Build adds one article-index link; illustrative homepage cards remain labelled and are NOT treated as published reporting.
- No starter articles, no ads and no football code are included.

## Installation — user-authorized steps
1. Upload the package CONTENTS (not the containing folder) into repository root on main: admin/, content/, tools/, article.css, package.json, package-lock.json, CMS-SETUP.md. Preserve current index.html/styles.css/script.js/assets/ and _headers.
2. Cloudflare Pages project > Settings > Builds & deployments: build command `npm run build`; output directory `_site`; root directory leave blank. Cloudflare should install npm dependencies from package-lock.json. Use Node 22 or a current supported LTS.
3. Redeploy latest commit. Visit / and /articles/ to check no starter stories appeared. Do not submit the preview site for indexing.
4. Visit https://smartaiintel.pages.dev/admin/ and authorize GitHub. OAuth requests public_repo (all public repositories the account can access). Token is delivered to Decap in the trusted browser, not a repository file. Do not share tokens or commit secrets. GitHub tokens expire if configured; reauthenticate when necessary. Automatic token refresh is not implemented in the Worker.
5. Create a temporary DRAFT and save, but do not publish it. Verify a draft branch/pull request appears in GitHub, verify byline selection, then delete the temporary draft after testing. Do not test publishing with invented news on main.
6. Complete launch/content/policy checks before approving a real article. On main, editorial_approved must be true or build fails. Set indexable true only after launch review.

## Approval security — important limitation
The OAuth bridge only admits the configured account. This is an owner-managed workflow, not independent multi-person approval. Decap's workflow and the build gate help avoid accidental publication, but the repository owner can change files/checkboxes or bypass the UI. They are NOT proof that a separate editor approved a story.

Before inviting contributors, configure GitHub branch protection/rulesets requiring PR review and successful build checks, with author/reviewer separation and a branch-compatible CMS workflow. Those controls have NOT been configured. This package does not promise enforced independent team approval. Do not invite team members yet.

## Remaining blockers
- Live CMS authentication, GitHub draft save and Cloudflare integration tests must be completed after installation.
- CMS Markdown preview is not the exact public article layout. Public rendering is tested by build, not a deployed draft preview link yet.
- Homepage illustrative cards are untouched; replacing them with real article cards is a subsequent approved integration.
- SEO check dashboard from local prototype is not embedded into Decap; production currently has required editorial fields and build validation, not plugin-like scoring.
- No rich author bios unless supplied; no internal source-verification automation. HTTPS sources do not prove factual accuracy.
- No scheduled posting: future publication dates are rejected. DateModified is editor-supplied and validated.
- No authenticated preview deployment, team notifications or revision comparison UI configured beyond GitHub/Decap features.
- Original approved reporting, media rights, editorial/contact/privacy/corrections policies, consent review and performance testing required before launch/AdSense.
- No guarantee of indexing, rankings, traffic, earnings or AdSense approval.

## Cache and secrets
Existing root _headers is preserved by upload. Build appends admin no-store and noindex headers. Credentials stay in Worker secrets; none are included. Admin robots restrictions are not access controls; GitHub login/permissions are required for edits.

## Rollback
Restore Pages build command `exit 0` and output directory `.` to return to the original static publishing approach. Reverting the integration commit also removes CMS source. Never delete existing homepage assets during installation.
