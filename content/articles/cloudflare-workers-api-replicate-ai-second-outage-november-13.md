---
{
  "title": "Cloudflare hit by second Friday outage across Workers API and Replicate AI as cloud disruptions mount",
  "summary": "Cloudflare opened back-to-back Friday afternoon incidents after 5xx server errors crippled its Workers and Pages deployment API and restricted Replicate's AI model registry—capping 24 hours of separate disruptions across Microsoft 365 and Anthropic's Claude.",
  "description": "Cloudflare reported a second Friday, Nov. 13, 2026 outage hitting its Workers API with 503 errors alongside Replicate AI registry restrictions before deploying a fix.",
  "seo_title": "Cloudflare hit by second Friday outage across Workers API and Replicate AI",
  "section": "technology",
  "author": "Logan M.",
  "key_points": [
    "Cloudflare opened a fresh incident at 15:31 UTC Friday after elevated 5xx errors and 503 upstream failures blocked developers from deploying Workers and Pages updates.",
    "Minutes earlier at 14:55 UTC, Cloudflare also restricted the r8.im container registry used for publishing and building artificial intelligence models on its Replicate platform.",
    "The afternoon breakdowns marked Cloudflare's second disruption of the day after an earlier North American Durable Objects error spike was resolved at 03:44 UTC.",
    "Already-deployed websites on Cloudflare's global edge network remained online, and engineers rolled out a recovery patch at 15:42 UTC with no evidence linking the incident to separate Microsoft or Claude outages."
  ],
  "sources": [
    {
      "title": "Cloudflare System Status — Workers API availability 5xx error investigation and Replicate r8.im registry status",
      "url": "https://www.cloudflarestatus.com/"
    },
    {
      "title": "The Economic Times — Why Cloudflare, Claude, and Microsoft Outlook users faced technical disruptions on Friday, Nov. 13",
      "url": "https://economictimes.indiatimes.com/news/new-updates/cloudflare-claude-down-reason-why-user-are-facing-issues-today-amid-widespread-outages-at-microsoft-outlook-on-november-13-doomsday/articleshow/135799107.cms"
    },
    {
      "title": "Firstpost Tech — Cloudflare reports separate infrastructure disruptions alongside global Claude AI and Microsoft 365 outages",
      "url": "https://www.firstpost.com/tech/claude-ai-outage-hits-users-worldwide-login-issues-reported-across-chatbot-and-coding-services-14059862.html"
    }
  ],
  "editorial_approved": true,
  "indexable": true,
  "show_on_homepage": true,
  "date_mode": "first-publication",
  "source_not_before": "2026-11-13T16:20:00Z",
  "release_not_before": "2026-11-13T16:20:00Z",
  "image": "/assets/uploads/cloudflare-san-francisco-hq-workers-api-outage.webp",
  "image_alt": "Reception lobby and illuminated orange cloud logo inside Cloudflare's corporate headquarters in San Francisco",
  "image_credit": "Photo by HaeB via Wikimedia Commons (CC BY-SA 4.0)"
}
---

SAN FRANCISCO — Internet infrastructure giant Cloudflare suffered its second service disruption of Friday, Nov. 13, after a wave of server errors crippled its Workers and Pages deployment API and forced restrictions on its Replicate artificial intelligence model registry during peak U.S. business hours.

According to live alerts posted on Cloudflare's official status board at 10:31 a.m. ET (15:31 UTC), engineers began investigating a spike in 5xx failures across the Cloudflare Workers API that prevented software teams from publishing serverless code, updating static web deployments, or executing control-plane API calls. Developers attempting to push updates via Cloudflare's Wrangler command-line tool encountered 503 Service Unavailable responses and upstream connection resets across multiple regional edge gateways.

## Replicate AI registry restricted minutes before Workers API errors

The control-plane bottleneck followed a separate AI infrastructure alert issued just 36 minutes earlier. At 9:55 a.m. ET (14:55 UTC), Cloudflare confirmed it had restricted access to the r8.im container registry that powers model publishing and builds on Replicate, while flagging degraded performance across Workers, Queues, and Cloudflare Sites and Services.

Crucially for everyday web users, websites, APIs, and security shields already deployed on Cloudflare's global content-delivery network continued serving cached and live traffic normally throughout the disruption.

Cloudflare engineers moved quickly to isolate the fault, marking the root cause of the Workers API failure identified at 10:39 a.m. ET (15:39 UTC) and deploying a corrective patch three minutes later at 10:42 a.m. ET (15:42 UTC), though regional edge nodes in parts of Africa and other overseas routing hubs took longer to drain stale upstream connections. Earlier Friday morning, Cloudflare had already resolved an unrelated overnight spike in North American Durable Objects error rates at 03:44 UTC.

## Why three cloud giants stumbled within 24 hours

Friday afternoon's Cloudflare hiccup immediately fueled widespread developer chatter online because it arrived on the heels of two other high-profile cloud disruptions within the same 24-hour window: [Anthropic's global authentication outage across Claude.ai, Claude Code, and its developer console](/articles/anthropic-claude-ai-claude-code-login-outage-november-13/), and [Microsoft's sprawling Exchange Online, Outlook, and Teams server breakdown](/articles/microsoft-365-outage-disrupts-outlook-teams-copilot-exchange-online/).

Despite social-media jokes blaming Friday the 13th or speculating about a single cascading failure, status telemetry from all three companies points to completely independent technical bottlenecks—mailbox routing degradation inside Microsoft 365, OAuth login renewal errors at Anthropic, and control-plane API instability at Cloudflare—with zero indication of a coordinated cyberattack. Even so, the triple disruption offered enterprises a stark reminder of how heavily modern software teams depend on a handful of centralized cloud and AI gateways to ship code and stay online.
