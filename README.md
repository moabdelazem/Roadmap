# SRE & Platform Engineering — A 3-Year Mastery Roadmap

> **Owner:** Mohamed Abdelazem
> **Started:** September 2026 · **Target window:** Q1 2029
> **Goal:** mid-to-senior Site Reliability Engineer *or* Platform Engineer at a large
> engineering organization, with a credible path to EU relocation (Germany /
> Netherlands / Ireland) or a remote-first international contract.

This is not a link dump. It is a **sequenced, time-boxed plan** with phases,
weekly cadence, build artifacts, certifications, and a market-entry strategy.
Every resource in this repository has been placed into the phase where it is
actually useful, so you read things when you can apply them — not before.

---

## 1. The Contract

Read this section every quarter. It is what you agreed to.

| | |
|---|---|
| **Starting point** | Junior, under 2 years of ops experience. On-prem datacenters, S3-compatible object storage, real hardware. |
| **Time budget** | 12–15 focused hours per week. Non-negotiable floor: 8 hours. |
| **Horizon** | ~34 months. Phase 0 begins Sept 2026; job hunt opens Jan 2029. |
| **Primary cloud** | AWS. Certification (SAA-C03) targeted for **Q1 2027**. |
| **Primary language** | Python for automation first, then **Go** as the production language. |
| **Target markets** | EU relocation (DE / NL / IE) and remote-first international roles. |
| **Definition of done** | You can walk into a systems-design and a production-debugging interview and be the person explaining, not the person guessing. |

### The three rules

1. **Build beats read.** A phase is not complete because you finished the
links. It is complete when the artifact runs and you can explain why it
breaks. Reading without building is the single most common way this plan fails.
2. **Write it down publicly.** One technical post per month, minimum. In the EU
and remote markets, a public body of work substitutes for the brand-name
employer you do not yet have.
3. **Exploit the on-prem job.** You have something most cloud-only juniors
never get: bare metal, real network topology, real storage failure domains,
real capacity limits. That is senior-SRE raw material. Section 9 covers how
to convert it.

---

## 2. How This Plan Works: Two Lanes, One Spine

SRE and Platform Engineering are not two careers. They are two *products* built
on the same foundations. This plan runs them in parallel on a shared spine.

```
┌──────────────────────────────────────────┐
│            THE SPINE (Phase 1)           │
│  Linux internals · Networking · Data     │
│  structures of production · Programming  │
└───────────────────┬──────────────────────┘
│
┌──────────────────────┴──────────────────────┐
│                                             │
╔════════▼═════════╗                          ╔════════▼═════════╗
║  RELIABILITY     ║                          ║   PLATFORM       ║
║     LANE         ║                          ║     LANE         ║
╠══════════════════╣                          ╠══════════════════╣
║ SLI/SLO/budgets  ║                          ║ Kubernetes depth ║
║ Incident command ║◄──── shared muscle ─────►║ IaC & GitOps     ║
║ Observability    ║      (you need both)     ║ CI/CD & delivery ║
║ Capacity & perf  ║                          ║ Golden paths     ║
║ Postmortems      ║                          ║ Developer UX     ║
║ Chaos & failure  ║                          ║ Multi-tenancy    ║
╚══════════════════╝                          ╚══════════════════╝
│                                             │
└──────────────────────┬──────────────────────┘
│
┌───────────────────▼──────────────────────┐
│      DISTRIBUTED SYSTEMS DESIGN          │
│   (where both lanes converge, Phase 4)   │
└──────────────────────────────────────────┘
```

**The distinction that matters in interviews:** an SRE is measured by whether
the system stays up and by how fast it is understood when it does not. A
Platform Engineer is measured by whether other engineers ship faster and safer
without filing a ticket. Same primitives, different customer. Being fluent in
both is exactly what makes you portable across companies — and it is why this
plan refuses to pick one.

---

## 3. The Competency Rubric

Track yourself against this honestly at each quarterly review. Titles are noise;
these behaviours are the actual bar.

### Junior (where you are)
- Executes runbooks; resolves alerts that have a known cause.
- Writes scripts that automate a task for themselves.
- Understands the stack one layer deep.

### Mid-level (target: end of Phase 3, ~Q2 2028)
- **Owns** the SLOs of at least one production service and defends the error budget.
- Leads an incident of moderate blast radius without escalating for direction.
- Writes and reviews production-quality code, not just scripts.
- Does capacity planning with numbers, not intuition.
- Reduces toil measurably and can state the hours saved.
- Debugs across layers: app → runtime → kernel → network → hardware.

### Senior (target: end of Phase 4, ~Q4 2028 / on the job after)
- Sets reliability strategy across services they do not personally operate.
- Influences other teams' designs *before* those designs reach production.
- Designs for failure explicitly: blast radius, degradation modes, recovery time.
- Owns the postmortem culture — makes it blameless and makes actions land.
- Mentors, and their written work changes how the organization operates.
- On the platform side: defines the abstractions other engineers build on and
treats the platform as a product with users, adoption metrics, and a roadmap.

---

## 4. The Weekly Operating System

The plan lives or dies on cadence, not motivation. Target **12.5 hours**.

| Slot | Duration | Purpose |
|---|---|---|
| **Mon / Tue / Thu evening** | 1.5 h each | **Theory.** Book chapter, course module, deep article. Notes go in `notes/`. |
| **Wed evening** | 1.5 h | **Deliberate practice.** SadServers scenario, PromQL drills, Go exercises, `strace` on something real. Timed. No tutorials. |
| **Saturday block** | 4 h | **Build.** The phase artifact. Uninterrupted. This is the highest-value slot — protect it above all others. |
| **Sunday** | 2 h | **Consolidate.** Spaced-repetition review, write the week's notes into prose, monthly blog post. |

### Rules of the cadence
- **Deload every 7th week.** No new material. Review notes, fix the lab, rest.
Burnout at month 14 is the most likely failure mode of a three-year plan.
- **Miss a day, not a week.** Missing one slot is noise. Missing a full week
twice in a row means re-scope the phase, not "catch up" — catch-up debt never
gets paid.
- **Notes are a build artifact.** Keep `notes/` in this repo. In three years it
becomes your blog backlog, your interview revision, and proof of the journey.
- **Quarterly review** (see §11): 90 minutes, last Sunday of the quarter.

---

## 5. Phase Map

