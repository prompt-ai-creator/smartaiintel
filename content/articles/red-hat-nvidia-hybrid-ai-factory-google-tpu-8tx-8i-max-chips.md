---
{
  "title": "Red Hat and Nvidia unveil hybrid AI Factory platform as Google expands custom TPU 8tx and 8i Max cloud chips",
  "summary": "Red Hat launched Red Hat AI 3.4, Ansible 2.7, and a joint AI Factory architecture with Nvidia supporting Blackwell and Vera Rubin systems, escalating competition in enterprise agent infrastructure just as Google unveiled eighth generation TPU 8tx and 8i Max cloud accelerators.",
  "description": "IBM unit Red Hat unveiled Red Hat AI 3.4 and a co-engineered AI Factory with Nvidia for hybrid cloud AI agents on Wednesday, as Google expanded its custom eighth-generation TPU family with AMD-hosted TPU 8tx and dual-chip TPU 8i Max.",
  "seo_title": "Red Hat and Nvidia launch hybrid AI Factory as Google unveils TPU 8tx and 8i Max chips",
  "section": "technology",
  "author": "Logan M.",
  "sources": [
    {
      "title": "SiliconANGLE report on Red Hat expanding enterprise agentic AI capabilities with Nvidia across hybrid clouds",
      "url": "https://siliconangle.com/2026/11/11/red-hat-accelerates-agentic-adoption-hybrid-environments-rhsummit"
    },
    {
      "title": "Technology.org breakdown of Google unveiling TPU 8tx with AMD EPYC hosts and dual chip TPU 8i Max",
      "url": "https://www.technology.org/2026/11/11/google-tpu-8tx-8i-max-confidential-computing-amd-epyc/"
    },
    {
      "title": "Life News Agency report on Google expanding its eighth generation AI chip portfolio",
      "url": "https://lifenewsagency.com/google-unveils-tpu-8tx-and-tpu-8i-max-to-expand-its-eighth-generation-ai-chips/"
    },
    {
      "title": "SmartAIIntel report on CoreWeave Q3 revenue jumping 168 percent to 3.66 billion dollars on AI cloud demand",
      "url": "https://smartaiintel.com/articles/coreweave-q3-revenue-366-billion-ai-backlog-132-billion-outlook/"
    }
  ],
  "editorial_approved": true,
  "indexable": true,
  "show_on_homepage": true,
  "date_mode": "first-publication",
  "source_not_before": "2026-11-11T15:53:00Z",
  "release_not_before": "2026-11-11T15:53:00Z",
  "image": "/assets/uploads/redhat-nvidia-ai-factory-google-tpu-cloud-archive.webp",
  "image_alt": "Split archival photograph showing Red Hat corporate headquarters tower in Raleigh on the left and Googleplex headquarters in Mountain View on the right",
  "image_credit": "Photos via Wikimedia Commons under Creative Commons attribution sharealike licenses"
}
---

The battle to control enterprise artificial-intelligence infrastructure widened across both software orchestration and custom silicon this week as IBM subsidiary Red Hat teamed up with Nvidia to launch a hybrid-cloud "AI Factory" for autonomous enterprise agents on Wednesday, days after Google unveiled two specialized eighth-generation Tensor Processing Unit systems backed by AMD host processors.

Together, the rollouts highlight an industry-wide shift away from one-size-fits-all training clusters toward governed, security-hardened inference stacks built to run autonomous AI agents across sensitive corporate data — a wave of enterprise spending that also propelled [AI cloud specialist CoreWeave to a 168 percent third-quarter revenue surge](https://smartaiintel.com/articles/coreweave-q3-revenue-366-billion-ai-backlog-132-billion-outlook/) this week.

## Red Hat AI 3.4 and Nvidia OpenShell target governed enterprise agents

At its summit briefing on Wednesday, Red Hat introduced Red Hat AI 3.4 alongside two managed IBM Cloud offerings — Red Hat AI Inference and Red Hat OpenShift Virtualization Service — engineered to let banks, manufacturers, and government agencies deploy high-throughput agent workflows across on-premises servers and public clouds simultaneously.

Central to the announcement is Red Hat AI Factory with Nvidia, a co-engineered stack integrating Red Hat's Linux and Kubernetes foundation with Nvidia's current Blackwell GPUs and upcoming Vera Rubin architecture. Crucially for risk-averse chief information security officers, Red Hat joined Nvidia's OpenShell initiative to sandbox autonomous AI agents inside isolated execution environments, paired with a minimal container operating system dubbed Fedora Hummingbird Linux and Red Hat Hardened Images.

To keep autonomous agents from triggering unauthorized infrastructure changes, Red Hat also rolled out Ansible Automation Platform 2.7, routing AI-initiated server and network actions through mandatory human approval gates, cryptographic content signing, and immutable audit trails.

"Moving AI from corporate experimentation to an industrial engine requires a sovereign, consistent foundation across the hybrid cloud," Red Hat Chief Technology Officer Chris Wright said, noting expanded sovereign-cloud collaborations with Core42 and European integrator Sopra Steria as Gartner projects sovereign cloud infrastructure spending to grow 36 percent annually through 2028.

## Google counters with AMD-hosted TPU 8tx and dual-chip TPU 8i Max

While Nvidia strengthens its enterprise software moat alongside Red Hat, Google is pressing its custom silicon advantage to give cloud customers specialized alternatives to merchant GPUs. Expanding the eighth-generation TPU family it debuted in April with TPU 8t and TPU 8i, Google unveiled two workload-specific configurations scheduled for 2027 deployment: TPU 8tx and TPU 8i Max, marking the first time Mountain View has introduced four TPU systems in a single calendar year.

Built for regulated industries and defense clients, **TPU 8tx** pairs Google's TPU 8t silicon with fifth-generation AMD EPYC host processors and embeds a hardware-level secure enclave that keeps sensitive customer data and proprietary model weights encrypted and isolated even during active computation. Leveraging Google's low-latency Boardfly interconnect, Google claims TPU 8tx cuts latency by up to half relative to TPU 8t with virtually zero encryption overhead.

Meanwhile, **TPU 8i Max** attacks the AI industry's "memory wall" for million-token context windows — such as coding agents reasoning across massive enterprise codebases or multi-hour video streams. By packaging two TPU 8i dies into a single module within the same data-center rack footprint, Google says TPU 8i Max doubles compute density, on-chip SRAM, and high-bandwidth memory throughput over standard TPU 8i nodes while expanding PyTorch compatibility through TorchTPU.
