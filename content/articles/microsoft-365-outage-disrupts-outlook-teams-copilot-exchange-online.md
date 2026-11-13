---
{
  "title": "Microsoft 365 outage stretches into Friday as server failures disrupt Outlook, Teams and Copilot worldwide",
  "summary": "Millions of business and enterprise users faced hours of email lockouts, sluggish Teams calendars, and unresponsive Copilot tools after Exchange Online server failures triggered a cascading global Microsoft 365 disruption that stretched past midnight Friday.",
  "description": "A widespread Microsoft 365 outage disrupted Outlook, Exchange Online, Teams, SharePoint, and Copilot into Friday, Nov. 13, 2026, after backend servers unexpectedly went unresponsive.",
  "seo_title": "Microsoft 365 outage disrupts Outlook, Teams & Copilot into Friday",
  "section": "technology",
  "author": "Logan M.",
  "key_points": [
    "Microsoft 365 suffered a multi-hour global disruption stretching into Friday morning that locked business customers out of Outlook inboxes, Teams calendars, SharePoint, and Copilot.",
    "Downdetector logged roughly 130,000 peak outage reports as IT administrators tracked service advisories MO1550821 and EX1550543 across North America, Europe, and Asia.",
    "Microsoft ruled out any cyberattack or malicious intrusion, blaming an overloaded secure-connection process and a configuration update that left servers unresponsive under traffic.",
    "Engineers froze all global software deployments and began rerouting Exchange Online traffic in stages, though restored server clusters intermittently dropped offline again under heavy load."
  ],
  "sources": [
    {
      "title": "BleepingComputer — Massive Microsoft 365 outage disrupts Outlook, Teams, and Copilot worldwide",
      "url": "https://www.bleepingcomputer.com/news/microsoft/massive-microsoft-365-outage-disrupts-outlook-teams-copilot-worldwide/"
    },
    {
      "title": "Mashable — Microsoft 365, Teams, Outlook, and Copilot outage live status updates",
      "url": "https://mashable.com/tech/microsoft-outage-affecting-365-teams-outlook-copilot-nov-12-2026"
    },
    {
      "title": "Windows Latest — Microsoft 365 server failure takes down Outlook, Teams, and Exchange across enterprise tenants",
      "url": "https://www.windowslatest.com/2026/11/13/microsoft-365-outage-you-may-get-money-off-your-bill-if-you-use-it-for-work-but-youll-have-to-ask-microsoft-for-it-as-a-server-failure-takes-down-outlook-teams-and-exchange/"
    }
  ],
  "editorial_approved": true,
  "indexable": true,
  "show_on_homepage": true,
  "date_mode": "first-publication",
  "source_not_before": "2026-11-13T08:50:00Z",
  "release_not_before": "2026-11-13T08:50:00Z",
  "image": "/assets/uploads/microsoft-redmond-campus-365-outlook-teams-outage.webp",
  "image_alt": "Exterior view of Building 92 and the Microsoft corporate sign on the Microsoft headquarters campus in Redmond, Washington",
  "image_credit": "Photo by Jiaqian AirplaneFan via Wikimedia Commons (CC BY 3.0)"
}
---

REDMOND, Wash. — Corporate offices across North America, Europe, and Asia opened Friday still contending with lingering email delays and login timeouts after a sweeping Microsoft 365 outage knocked Outlook, Exchange Online, Microsoft Teams features, SharePoint Online, and Copilot offline for more than seven hours.

User-submitted problem reports on Downdetector surged to roughly 130,000 at Thursday's peak after business and enterprise workers were greeted by error screens reading "Your request can't be completed right now" across web browsers, Windows desktop apps, and mobile mail clients. While Microsoft reported gradual recovery across select server clusters overnight, status advisories posted past 1 a.m. ET Friday warned that full stability had not yet returned in every region.

## What knocked Outlook and Copilot offline

In administrative advisories tracked under incident codes MO1550821 and EX1550543, Microsoft emphasized early Friday that there is no indication of a cyberattack or malicious activity behind the breakdown. Instead, engineers traced the cascade to backend Exchange Online servers that unexpectedly went unresponsive Thursday afternoon, pushing connection requests onto neighboring machines until a core process handling secure sessions became overwhelmed.

Microsoft executive Charles Lamanna noted that a configuration change rolled out earlier Thursday afternoon contributed to the bottleneck. When engineers first attempted to bring rebooted servers back into rotation Thursday evening, several clusters froze again as soon as live enterprise traffic hit them, forcing Microsoft to throttle certain connection types and reroute mail traffic across alternate global pathways.

The afternoon collapse followed an earlier, hour-long Microsoft Teams messaging glitch in North and South America—logged separately as TM1550488—that delayed chat delivery between 9:45 a.m. and 10:53 a.m. ET due to infrastructure resource contention.

## Enterprise apps hit hardest while consumer products held up

According to Microsoft's service health dashboard, the disruption centered on commercial and enterprise cloud tenants rather than consumer Xbox or personal Windows accounts. Exchange Online bore the brunt of the outage, blocking mailbox access over desktop MAPI, mobile Exchange ActiveSync, webmail, and REST connections.

Because Microsoft's workplace software stack relies heavily on Exchange Online for identity, scheduling, and document indexing, the failure rippled quickly into adjacent tools. Microsoft 365 Copilot Chat failed to load prompts or retrieve workplace files and calendars, Teams users encountered broken meeting scheduling and calendar syncing, and Defender for Office 365 experienced intermittent trouble verifying URLs through Safe Links.

To prevent further instability, Microsoft froze all new software deployments and configuration updates worldwide while rolling back recent infrastructure changes.

## How businesses can check SLA bill credits

For corporate IT departments that lost an entire afternoon and evening of email access, the duration of the outage is already drawing attention to Microsoft's enterprise service-level agreements. Under standard Microsoft 365 commercial terms, monthly uptime falling below 99 percent—roughly seven hours and 12 minutes of qualifying downtime within a billing month—can make affected organizations eligible for service credits starting at 25 to 50 percent of monthly fees for the impacted workload.

Cloud licensing specialists note that Microsoft does not apply those credits automatically. Administrators must submit a formal claim inside the Microsoft 365 admin center citing incident numbers EX1550543 and MO1550821 along with tenant-level diagnostic logs once Microsoft publishes its preliminary post-incident report within two business days. The disruption adds fresh scrutiny to enterprise cloud resilience during a week already rattled by [United Airlines blocking unauthorized AI agents from corporate booking systems](/articles/united-airlines-bans-ai-agents-openai-dots-meta-muse-flight-bookings/) and turbulent leadership news across the wider AI hardware sector.