| Phase | Window | Duration | Theme | Exit artifact |
|---|---|---|---|---|
| **0** | Sep – Oct 2026 | 8 wks | Baseline, lab, habits | Home lab + notes system running |
| **1** | Nov 2026 – Apr 2027 | 6 mo | The spine: Linux, networking, Python, AWS | **AWS SAA-C03 certified** |
| **2** | May – Oct 2027 | 6 mo | Platform lane: K8s, IaC, CI/CD, observability | **CKA certified** + GitOps platform |
| **3** | Nov 2027 – Apr 2028 | 6 mo | Reliability lane: SLOs, incidents, data, Go | SLO-driven service w/ error budget |
| **4** | May – Dec 2028 | 8 mo | Depth: distributed systems, IDP, Go in prod | Operator + internal developer platform |
| **5** | Jan – Jun 2029 | 6 mo | Market entry | Offers |

Progress:

- [ ] Phase 0 — Baseline & Instrumentation
- [ ] Phase 1 — The Spine
- [ ] Phase 2 — Platform Lane
- [ ] Phase 3 — Reliability Lane
- [ ] Phase 4 — Depth & Convergence
- [ ] Phase 5 — Market Entry

---

## Phase 0 — Baseline & Instrumentation
**Sep – Oct 2026 · 8 weeks · ~100 hours**

You cannot improve what you do not measure, and you cannot build what you have
nowhere to run. Phase 0 buys the tooling for the next three years. Resist the
urge to skip it — the people who skip Phase 0 are the ones who quit in month 9.

### Outcomes
- A home lab you can destroy and rebuild from code in under an hour.
- A notes system with spaced repetition wired in.
- An honest written baseline of what you do and do not know.
- The weekly cadence surviving four consecutive weeks.

### Build
1. **The lab.** Three Linux VMs (Proxmox, or libvirt/KVM on a spare box; a
single 32 GB machine is enough). Rules: no clicking. Everything reproducible.
Start with plain shell + Ansible; Terraform arrives in Phase 2.
2. **The notes repo.** Markdown, in git, in this repository under `notes/`.
One file per topic. Add an Anki deck (or `.md` flashcards) for facts that
must be recallable under interview pressure — port numbers, syscalls, exit
codes, PromQL functions.
3. **Baseline self-assessment.** Work through the SRE Checklist and the
sysadmin question set below *cold*, before studying. Score yourself. Commit
the result to `notes/baseline-2026-09.md`. In 2029 this document will be the
most motivating thing in the repo.
4. **Git fluency.** You will live in git for three years. One evening, properly.

