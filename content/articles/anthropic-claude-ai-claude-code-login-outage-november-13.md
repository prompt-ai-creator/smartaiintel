---
{
  "title": "Anthropic's Claude.ai and Claude Code hit by Friday login outage days before $90.4 billion IPO",
  "summary": "Anthropic opened a major status incident Friday morning after authentication failures locked users out of Claude.ai, Claude Code, and the Claude Console worldwide while its core developer API remained online.",
  "description": "Anthropic reported a major authentication outage across Claude.ai, Claude Code, and platform.claude.com on Friday, Nov. 13, 2026, before deploying a recovery fix.",
  "seo_title": "Claude.ai and Claude Code hit by Friday login outage before $90.4B IPO",
  "section": "technology",
  "author": "Logan M.",
  "key_points": [
    "Anthropic opened a major incident at 09:58 UTC Friday after global authentication errors blocked logins across Claude.ai, Claude Code, and the Claude developer console.",
    "Status monitors marked Claude.ai in a major outage, Claude Code and platform.claude.com in partial outages, and Claude Cowork experiencing degraded performance.",
    "Production apps calling api.anthropic.com directly with static API keys stayed operational throughout the disruption, as did AWS Bedrock and Google Cloud deployments.",
    "Engineers rolled out a patch at 11:05 UTC and shifted into recovery monitoring, though the login glitch arrives less than a week before Anthropic's blockbuster Nasdaq debut."
  ],
  "sources": [
    {
      "title": "Anthropic Official Status Page — Elevated authentication errors on claude.ai, Claude Code, and platform.claude.com",
      "url": "https://status.claude.com/"
    },
    {
      "title": "AI Weekly — Anthropic logs major Friday login outage across Claude.ai and Claude Code before deploying fix",
      "url": "https://aiweekly.co/alerts/anthropic-logs-login-outage-on-claudeai-and-claude-code"
    },
    {
      "title": "Moneycontrol Technology — Users report global sign-in failures and service disruptions across Claude.ai and Claude Code",
      "url": "https://www.moneycontrol.com/technology/claude-down-users-report-login-issues-and-service-disruptions-affecting-claude-ai-and-claude-code-article-14079689.html"
    }
  ],
  "editorial_approved": true,
  "indexable": true,
  "show_on_homepage": true,
  "date_mode": "first-publication",
  "source_not_before": "2026-11-13T11:45:00Z",
  "release_not_before": "2026-11-13T11:45:00Z",
  "image": "/assets/uploads/anthropic-claude-ai-code-login-outage-dario-amodei.webp",
  "image_alt": "Anthropic chief executive Dario Amodei speaking on stage ahead of the company's Friday Claude authentication outage and upcoming Nasdaq IPO",
  "image_credit": "Photo by TechCrunch via Wikimedia Commons (CC BY 2.0)"
}
---

SAN FRANCISCO — Software developers and enterprise subscribers across North America, Europe, and Asia were locked out of Anthropic's flagship artificial intelligence tools Friday morning after an authentication failure triggered a major outage across Claude.ai, the Claude Code terminal assistant, and the company's developer console.

Anthropic first posted an alert on its official status dashboard at 4:58 a.m. ET (09:58 UTC), confirming engineers were investigating widespread sign-in failures. Within minutes, third-party outage trackers logged thousands of user complaints—including a spike to 2,906 reports on Downdetector India compared with a normal baseline of two, alongside error reports stretching from California and Florida to Spain, Germany, Ukraine, and South Korea.

## Why web users were locked out while API apps stayed live

According to Anthropic's component breakdown, the breakdown centered on identity verification and OAuth session renewal rather than underlying AI model capacity. Status monitors marked the consumer and business web portal at claude.ai in a major outage, listed Claude Code and the billing portal at platform.claude.com in partial outages, and flagged workplace assistant Claude Cowork for degraded performance.

Crucially for corporate engineering teams, Anthropic's core inference endpoint at api.anthropic.com remained green and operational throughout the morning, as did hosted Claude models running through Amazon Bedrock, Google Cloud, and Microsoft Foundry.

Because automated backend applications authenticate with static, long-lived API keys rather than expiring browser or keychain login tokens, server workloads continued processing prompts uninterrupted. Interactive developers using subscription logins inside Claude Code, by contrast, encountered expired-credential errors whenever local sessions attempted to refresh, forcing urgent projects to switch temporarily to pay-as-you-go API keys.

## Patch deployed ahead of high-stakes IPO week

At 6:05 a.m. ET (11:05 UTC), roughly 67 minutes after opening the alert, Anthropic announced that engineers had deployed a fix and moved the incident into active recovery monitoring, though elevated error warnings remained posted while stalled sessions reconnected. The company did not immediately disclose what triggered the authentication bottleneck and gave no indication of any security breach or compromised passwords.

Friday's sign-in disruption compounded an already messy 24 hours for workplace cloud reliability. Anthropic's status board was simultaneously carrying a separate open notice warning that Claude's workplace email and calendar integrations had been impaired by [Microsoft's sprawling 12-hour Exchange Online, Outlook, and Teams server outage](/articles/microsoft-365-outage-disrupts-outlook-teams-copilot-exchange-online/).

The timing also puts a bright spotlight on Anthropic's infrastructure resilience at the exact moment chief executive Dario Amodei pitches Wall Street institutions on reliability at scale—coming on the same morning reports revealed [Anthropic's planned $90.4 billion Nasdaq IPO is roughly six times oversubscribed](/articles/anthropic-ipo-six-times-oversubscribed-90-billion-raise-nvidia-anchor/) ahead of next Thursday's expected stock-market debut.