### Read
- [ ] [Useful git commands for SRE and DevOps engineers](https://reliabilityengineering.substack.com/p/useful-git-commands-for-sre-and-devops)
- [ ] Simple: [What happens when you type in 'www.cnn.com' in your browser?](https://syedali.net/2013/08/18/what-happens-when-you-type-in-www-cnn-com-in-your-browser)
- [ ] Detailed: [What happens when you type google.com into your browser's address box and press enter?](https://github.com/alex/what-happens-when)
- [ ] [Processes and Threads](https://planetscale.com/blog/processes-and-threads)
- [ ] [Introduction to Linux – Full Course for Beginners](https://www.youtube.com/watch?v=sWbUDq4S6Y8) — skim only; use it to find gaps, not to learn linearly
- [ ] [SRE Checklist](https://github.com/bregman-arie/sre-checklist) — the baseline instrument
- [ ] [Sysadmin Test Questions](https://github.com/trimstray/test-your-sysadmin-skills) — score yourself cold
- [ ] [School of SRE](https://linkedin.github.io/school-of-sre) — read the whole thing once, fast, for the map
- [ ] [Things That Makes a Good Site Reliability Engineer](https://reliabilityengineering.substack.com/p/things-that-makes-a-good-site-reliability)

### Gate to Phase 1
Lab rebuilds from scratch with one command. Four weeks of cadence logged.
Baseline committed. Do not proceed without all three.

---

## Phase 1 — The Spine
**Nov 2026 – Apr 2027 · 6 months · ~340 hours**

Everything senior is built on this phase. Kubernetes, service meshes, and
whatever replaces them in 2031 are all abstractions over Linux processes,
memory, filesystems, and packets. Engineers who skip this ceiling out at
mid-level because they can only debug down to the abstraction boundary and no
further. **This is the phase that decides whether you become senior.**

### Outcomes
- You can explain, without hand-waving, what happens from power-on to login
prompt, and from keypress to rendered page.
- You debug with `strace`, `lsof`, `/proc`, `ss`, `tcpdump`, and `perf` by reflex.
- You write Python that other people can maintain.
- **AWS Solutions Architect Associate (SAA-C03), passed.**

### 1a. Linux internals · Nov 2026 – Jan 2027

The single highest-leverage body of knowledge in this entire roadmap.

- [ ] [What every SRE should know about GNU/Linux shell related internals: file descriptors, pipes, terminals, user sessions, process groups and daemons](https://biriukov.dev/docs/fd-pipe-session-terminal/0-sre-should-know-about-gnu-linux-shell-related-internals-file-descriptors-pipes-terminals-user-sessions-process-groups-and-daemons)
- [ ] [SRE deep dive into Linux Page Cache](https://biriukov.dev/docs/page-cache/0-linux-page-cache-for-sre)
- [ ] [Linux Internals workshop - Google TechTalks](https://www.youtube.com/playlist?list=PLSIUOFhnxEiC3YTdxwqZqgEY5imVL8U8J)
- [ ] [Processes in Linux - Everything You Need to Know](https://reliabilityengineering.substack.com/p/everything-you-need-to-know-about)

**Boot process** — pick this apart on a lab VM; break the initramfs on purpose and recover it.

- [ ] [How Does Linux Boot Process Work?](https://youtu.be/XpFsMB6FoOs)
- [ ] [An introduction to the Linux boot and startup processes](https://opensource.com/article/17/2/linux-boot-and-startup)
- [ ] [What happens when we turn on computer?](https://www.geeksforgeeks.org/what-happens-when-we-turn-on-computer/)
- [ ] [What happens when we turn on computer? (discussion)](https://leetcode.com/discuss/interview-question/125107/What-happens-when-we-turn-on-computer)
- [ ] [From Power up to login prompt](http://www.scott-a-s.com/files/linux_boot.pdf)

**Filesystem** — you run S3-compatible storage on-prem; this is directly your job.

- [ ] [Understanding Inodes](https://syedali.net/2015/02/08/understanding-inodes)
- [ ] [Understand UNIX / Linux Inodes Basics with Examples](https://www.thegeekstuff.com/2012/01/linux-inodes)
- [ ] [Understanding proc filesystem](https://syedali.net/2013/08/20/understanding-proc-filesystem)
- [ ] [Common Mount Options](https://syedali.net/2015/01/06/common-mount-options)
- [ ] [Understanding Linux filesystems: ext4 and beyond](https://opensource.com/article/18/4/ext4-filesystem)

**Kernel** — read for concepts, not to become a kernel developer. Aim to reason
about memory pressure, OOM kills, context switches, and scheduling latency.

- [ ] [Explain the basics of Linux kernel](http://learnlinuxconcepts.blogspot.com/2014/03/explain-basics-of-linux-kernel.html)
- [ ] [Kernel Space and User Space](http://learnlinuxconcepts.blogspot.com/2014/02/kernel-space-and-user-space.html)
- [ ] [Linux Kernel Process Management](http://learnlinuxconcepts.blogspot.com/2014/03/process-management.html)
- [ ] [Linux Addressing](http://learnlinuxconcepts.blogspot.com/2014/02/linux-addressing.html)
- [ ] [Linux Kernel Memory Management](http://learnlinuxconcepts.blogspot.com/2014/02/linux-memory-management.html)
- [ ] [Stack and Heap](http://learnlinuxconcepts.blogspot.com/2014/02/stack-and-heap.html)
- [ ] [Paging and Segmentation](http://learnlinuxconcepts.blogspot.com/2014/02/paging-and-segmentation.html)
- [ ] [Linux Kernel System Calls](http://learnlinuxconcepts.blogspot.com/2014/02/system-calls.html)
- [ ] [The Virtual Filesystem](http://learnlinuxconcepts.blogspot.com/2014/10/the-virtual-filesystem.html)
- [ ] [Concurrency and Race Conditions](http://learnlinuxconcepts.blogspot.com/2014/07/concurrency-and-race-conditions.html)
- [ ] [Memory Leak](https://stackoverflow.com/questions/312069/the-best-memory-leak-definition)
- [ ] [What is a kernel Panic?](http://learnlinuxconcepts.blogspot.com/2014/07/what-is-kernel-panic.html)
- [ ] [linux-insides — a book about the Linux kernel](https://0xax.gitbooks.io/linux-insides/content) — reference, dip in; do not read cover-to-cover

**Troubleshooting** — this is a *skill*, not a reading list. Drill it weekly.

- [ ] [Linux troubleshooting tools](https://syedali.net/2013/08/20/linux-troubleshooting-tools)
- [ ] [Linux Performance Analysis in 60,000 Milliseconds](https://medium.com/netflix-techblog/linux-performance-analysis-in-60-000-milliseconds-accc10403c55) — memorize this checklist
- [ ] [strace](https://www.dedoimedo.com/computers/strace.html)
- [ ] [lsof](https://www.dedoimedo.com/computers/lsof.html)
- [ ] [Linux system debugging](https://www.dedoimedo.com/computers/linux-system-debugging-super.html)
- [ ] [SadServers — practise Linux troubleshooting](https://sadservers.com) — **standing commitment: one scenario every Wednesday, timed, for the next three years.** Nothing else on this list transfers to interviews as directly.

### 1b. Networking · Dec 2026 – Feb 2027

Run in parallel with Linux. Networking is where on-prem experience makes you
dramatically better than cloud-only peers — you can actually see the topology.

- [ ] [The Internet explained from first principles](https://explained-from-first-principles.com/internet)
- [ ] [Beej's Guide to Networking Concepts](https://beej.us/guide/bgnet0)
- [ ] [Network protocols for anyone who knows a programming language](https://www.destroyallsoftware.com/compendium/network-protocols?share_key=97d3ba4c24d21147)
- [ ] [Introduction to Linux interfaces for virtual networking](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking) — the foundation of every container network you will ever debug
- [ ] [What every SRE should know about GNU/Linux resolvers and Dual-Stack applications](https://biriukov.dev/docs/resolver-dual-stack-application/0-sre-should-know-about-gnu-linux-resolvers-and-dual-stack-applications)
- [ ] [Load Balancing Algorithms](https://syedali.net/2013/08/22/load-balancing-algorithms)
- [ ] [Introduction to modern network load balancing and proxying](https://blog.envoyproxy.io/introduction-to-modern-network-load-balancing-and-proxying-a57f6ff80236)
- [ ] [Multi-tier load-balancing with Linux](https://vincent.bernat.ch/en/blog/2018-multi-tier-loadbalancer)

### 1c. Python for operations · Nov 2026 – Feb 2027

Enough Python to automate anything and pass a coding screen. Go comes in Phase 3.

- [ ] [Python Basics](https://pythonbasics.org/)
- [ ] [Python For Everyone](https://www.py4e.com/)
- [ ] [Complete Python Tutorial](https://www.scaler.com/topics/python/)

### 1d. AWS SAA-C03 · Jan – Mar 2027 (exam by 31 Mar)

Book the exam **before** you start studying. A paid deadline is the only
reliable forcing function. Budget 6–8 weeks at ~5 h/week alongside the rest.

- [ ] [The Open Guide to Amazon Web Services](https://github.com/open-guides/og-aws) — the best non-marketing AWS resource that exists
- [ ] Official SAA-C03 exam guide + one video course + one practice-exam bank
- [ ] Build every core service by hand once: VPC/subnets/route tables, EC2, S3, IAM, RDS, ALB, ASG, CloudWatch
- [ ] **Map AWS onto your on-prem world.** Write `notes/onprem-vs-aws.md`: your
S3-compatible store vs. real S3 (consistency, durability, storage classes);
your physical network vs. VPC; your hypervisor vs. EC2 placement. This
comparison is a genuinely strong interview story — most candidates only
know one side of it.
- [ ] **Exam passed** 🎯

*Awareness only — do not study these now, just know they exist:*
- [ ] [Learning Azure](https://docs.microsoft.com/en-us/learn/azure/)
- [ ] [Hands-On Training with GCP](https://cloud.google.com/training/badges)

### Books for this phase
- [ ] [UNIX and Linux System Administration Handbook (5th Edition)](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554) — your desk reference for the whole phase
- [ ] [Linux Pocket Guide, 3rd Edition](http://shop.oreilly.com/product/0636920040927.do)
- [ ] [TCP/IP Illustrated, Volume 1](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313) — reference; read the TCP chapters properly
- [ ] [Linux Kernel Development (3rd Edition)](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468) — optional, Phase 1 stretch goal

### Gate to Phase 2
SAA-C03 passed. 20+ SadServers scenarios solved. You can trace a packet from
your laptop to a container and name every hop and translation. Three blog posts
published.

---

## Phase 2 — The Platform Lane
**May – Oct 2027 · 6 months · ~340 hours**

Now you build the thing other engineers use. This phase is where the "Platform
Engineer" half of your title comes from, and it is deliberately hands-heavy: the
ratio flips to roughly 40% reading, 60% building.

### Outcomes
- **CKA certified.**
- A GitOps-managed Kubernetes platform in your lab that you can rebuild from an
empty repo, with observability, ingress, and a deployment pipeline.
- You can explain what happens when you `kubectl apply`, end to end, at the
level of API server → etcd → controller → kubelet → CRI → cgroups/namespaces.

### 2a. Containers — first, and properly · May 2027

Containers are Linux namespaces + cgroups + a filesystem trick. Learn them at
that level and Kubernetes stops being magic.

- [ ] [Introduction to Docker and Containers](http://container.training/intro-selfpaced.yml.html)
- [ ] [Containers Patterns](https://l0rd.github.io/containerspatterns)
- [ ] [Docker Container Anti Patterns](https://blog.couchbase.com/docker-container-anti-patterns/)
- [ ] [Anti-Patterns When Building Container Images](https://jpetazzo.github.io/2021/11/30/docker-build-container-images-antipatterns)
- [ ] **Exercise:** build a container from scratch with `unshare`, `cgcreate` and
`pivot_root`. No Docker. One Saturday. You will never be confused about
containers again.

### 2b. Kubernetes · May – Sep 2027

The largest single block in the roadmap. Install it the hard way once, then
never again.

- [ ] [Deploying and Scaling Microservices with Docker and Kubernetes](http://container.training/kube-selfpaced.yml.html)
- [ ] [Demystifying the Kubernetes Iceberg](https://asankov.dev/post/demystifying-the-kubernetes-iceberg-1)
- [ ] [What happens when ... Kubernetes edition!](https://github.com/jamiehannaford/what-happens-when-k8s/blob/master/README.md) — the single most important document in this section
- [ ] [Kubernetes Learning Roadmap](https://github.com/techiescamp/kubernetes-learning-path)
- [ ] [47 Things To Become a Kubernetes Expert](https://ymmt2005.hatenablog.com/entry/k8s-things) — use as a self-audit at the end of the phase

**Networking** — the part everyone fakes. Do not fake it.

- [ ] [THE KUBERNETES NETWORKING GUIDE](https://www.tkng.io)
- [ ] [A Guide to the Kubernetes Networking Model](https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model)
- [ ] [Kubernetes networking: service, kube-proxy, load balancing](https://learnkube.com/kubernetes-services-and-load-balancing)
- [ ] [The life of a DNS query in Kubernetes](https://www.nslookup.io/learning/the-life-of-a-dns-query-in-kubernetes)

**Production practice**

- [ ] [Kubernetes production best practices](https://learnkube.com/production-best-practices)
- [ ] [Kubernetes Production Patterns](https://github.com/gravitational/workshop/blob/master/k8sprod.md)
- [ ] [Kubernetes Best Practices 101](https://github.com/diegolnasc/kubernetes-best-practices)
- [ ] [15 Kubernetes Best Practices Every Developer Should Know](https://spacelift.io/blog/kubernetes-best-practices)
- [ ] [From Linux Primitives to Kubernetes Security Contexts](https://learnkube.com/security-contexts) — read this right after Phase 1; it is where your kernel knowledge pays off
- [ ] [Kubernetes YAML tips and tricks](https://itnext.io/kubernetes-yaml-tips-and-tricks-904a2c0b2b81)

- [ ] **CKA exam passed** 🎯 (target: September 2027 — it is hands-on and timed, so drill with `kubectl` speed practice, not videos)

### 2c. Infrastructure as Code · Jun – Aug 2027

- [ ] [Terraform](https://learn.hashicorp.com/terraform)
- [ ] [Getting Started With Terraform on AWS](https://spacelift.io/blog/terraform-tutorial)
- [ ] [A Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca)
- [ ] [Google Cloud: Best practices for using Terraform](https://cloud.google.com/docs/terraform/best-practices-for-terraform) — cloud-agnostic advice despite the title
- [ ] [Terraform Roadmap](https://roadmap.sh/terraform)
- [ ] [Ansible](https://github.com/leucos/ansible-tuto) — you will need this for on-prem; IaC and config management solve different problems
- [ ] *Optional cert:* HashiCorp Terraform Associate — cheap, fast, and a useful CV keyword for EU listings

### 2d. CI/CD & delivery · Aug – Oct 2027

- [ ] [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
- [ ] [CI/CD patterns](https://continuousdelivery.com/implementing/patterns)
- [ ] [7 Pipeline Design Patterns for Continuous Delivery](https://www.singlestoneconsulting.com/blog/7-pipeline-design-patterns-for-continuous-delivery)
- [ ] [Six Strategies for Application Deployment](https://thenewstack.io/deployment-strategies) — be able to argue blue/green vs. canary vs. rolling with tradeoffs
- [ ] [What Is GitOps?](https://codefresh.io/learn/gitops)
- [ ] **Build:** ArgoCD or Flux managing the entire lab from git. Deleting the
cluster and re-bootstrapping must restore everything.

### 2e. Observability foundations · Sep – Oct 2027

Prometheus lands here rather than in the reliability phase because you need the
telemetry *before* you can do SLOs in Phase 3.

- [ ] [Introduction to Prometheus](https://training.promlabs.com/training/introduction-to-prometheus/training-overview/introduction)
- [ ] [A Deep Dive Into the Four Types of Prometheus Metrics](https://www.timescale.com/blog/four-types-prometheus-metrics-to-collect)
- [ ] [How Prometheus Querying Works](https://www.timescale.com/blog/how-prometheus-querying-works-and-why-you-should-care)
- [ ] [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet) — Wednesday drill material
- [ ] [Prometheus Relabeling Training](https://training.promlabs.com/training/relabeling/training-overview/prerequisites)
- [ ] [Avoid These 6 Mistakes When Getting Started With Prometheus](https://promlabs.com/blog/2022/12/11/avoid-these-6-mistakes-when-getting-started-with-prometheus)
- [ ] [The four Golden Signals of Kubernetes monitoring](https://sysdig.com/blog/golden-signals-kubernetes)
- [ ] *Optional cert:* Prometheus Certified Associate (PCA) — low cost, unusually well-targeted at SRE hiring

### Gate to Phase 3
CKA passed. Lab rebuilds from an empty cluster via GitOps in under 30 minutes.
Prometheus + Grafana + alerting running on real workloads. Six blog posts total.

---

## Phase 3 — The Reliability Lane
**Nov 2027 – Apr 2028 · 6 months · ~340 hours**

Phase 2 made you a strong DevOps engineer. **Phase 3 makes you an SRE.** The
difference is not tooling — it is that you now reason quantitatively about
reliability and treat it as an engineering constraint with a budget, rather than
as a feeling.

By the end of this phase you should be operating at the mid-level bar in §3.

### Outcomes
- A service in your lab with real SLIs, a defined SLO, a burn-rate alerting
policy, and a documented error budget you have actually spent.
- Written postmortems for failures you deliberately caused.
- Working Go, ready to write production code in Phase 4.

### 3a. SLIs, SLOs and error budgets · Nov – Dec 2027

The intellectual core of SRE. If you master one thing this year, this is it —
"how do you set an SLO?" is asked in essentially every SRE interview.

- [ ] [Implementing SLOs](https://sre.google/workbook/implementing-slos/) — read three times
- [ ] [Why bother with SLI and SLO?](https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo)
- [ ] [Practical Guide to SRE: Using SLOs to Increase Reliability](https://rootly.io/blog/practical-guide-to-sre-using-slos-to-increase-reliability)
- [ ] [Setting up Service Monitoring — The Why's and What's](https://amitosh.medium.com/the-whys-and-what-s-of-setting-up-service-monitoring-cc1c165ee088)
- [ ] [How NOT to Measure Latency](https://youtu.be/lJ8ydIuPFeU) — percentiles, coordinated omission; watch twice
- [ ] [Site Reliability Engineering: Measuring and Managing Reliability](https://www.coursera.org/learn/site-reliability-engineering-slos) (Coursera)
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803) (book)

### 3b. Incident response & postmortems · Dec 2027 – Jan 2028

- [ ] [Incident Response](https://response.pagerduty.com) — the industry reference
- [ ] [Postmortems](https://postmortems.pagerduty.com)
- [ ] [The practical guide to incident management](https://incident.io/guide)
- [ ] [An Incident Command Training Handbook](https://blog.danslimmon.com/2019/06/24/an-incident-command-training-handbook)
- [ ] [Howie guide to post-incident investigations](https://www.jeli.io/howie/welcome)
- [ ] [Incident Management vs. Incident Response - What's the Difference?](https://rootly.io/blog/incident-management-vs-incident-response-what-s-the-difference)
- [ ] [Runbooks](https://web.archive.org/web/20231005015754/https://www.transposit.com/devops-blog/itsm/what-makes-a-good-runbook)
- [ ] [Practical Guide to SRE: Automating On-Call](https://rootly.io/blog/practical-guide-to-sre-automating-on-call)
- [ ] **Build: the game-day habit.** Once a month, break your lab on purpose —
fill a disk, blackhole DNS, OOM a pod, partition the network, corrupt
etcd. Run it as a real incident: timeline, comms, mitigation. Write the
postmortem. **Twelve postmortems by mid-2028 is a portfolio no junior has.**

### 3c. SRE as an organizational practice · Jan – Feb 2028

Senior interviews probe how SRE *works inside a company*, not just its tools.
This block is what lets you answer "how would you introduce SLOs to a team that
does not want them?"

- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents) (the book — read fully this phase)
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents)
- [ ] [Identifying and tracking toil using SRE principles](https://cloud.google.com/blog/products/management-tools/identifying-and-tracking-toil-using-sre-principles)
- [ ] [How SRE teams are organized, and how to get started](https://cloud.google.com/blog/products/devops-sre/how-sre-teams-are-organized-and-how-to-get-started)
- [ ] [SRE Engagement Models](https://certomodo.substack.com/p/sre-engagement-models)
- [ ] [Building SRE from Scratch](https://medium.com/ibm-garage/building-sre-from-scratch-485e23985bbd)
- [ ] [Starting SRE at startups and smaller organizations](https://www.srepath.com/starting-sre-at-startups-and-smaller-organizations)
- [ ] [Going from Zero to SRE](https://www.squadcast.com/blog/going-from-zero-to-sre)
- [ ] [SRE in the Real World](https://blog.relyabilit.ie/sre-in-the-real-world)
- [ ] [SRE at Google: Our complete list of CRE life lessons](https://cloud.google.com/blog/products/devops-sre/sre-at-google-our-complete-list-of-cre-life-lessons)
- [ ] [Rundown of LinkedIn's SRE practices](https://www.srepath.com/rundown-of-linkedins-sre-practices)
- [ ] [Rundown of Uber's SRE practice](https://www.srepath.com/rundown-of-uber-sre-practice)
- [ ] [The System Resiliency Pyramid](https://www.codereliant.io/the-system-resiliency-pyramid)
- [ ] [10 Tips for Onboarding New SRE Hires](https://www.srepath.com/10-tips-for-onboarding-new-sre-hires)
- [ ] [Seeking SRE](https://books.google.ru/books?id=tmhqDwAAQBAJ) (book — essay collection, dip in)

### 3d. Data layer reliability · Feb – Mar 2028

Stateful systems are where reliability gets genuinely hard, and where most
candidates are weakest. Being the SRE who is comfortable with databases is a
disproportionate advantage.

- [ ] [Things You Should Know About Databases](https://architecturenotes.co/things-you-should-know-about-databases)
- [ ] [How do database indexes work?](https://planetscale.com/blog/how-do-database-indexes-work)
- [ ] [7 Database Paradigms](https://youtu.be/W2Z7fbCLSTw)
- [ ] [SQL vs. NoSQL Database: When to Use, How to Choose](https://www.ml4devs.com/en/articles/datastore-choices-sql-vs-nosql-database/)
- [ ] [ACID vs BASE in Databases](https://medium.com/geekculture/acid-vs-base-in-databases-1bcad774da26)
- [ ] [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem) — know its real limits, and why PACELC is the better framing
- [ ] [Database Replication](https://galeracluster.com/library/documentation/tech-desc-introduction.html#database-replication)
- [ ] [Understanding Database Sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)
- [ ] [Database Sharding](https://planetscale.com/blog/database-sharding)
- [ ] [Database Sharding Explained](https://architecturenotes.co/database-sharding-explained)
- [ ] [Redis Explained](https://architecturenotes.co/redis)
- [ ] [Kafka 101](https://highscalability.com/untitled-2)
- [ ] [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html) — how schema changes ship without downtime

### 3e. Performance engineering · ongoing through the phase

- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808) — Brendan Gregg. **The most important book in this repository after the Google SRE book.** Work through it slowly across the whole phase.
- [ ] [Systems Performance: Enterprise and the Cloud](https://www.amazon.com/Systems-Performance-Enterprise-Brendan-Gregg/dp/0133390098) (1st edition — use only if you cannot get the 2nd)

### 3f. Go — begin now, use in Phase 4 · Feb – Apr 2028

Go is the language of the infrastructure world: Kubernetes, Terraform,
Prometheus, Docker, etcd. Reading it is required to debug your stack; writing it
is what separates a mid-level SRE from a senior one.

- [ ] [A tour of Go](https://tour.golang.org)
- [ ] [Go by Example](https://gobyexample.com)
- [ ] [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/) — the best path in; tests-first suits infra work
- [ ] [Effective Go](https://golang.org/doc/effective_go.html)
- [ ] [Go Tutorials & Examples](https://gosamples.dev)
- [ ] [Getting up and running with Go](http://www.golangprograms.com)
- [ ] [Style Guide](https://google.github.io/styleguide/go/guide)
- [ ] [Style Decisions](https://google.github.io/styleguide/go/decisions)
- [ ] [Best Practices](https://google.github.io/styleguide/go/best-practices)
- [ ] [Go Design Patterns](https://github.com/tmrts/go-patterns)
- [ ] [Go Memory Management](https://povilasv.me/go-memory-management)
- [ ] [50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs](https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang)
- [ ] **Exercise:** read the source of a Kubernetes controller you use. Then fix
a `good-first-issue` in any CNCF project.

### Gate to Phase 4
A service with a published SLO and a burn-rate alert that has fired for real.
Six postmortems written. Go good enough to build a small HTTP service with
tests. You meet most of the mid-level rubric.

---

## Phase 4 — Depth & Convergence
**May – Dec 2028 · 8 months · ~450 hours**

This is the senior-making phase. Phases 1–3 gave you a stack you can operate;
Phase 4 is about **designing systems**, building the platform as a product, and
producing the evidence that you operate above your years of experience.

### Outcomes
- You can run a 45-minute system design interview from the whiteboard side.
- A Kubernetes operator or controller you wrote in Go, running in your lab.
- An internal developer platform with a golden path a real person can use.
- A public body of work: talks, posts, and merged open-source contributions.

### 4a. Distributed systems & architecture · May – Aug 2028

- [ ] [Distributed systems](http://book.mixu.net/distsys/single-page.html) — start here; short and dense
- [ ] [The System Design Primer](https://github.com/donnemartin/system-design-primer) — the canonical reference
- [ ] [System Design 101](https://github.com/ByteByteGoHq/system-design-101)
- [ ] [Web Architecture 101](https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947)
- [ ] [What's in a Production Web Application?](https://web.archive.org/web/20210106095747/http://stephenmann.io/post/whats-in-a-production-web-application)
- [ ] [Monoliths, Service Architecture, and Microservices](https://architecturenotes.co/granularity-of-systems)
- [ ] [Scale From Zero To Millions Of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [ ] [Caching](https://planetscale.com/blog/caching)
- [ ] [Load Balancing](https://samwho.dev/load-balancing) — interactive; genuinely excellent
- [ ] [Failover](https://blog.alexewerlof.com/p/failover)
- [ ] [The principles of extreme fault tolerance](https://planetscale.com/blog/the-principles-of-extreme-fault-tolerance)
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems) — the security-meets-reliability book; increasingly asked about at senior level

*Structured courses (pick at most one — they overlap heavily, and neither is a
substitute for the reading above):*
- [ ] [SystemsExpert course from AlgoExpert](https://www.algoexpert.io/systems/product)
- [ ] [Grokking the System Design Interview](https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers)

### 4b. Platform engineering as a product · Jun – Oct 2028

There is little canonical written material here yet, so this block is mostly
build work. That is fine — it is also why the skill is scarce and well paid.

- [ ] **Golden path.** A template repo that takes an application from `git init`
to production with SLOs, dashboards, alerts, and a pipeline attached — no
tickets, no platform-team involvement.
- [ ] **Self-service.** Backstage, a Crossplane control plane, or your own thin
API. The measure is whether a developer can provision without you.
- [ ] **Policy as code.** OPA/Gatekeeper or Kyverno. Guardrails, not gates.
- [ ] **Multi-tenancy.** Namespaces, quotas, network policies, RBAC, and a
documented, defensible isolation model.
- [ ] **Cost awareness.** Attribute lab or AWS spend to a workload. FinOps
literacy is a real differentiator in senior platform interviews.
- [ ] **Treat it as a product.** Write a one-page platform README aimed at your
users, define adoption metrics, and collect feedback from at least one
real person who is not you. This mindset *is* the seniority signal.

### 4c. Go in production · May – Dec 2028

- [ ] Build a Kubernetes **operator** with kubebuilder / controller-runtime.
Reconciliation loops are the deepest idea in the ecosystem and understanding
them properly changes how you see the whole platform.
- [ ] Write a Prometheus exporter for something in your lab with no exporter.
- [ ] Instrument a Go service with OpenTelemetry: metrics, logs, traces.
- [ ] Contribute meaningfully to one CNCF project. Not a typo fix — a real change.

### 4d. Deepening the reliability lane · ongoing

- [ ] Chaos engineering with real hypotheses: steady-state metric, blast radius,
abort conditions. Not "randomly kill pods."
- [ ] Capacity planning with actual load tests and headroom modelling.
- [ ] Multi-region / multi-DC failover design — write the runbook, then test it.
- [ ] Progressive delivery: automated canary analysis tied to your SLIs.

### Gate to Phase 5
Operator running. Platform used by someone other than you. Twelve+ blog posts.
One conference or meetup talk given (local, online, or internal — any counts).
One meaningful open-source contribution merged. You meet most of the senior rubric.

---

## Phase 5 — Market Entry
**Jan – Jun 2029 · 6 months**

Different mode: this phase is a **campaign**, not a curriculum. The engineering
is done; now you convert it. Keep building at a reduced pace so you stay sharp,
but the majority of your hours move to interviewing, applications, and outreach.

### 5a. System design interview practice · Jan – Mar 2029

Design is the highest-weight round for SRE and Platform roles at mid-to-senior
level. Practise **out loud, timed, with a whiteboard**. Reading solutions builds
false confidence — you fail these rounds on communication, not knowledge.

- [ ] [Crack the System Design Interview](https://tianpan.co/notes/2016-02-13-crack-the-system-design-interview)
- [ ] [System design interview for IT companies](https://github.com/checkcheckzz/system-design-interview)
- [ ] [Designing WhatsApp](http://highscalability.com/blog/2022/1/3/designing-whatsapp.html)
- [ ] [Designing Uber](http://highscalability.com/blog/2022/1/25/designing-uber.html)
- [ ] [Designing Tinder](http://highscalability.com/blog/2022/1/17/designing-tinder.html)
- [ ] [Designing Instagram](http://highscalability.com/blog/2022/1/11/designing-instagram.html)
- [ ] [Designing Netflix](http://highscalability.com/blog/2021/12/13/designing-netflix.html)
- [ ] **The SRE twist:** you will usually be asked to design *and then operate*
the system. Always volunteer the SLIs, the failure modes, the deployment
strategy, and the on-call story. That is what distinguishes an SRE answer
from a generic backend answer, and most candidates never make the shift.

### 5b. Coding & algorithms · Jan – Apr 2029 (start drip-feeding in late Phase 4)

SRE coding rounds are usually gentler than SWE rounds — expect practical
manipulation, parsing, and concurrency more often than dynamic programming — but
the bar is real at large companies, and Google-style SRE loops do ask properly.

- [ ] [Big O](https://samwho.dev/big-o)
- [ ] [Hacking a Google Interview – Handout 1](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_1.pdf)
- [ ] [Hacking a Google Interview – Handout 2](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf)
- [ ] [Hacking a Google Interview – Handout 3](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_3.pdf)
- [ ] [AlgoExpert](https://www.algoexpert.io) — or LeetCode; ~150 problems is plenty for SRE
- [ ] Target: 3–4 problems/week from Sept 2028, arrays/strings/hashmaps/heaps/graphs

### 5c. Domain interview prep · ongoing

- [ ] [A collection of questions to practice with for SRE interviews](https://github.com/michael-kehoe/sre-interview)
- [ ] [SRE Interview Questions](https://syedali.net/engineer-interview-questions)
- [ ] [Questions I ask in SRE interviews](https://dev.to/logan/questions-i-ask-in-sre-interviews-a9j)
- [ ] [Kubernetes job interview questions](https://enterprisersproject.com/article/2019/2/kubernetes-job-interview-questions-how-prepare)
- [ ] [The Must-Know Terraform Interview Questions](https://devopsknowledge.hashnode.dev/the-must-know-terraform-interview-questions)
- [ ] [DevOps Guide](https://github.com/Tikam02/DevOps-Guide)
- [ ] [DevOps Roadmap: Learn to become a DevOps Engineer or SRE](https://roadmap.sh/devops) — gap-check only

### 5d. Process, positioning & narrative

- [ ] [SRE Complete Resume Writing Guide](https://rootly.com/blog/sre-complete-resume-writing-guide)
- [ ] [Recruitment process for a Google job (SRE, Site Reliability Engineer)](https://web.archive.org/web/20220328124724/http://lambda-startup.com/recruitment-process-for-a-google-job-sre-site-reliability-engineer)
- [ ] [SRE Interviews in Silicon Valley](http://blog.marc-seeger.de/2015/05/01/sre-interviews-in-silicon-valley)
- [ ] [Preparing the SRE interview](https://blog.balthazar-rouberol.com/preparing-the-sre-interview)
- [ ] [How to Get Into SRE](https://blog.alicegoldfuss.com/how-to-get-into-sre)
- [ ] [How to Get an SRE Role](https://certomodo.substack.com/p/how-to-get-an-sre-role)
- [ ] [My Job Interview at Google](https://catonmat.net/my-job-interview-at-google)
- [ ] [How I get a job at Google as SRE](https://fabrizio2210.medium.com/how-i-get-a-job-at-google-as-sre-83d44aef7859)
- [ ] [Becoming a Site Reliability Engineer](https://www.tik.dev/blog/becoming-an-sre)
- [ ] [Path to Site Reliability Management](https://danrl.com/srm)
- [ ] [Become A DevOps Engineer in 2023: Detailed Guide](https://devopscube.com/become-devops-engineer)
- [ ] [DevOps Career Path](https://www.scaler.com/blog/devops-career-path/)
- [ ] [Key DevOps Engineer Skills You Need in 2024](https://www.scaler.com/blog/devops-engineer-skills/)
- [ ] [How to hire talent](https://syedali.net/2014/04/01/how-to-hire-talent) — read from the hiring side; it changes how you present yourself

### 5e. Campaign mechanics

- **Write 8–10 STAR stories** before applying, drawn from real incidents, your
postmortems, and the platform work. Every behavioural question is a remix of
these. Rehearse them out loud.
- **Application funnel.** Expect roughly 100 applications → 20 screens → 8 loops
→ 2–3 offers for an international relocation search. Track it in a sheet;
treat a low conversion at any stage as a bug in that stage, not as a verdict.
- **Never interview at your top choice first.** Order companies deliberately:
three practice loops before the ones you care about.
- **Negotiate.** Always. For relocation roles, negotiate the package: relocation
allowance, visa costs for dependants, temporary housing, and the start date.

---

## 6. Certification Track

Certifications will not make you a good engineer. They *will* get a CV past
non-technical screening — which matters disproportionately for international
applications where nobody knows your employer.

| Cert | Target | Why |
|---|---|---|
| **AWS Solutions Architect Associate** | Q1 2027 | Highest-signal entry cert; opens cloud roles and complements your on-prem background. |
| **CKA** | Sep 2027 | Hands-on and respected. The single best cert for SRE/Platform hiring. |
| Terraform Associate | Q4 2027 | Cheap, quick, frequently listed in EU job ads. |
| Prometheus Certified Associate | 2028 | Optional. Unusually well-aimed at SRE work. |
| **CKS** *or* **AWS DevOps Engineer Pro** | 2028 | Pick one. CKS if the platform lane pulls ahead; DevOps Pro if the cloud lane does. |

Do not collect more than this. Past ~5 certs, each additional one signals
*studying* rather than *building*, and reviewers read it that way.

---

## 7. Portfolio: The Six Artifacts

These carry your job search. Each lives in a public repo with a README that
explains the design decisions and the tradeoffs — **the README is the artifact**,
because it is what a hiring manager actually reads.

1. **The lab** — bare-metal/VM Kubernetes, fully IaC-managed, rebuildable from zero.
2. **The observability stack** — Prometheus, Grafana, Alertmanager, tracing, with
documented SLOs and burn-rate alerting on real workloads.
3. **The operator** — a Go controller solving an actual problem in your lab.
4. **The platform** — golden path, self-service provisioning, policy as code,
written for its users.
5. **The postmortem collection** — 12+ real writeups from your game days. Rare,
cheap to produce, and instantly credible.
6. **The AWS environment** — multi-environment Terraform with CI, remote state,
drift detection, and a written cost model.

---

## 8. Public Visibility

You are competing against candidates with recognizable employers on their CVs.
Public work is how you close that gap, and for remote and relocation hiring it
is often what generates the inbound in the first place.

- **Monthly blog post**, from Phase 1 onward. ~30 posts by 2029. Write what you
just learned while the confusion is still fresh — that is what makes a post
useful to others and memorable to you.
- **The best posts are specific failures.** "Why our page cache filled up and
what I learned about `vm.dirty_ratio`" outperforms "Introduction to Kubernetes"
by an enormous margin. Nobody needs another intro post.
- **Talk** at a local meetup or an internal brown-bag from 2028. One talk is
worth ten posts for credibility.
- **Open source** from Phase 3. Issues and reviews count, not only code.
- **LinkedIn**, in English, kept current with each artifact. Recruiters for EU
relocation roles search it directly — this is the highest-ROI hour per month
in the whole plan.

---

## 9. Converting Your On-Prem Job Into Senior Experience

Your day job is an asset, not a limitation. Cloud-only engineers never learn what
a failure domain physically *is*. Deliberately pursue these at work:

- **Volunteer for on-call and for incident write-ups.** Nothing else builds SRE
judgment as fast. Then quietly raise the standard of the postmortems.
- **Introduce one SLO.** Pick a service, define an SLI, measure it for a month,
and present the number. You do not need permission to measure something.
- **Automate a toil source and quantify it.** "Cut 6 engineer-hours/week" is a
CV line. "Wrote Ansible playbooks" is not.
- **Own the object storage story.** You already run S3-compatible storage on
bare metal — durability, replication, capacity, failure modes. Very few
candidates can speak to that. Go deep and make it your specialty.
- **Push for IaC and CI adoption internally.** Doing this against real
organizational friction is exactly the "influence without authority" story
senior interviews probe for.
- **Keep an evidence log.** `notes/work-log.md`, updated weekly: what broke,
what you did, what it saved. In 2029 you will not remember 2027, and this file
is where your CV and STAR stories come from.

---

## 10. Market Strategy: EU & Remote

> ⚠️ Immigration rules and salary thresholds change every year. Everything below
> is orientation, not legal advice. **Re-verify against official government
> sources at the start of Phase 4 (mid-2028), when it actually becomes actionable.**

### Germany — EU Blue Card
The most accessible EU route for experienced engineers. Requires a job offer
above an annually-set salary threshold, with a lower threshold for shortage
occupations (IT qualifies). Notably, Germany has a route for **IT specialists
without a formal degree** who can demonstrate several years of relevant
professional experience — worth checking carefully against your own situation.
Leads to permanent residence in a few years, faster with German at B1.

### Netherlands — Highly Skilled Migrant
Requires an offer from an **IATA/IND-recognized sponsor** (most large tech
employers are), above a monthly salary threshold that varies by age bracket.
Fast and predictable when the employer is already a sponsor — so filter your
applications by sponsor status early. English-language workplaces are the norm.
*(The DAFT route you may have read about is open only to US nationals, so it is
not applicable here.)*

### Ireland — Critical Skills Employment Permit
SRE and DevOps roles appear on the critical skills list. Lower salary threshold
for listed occupations, higher otherwise. English-speaking, and a large cluster
of US tech EMEA headquarters — strong overlap with the companies most likely to
recognize your skill set.

### Remote-first / US contract
Highest bar and highest ceiling. Realistically a **Phase 5 target, not a Phase 3
one** — remote-first companies hire senior people almost exclusively, because
they cannot absorb the mentoring load. What actually gets you in: a strong public
portfolio, excellent written communication (async work is writing), overlapping
hours with the team, and a clean contractor/invoicing setup.

### What to do, and when
- **Now – 2027:** build skills. Do not apply. Applying underqualified burns
companies you will want later.
- **2028:** start the passive presence — LinkedIn in English, open to work
*quietly*, take recruiter calls purely to learn what the market asks for.
Free market research, zero risk.
- **Late 2028:** talk to engineers who have already made this move. Ask about
the parts nobody writes down: tax, housing, banking, the first six months.
- **2029:** run the campaign in §5e.

### Two things worth knowing early
- **English is a technical skill in this plan.** Interviews, design discussions
and async writing are all in English. If speaking fluency lags your reading,
fix it deliberately — record yourself explaining a design for 10 minutes a
week. It is cheap and it compounds.
- **Salary anchoring.** When asked for expectations by an EU or US company,
answer with the *local market range for the role*, never with a conversion
from your current salary. Research the range before the first call.

---

## 11. The Quarterly Review

90 minutes, last Sunday of each quarter. Write the answers into
`notes/reviews/YYYY-QN.md`. Twelve of these will exist by the end.

1. Which artifacts actually shipped this quarter? (Reading does not count.)
2. Hours logged vs. the 12–15/week target. If below 8, what structurally changed?
3. Where am I against the §3 rubric — with evidence, not vibes?
4. What did I learn that changed my mind about something?
5. Is the phase timeline still real, or am I protecting a fiction?
6. What am I avoiding because it is hard? (Usually the highest-value item.)

**Re-planning is expected.** A three-year plan that survives contact with reality
unchanged was not a plan, it was a fantasy. Adjust scope and dates deliberately
at these reviews — and only at these reviews, never mid-quarter when you are
tired on a Tuesday.

---

## 12. How This Plan Fails

The realistic failure modes, in rough order of likelihood. Re-read this list at
every quarterly review and check honestly whether you are living one of them.

1. **Resource collecting.** Bookmarking, tutorial-watching, and checking boxes
without building. The checkboxes in this file are a trap if the artifacts do
not exist. **This is by far the most common outcome.**
2. **Tool chasing.** Every quarter brings a new CNCF project. Fundamentals from
Phase 1 will still be true in 2035; most of today's tools will not be.
3. **Burnout around month 12–18.** Prevented by deload weeks and by shipping
things you can see. Slowing down beats stopping.
4. **Breadth without depth.** Six clouds and no ability to debug a stalled TCP
connection. Depth is what gets hired at senior level.
5. **Silence.** Doing all the work and telling nobody. Without public evidence,
an international employer has no way to price you.
6. **Waiting to feel ready.** You will not feel ready. Mid-level candidates who
apply beat senior-capable candidates who do not. Apply on schedule in 2029
whether or not the checklist is complete.

---

## Appendix: Reference Library

Kept out of the phase flow because they are consulted, not read through.

### Core books
- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents) — Phase 3
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents) — Phase 3
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems) — Phase 4
- [ ] [Seeking SRE](https://books.google.ru/books?id=tmhqDwAAQBAJ) — Phase 3
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803) — Phase 3
- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808) — Phase 3, slowly
- [ ] [UNIX and Linux System Administration Handbook (5th Edition)](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554) — Phase 1
- [ ] [Linux Kernel Development (3rd Edition)](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468) — Phase 1 stretch
- [ ] [TCP/IP Illustrated, Volume 1](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313) — Phase 1 reference
- [ ] [Linux Pocket Guide, 3rd Edition](http://shop.oreilly.com/product/0636920040927.do) — desk reference

### Standing drills
| Drill | Cadence | Phase |
|---|---|---|
| [SadServers](https://sadservers.com) scenario, timed | Weekly (Wed) | 1 → 5 |
| [PromQL](https://promlabs.com/promql-cheat-sheet) queries against live data | Weekly | 2 → 5 |
| Game day / deliberate breakage + postmortem | Monthly | 3 → 5 |
| Blog post | Monthly | 1 → 5 |
| Coding problems (3–4) | Weekly | late 4 → 5 |
| Quarterly review | Quarterly | 0 → 5 |

---

## Credits

The original resource collection in this repository is derived from the
community-maintained SRE interview preparation lists. The phasing, cadence,
rubric, and strategy are personal and specific to this plan — if you fork it,
re-derive the timeline for your own starting point rather than adopting these
dates.
