# From DevOps Engineer to Senior Platform Engineer

> **Owner:** Mohamed Abdelazem
> **Started:** September 2026 · **Target:** 2 years · **Hard cap:** 3 years
> **Goal:** Senior Platform Engineer at a strong engineering organization, with
> SRE-grade reliability skills so SRE roles stay open as a second door, and a
> credible path to EU relocation (Germany / Netherlands / Ireland) or a
> remote-first international role.

This plan does not start from zero. You already work as a DevOps engineer: you
use Linux, Bash, Docker, CI/CD pipelines, and Kubernetes every day. What
separates you from a senior Platform Engineer isn't knowing *more tools*. It's
knowing **why** the tools behave the way they do, **building a product** other
engineers use instead of working their tickets, and **measuring** whether that
product makes them faster and safer. This plan is built around closing that gap.

It is not a link dump, and it is not a calendar. It is a **sequenced plan**:
phases, topics inside each phase, a build artifact for every topic, and a clear
"done when" test. There are no dates. **You finish a topic, prove it, and move
to the next one.** For the things you already use at work, you prove it first
and only study what the proof exposes.

Next to the phases sits [The Platform Engineering Checklist](#the-platform-engineering-checklist):
every concept, tool, and skill the plan must leave you with, in one place. The
phases are *how* you learn it; the checklist is *what* you must know at the end.

> **▶ Current focus:** Phase 0: Gap Audit & Instrumentation
> *(Update this line every time you pass a gate.)*

---

## 1. The Contract

Read this section at every quarterly review. It is what you agreed to.

| | |
|---|---|
| **Starting point** | Working DevOps engineer, early in the career. On-prem datacenters, S3-compatible object storage, real hardware. **Comfortable with:** Linux + Bash, Docker, CI/CD, Kubernetes (as a user). **Not yet:** Terraform/Ansible, Prometheus/Grafana, SLOs, Go, cloud, platform product work. |
| **The gap to senior** | Depth (internals, not commands), product thinking (a platform with users, not a pile of scripts), design (abstractions and systems, not tickets), reliability with numbers (SLOs, error budgets, capacity), and influence (written work and migrations that change how others build). |
| **Time budget** | 15–17 focused hours per week: the main track, one **Go evening**, one **design evening**, and 3 h of **Back to Basics Saturday**. Non-negotiable floor: 15 hours (9 main + 1.5 Go + 1.5 design + 3 Saturday). |
| **Horizon** | ~1,240 hours on the main track. At ~12 h/week on it, that takes about 2 years; at ~9 h/week, about 3. Back to Basics runs alongside and never ends. |
| **Standing tracks** | **Go Mastery Track:** Go in every phase, from the first week, until you are the Go expert on your team. **System Design Track:** a design kata or design reading every week, and a design doc before every build, until you can design any system out loud. **Back to Basics Saturday:** computer science from the start, plus LeetCode, every week. It keeps you relevant when tools change and keeps you interview-ready at all times. |
| **Progression** | **Gates, not dates.** A topic is done when its "done when" check passes. A phase is done when its gate passes, and every gate names the checklist domains it checks. Topics you already use at work start with a **Prove it** test. |
| **Order** | Fundamentals, then platform foundations, then **building the platform as a product**, then cloud, then depth. You build the platform on hardware you control first, where nothing is managed for you, then move it to AWS. |
| **Languages** | **Go, in every phase, to mastery.** It is the default language for every build, from the first CLI in Phase 1 to the operator in Phase 5. Python only at the level of reading and fixing your team's existing scripts. **Rust** is the specialization that sets you apart (Phase 5). |
| **Target markets** | EU relocation (DE / NL / IE) and remote-first international roles. Platform Engineer first; SRE and senior DevOps titles as the fallback. |
| **Definition of done** | You can design an internal developer platform for a few hundred engineers in an interview, defend every abstraction in it, and debug the layers underneath it when it breaks. |

### The seven rules

1. **Build beats read.** A topic is not done because you finished the links.
   It is done when the artifact runs and you can explain why it breaks. Reading
   without building is the most common way this plan fails.
2. **Core first, optional later.** Every topic lists **Core** resources and
   *Go deeper* resources. Core is required. *Go deeper* is for when a topic
   grabs you, or for later reference. Nothing in *Go deeper* blocks a gate.
3. **Write it down publicly.** One post per completed topic. In the EU and
   remote markets, a public body of work stands in for the brand-name employer
   you don't have yet.
4. **Your job is your biggest lab.** You already run real clusters and real
   pipelines on bare metal, with real storage failure domains and real capacity
   limits. A build done at work beats the same build in a home lab, because it
   has real users and real consequences. Section 9 covers how to turn it into
   senior-level evidence.
5. **Every platform build needs a user who isn't you.** From Phase 3 on, a
   build only counts once someone else has used it. A platform nobody uses is
   a hobby project, and interviewers can tell.
6. **Go by default.** Every build that involves code is written in Go unless
   the topic says otherwise, and every phase gate requires its level of the
   [Go Mastery Track](#go-mastery-track). Mastery comes from writing Go every
   week for two years, not from a course.
7. **Design before you build.** Every build bigger than one Sunday starts with
   a one-page design doc in the Notion **Design Journal**, and every phase gate requires its
   level of the [System Design Track](#system-design-track). You learn design
   by designing, getting it wrong, and writing down why.

---

## 2. What Platform Engineering Is, and How This Plan Builds It

Platform engineering builds and runs an **internal product**, the platform, that
lets application teams build, ship, and run their software by themselves. The
platform team's customers are other engineers. Success is measured in their
speed, their safety, and how little infrastructure they have to think about,
not in tickets closed. DevOps says "you build it, you run it"; platform
engineering makes that possible without every team becoming infrastructure
experts.

Every platform has the same layers. This plan builds them bottom up:

```
  ┌────────────────────────────────────────────────────────────────┐
  │                APPLICATION TEAMS  (your users)                 │
  └────────────────────────────┬───────────────────────────────────┘
                               │  self-service: git, templates, APIs. No tickets.
  ┌────────────────────────────▼───────────────────────────────────┐
  │ INTERFACES      golden paths · templates · catalog · portal    │  Phase 3
  ├────────────────────────────────────────────────────────────────┤
  │ CAPABILITIES    delivery · observability · security · secrets  │  Phases 2–5
  │                 policy · tenancy · data services · cost        │
  ├────────────────────────────────────────────────────────────────┤
  │ ORCHESTRATION   Kubernetes · GitOps · operators                │  Phases 2, 5
  ├────────────────────────────────────────────────────────────────┤
  │ INFRASTRUCTURE  bare metal · VMs · AWS, all from code          │  Phases 2, 4
  ├────────────────────────────────────────────────────────────────┤
  │ FOUNDATIONS     Linux · networking · Go (every phase)          │  Phases 1+
  └────────────────────────────────────────────────────────────────┘
     reliability (SLOs, on-call, capacity) runs through every layer
```

**Where SRE fits.** Reliability isn't a separate lane here; it runs through
every layer. The platform is itself a production system, with users who route
around it the moment it's flaky, so it needs SLOs, on-call, and postmortems like
any other service. That is why the SRE material stays in the plan, taught as
*operating your platform* (Phase 3) and *reliability depth* (Phase 5). It also
keeps SRE roles open to you.

**Why cloud comes after the platform.** AWS learned before Linux and Kubernetes
is a list of service names to memorize. Learned after them, it is a translation
exercise: VPC is a network you've already built, EKS is a cluster you've already
run, and IAM is RBAC with more knobs. Moving a working platform onto AWS is also
the best test of your Phase 3 abstractions: if app teams don't notice the
substrate changed, the platform works.

**The difference that matters in interviews:** a Platform Engineer is judged on
whether other engineers ship faster and more safely without filing a ticket. An
SRE is judged on whether the system stays up, and on how quickly it's understood
when it doesn't. Senior platform loops test both, and add a third question that
most candidates fumble: *"How do you know your platform is working?"* This plan
makes sure you have numbers for that answer.

---

## 3. The Competency Rubric

Track yourself against this honestly at each quarterly review. Titles are noise;
these behaviours are the real bar.

### Junior DevOps (where you are)
- Uses Docker, CI/CD, and Kubernetes fluently, mostly by following existing patterns.
- Handles developer requests one ticket at a time.
- Resolves alerts and failures that have a known cause; escalates the unfamiliar ones.
- Writes Bash that automates tasks for themselves and the team.
- Debugs at the tool level (`kubectl describe`, pipeline logs) but not yet
  below it (syscalls, packets, kernel, cgroups).

### Mid-level Platform Engineer (target: Phase 3 gate)
- Builds self-service capabilities (a template, a module, an API) that other
  teams use without asking for help.
- Provisions everything from code and can explain its state, drift, and rollback story.
- **Owns** the SLOs of at least one platform component and defends the error budget.
- Leads an incident of moderate blast radius without escalating for direction.
- Writes and reviews production-quality Go: tested, instrumented, released, and idiomatic.
- Writes a design doc before building, and can design a common system out loud
  with numbers, tradeoffs, and failure modes.
- Reduces toil measurably and can state the hours or tickets saved.
- Debugs across layers: app → runtime → kernel → network → hardware.

### Senior Platform Engineer (target: evidence by Phase 5 gate, title on the job)
- Defines the abstractions other engineers build on, and knows what to hide,
  what to expose, and where the escape hatches go.
- Runs the platform as a product: users, adoption metrics, a roadmap, deprecations.
- Measures developer experience (DORA, onboarding time, time to first deploy)
  and moves those numbers.
- Leads migrations across many teams without having authority over them.
- Designs for failure explicitly: blast radius, tenant isolation, degradation
  modes, recovery time.
- Influences other teams' designs *before* those designs reach production.
- Designs any system end to end in 45 minutes, from users and numbers to
  failure modes, operations, cost, and the migration plan, and leads design reviews.
- Is the Go reference on the team: reviews others' Go, can profile and fix a
  slow or leaking service, and has Go merged in upstream projects.
- Mentors, keeps the postmortem culture blameless, and writes things that
  change how the organization operates.

> **Realistic expectation:** by the end of this plan you'll have your current
> DevOps experience plus 2–3 more years of deliberate work, which puts you at 4–5
> years of hands-on infrastructure. That is the normal range for a senior
> Platform or SRE title. The plan gives you the depth; your job has to give you
> the *scope* (internal users, owning a platform component, leading a
> migration), so push for that at work in parallel (§9).

---

## 4. The Weekly Operating System

Without deadlines, cadence is what keeps the plan moving. Target **~15–17 hours**.

| Slot | Duration | Purpose |
|---|---|---|
| **Two weekday evenings** | 1.5 h each | **Theory.** Core resources for the current topic. Notes go in the Notion **Notes** database. |
| **One weekday evening** | 1.5 h | **Deliberate practice.** SadServers scenario, PromQL drills, `kubectl` speed runs, `strace` on something real. Timed. No tutorials. |
| **Go evening** | 1.5 h | **Go Mastery Track.** Required, every week, in every phase: the current level's concepts, reading, and reading real Go source. See [Go Mastery Track](#go-mastery-track). |
| **Design evening** | 1.5 h | **System Design Track.** Required, every week, in every phase. Odd weeks: the current level's reading. Even weeks: one timed design kata, out loud. See [System Design Track](#system-design-track). |
| **Saturday: Back to Basics** | 3 h | **CS fundamentals + LeetCode.** Not tied to the current phase. See [Back to Basics Saturday](#back-to-basics-saturday). |
| **Sunday: Build** | 4 h | **Build.** The topic artifact. Uninterrupted. This is the most valuable slot for the main track, so protect it. |
| **Sunday: Consolidate** | 45 min | Right after the build: flashcard review, turn the week's notes into prose, draft the topic post. |

### How to move through a topic

**Topics you already use at work** (marked with a **Prove it** box) start with a
cold test. Do the **Prove it** task *before* reading anything:
- **Pass it cleanly?** Skip the Core reading, do only the build, and move on.
- **Stumble anywhere?** That's your gap. Read only the Core items that cover it.

Be honest here. Using a tool daily and being able to explain it are different
skills, and interviews for senior roles test the second one.

**Everything else** follows the full loop:

```
Read the Core list  →  Build the artifact  →  Explain it (note / post)
        ↑                                              │
        └──── "Done when" fails ◄── Check "Done when" ─┤
                                                       ↓ passes
                                     Tick it, update "Current focus", next topic
```

### Rules of the cadence
- **Deload every 7th week.** No new material. Review notes, fix the lab, rest.
  On Saturday, only re-solve old LeetCode problems. Burnout in the second year
  is the most likely way a plan this long dies.
- **The Go evening, the design evening, and Saturday are not overflow.** When a
  build runs long, it eats a theory evening, never a standing track. The
  standing tracks only work if they happen every week.
- **Miss a day, not a week.** Missing one slot doesn't matter. If you miss a full
  week twice in a row, shrink the scope; don't try to "catch up". Catch-up
  debt never gets paid.
- **The stall rule.** Each phase lists an *effort budget* in hours. It is a
  sizing guide, not a deadline. If a phase runs past **1.5× its budget**, stop.
  Write what's left into the Notion **Parked** database and move on. You can come back later.
  Perfectionism is how self-paced plans stretch from 2 years to 5.
- **Log your hours.** One row per session in the Notion **Hours** database. That log is how
  you know whether the 3-year cap is still realistic, since there are no dates
  to tell you.
- **Notes are a build artifact.** Keep them in the Notion workspace (Phase 0,
  step 3). It becomes your blog backlog, your interview revision, and proof of
  the work. Export it to Markdown & CSV at every quarterly review as a backup.

---

## 5. Phase Map

| Phase | Theme | Effort budget | Exit artifact |
|---|---|---|---|
| **0** | Gap audit, lab, habits | ~30 h | Scored checklist + lab + hours log running |
| **1** | The spine: Linux & networking *internals*, Go for operations | ~220 h | Below-the-abstraction debugging + a real Go tool |
| **2** | Platform foundations: containers, K8s internals, IaC, GitOps, observability | ~230 h | **CKA** + GitOps-managed lab platform |
| **3** | Building the platform: product thinking, a Go platform CLI, golden paths, tenancy, security, platform SLOs | ~260 h | Golden path used by someone else + platform SLOs |
| **4** | The platform on AWS: EKS, infrastructure as APIs, cost | ~140 h | **AWS SAA-C03** + platform on EKS + cost per tenant |
| **5** | Depth: operators, distributed systems, data services, reliability, Rust | ~290 h | Operator + self-service database + Rust exporter |
| **6** | Market entry | ~70 h prep, then campaign | Offers |
| | **Total (main track)** | **~1,240 h** | |
| **∞** | **Go Mastery Track** (required in every phase) | ~1.5 h/week + every build | Levels G1 → G7, one per phase |
| **∞** | **System Design Track** (required in every phase) | ~1.5 h/week + a design doc per build | Levels SD1 → SD6 + a 40-design journal |
| **∞** | **Back to Basics Saturday** (runs alongside every phase) | ~3 h/week | CS fundamentals + NeetCode 150 |

Phases 0–2 are shorter than they'd be for a beginner because you already use
Linux, Docker, CI/CD, and Kubernetes. The hours go into what you *don't* get from
daily use: internals, Terraform, and monitoring. **Phase 3 is the largest new
block**, because building a platform as a product is the part of the job that
DevOps work rarely teaches. Phase 6 is shorter than usual because Back to Basics
Saturday has already done most of the coding prep.

Progress:

- [ ] Phase 0: Gap Audit & Instrumentation
- [ ] Phase 1: The Spine
- [ ] Phase 2: Platform Foundations
- [ ] Phase 3: Building the Platform
- [ ] Phase 4: The Platform on AWS
- [ ] Phase 5: Depth & Convergence (incl. Rust)
- [ ] Phase 6: Market Entry

> **Pace check (the only numbers that matter):** hours logged ÷ hours budgeted
> for the phases you've completed. If you've used much more than the budget, the
> stall rule is not being applied. If you're under 8 h/week for a whole quarter,
> something structural changed and the plan needs to be re-scoped, not pushed through.

---

## The Platform Engineering Checklist

Everything this plan must leave you with, grouped by domain. The phases teach
it; this list is how you check it. Each domain has three kinds of items:

- **Concepts**: ideas you can explain to another engineer on a whiteboard, without notes.
- **Tools**: things you can operate. Each one is marked with the depth you need:
  - *Deep*: you run it in production, debug it, and can explain how it works inside.
  - *Working*: you've built something real with it and can make sensible design choices.
  - *Aware*: you know what it does, when you'd pick it, and what the alternatives are.
    An afternoon of reading and a toy install is enough.
- **Prove you know it**: practical tests, done cold on the lab or at work.

How to use it:

1. **In Phase 0**, score every item Explain / Use / Gap in the Notion **Gap Audit** database.
   Don't tick anything yet.
2. **Tick an item only when you could defend it in an interview.** Having read
   about it doesn't count.
3. **Every phase gate names the domains it checks.** A gate passes when those
   items are ticked, or consciously moved to **Parked** in Notion. Items marked
   *(Phase N)* belong to a later gate.
4. **Tools change; concepts don't.** If a tool here is replaced by something
   better, swap the tool. Leave the concepts alone.

| Domain | Learned in |
|---|---|
| A. Linux & the operating system | Phase 1 |
| B. Networking | Phase 1 |
| C. Programming & automation (Go in depth: [Go Mastery Track](#go-mastery-track)) | Every phase |
| D. Containers | Phase 2 |
| E. Kubernetes: using & operating | Phase 2 |
| F. Extending Kubernetes | Phase 5 |
| G. Infrastructure as Code & configuration | Phases 2, 4 |
| H. CI/CD, delivery & GitOps | Phase 2 |
| I. Observability | Phases 2–3 |
| J. Security, identity & supply chain | Phase 3 |
| K. Platform as a product | Phase 3 |
| L. Reliability | Phases 3, 5 |
| M. Data, storage & stateful services | Phase 5 |
| N. Cloud & FinOps | Phase 4 |
| O. System design & distributed systems (in depth: [System Design Track](#system-design-track)) | Every phase |
| P. Ways of working | Every phase |

### A. Linux & the operating system

Every platform is an abstraction over Linux processes, memory, filesystems, and
packets. When the abstraction leaks, this is what you debug.

**Concepts**
- [ ] Processes and threads: `fork`/`exec`, process states, zombies and orphans, and why PID 1 has special duties
- [ ] Signals and exit codes: `SIGTERM` vs `SIGKILL`, graceful shutdown, and what exit codes 137 and 143 mean
- [ ] File descriptors, pipes, redirection, and sockets as files
- [ ] Virtual memory: RSS vs VSZ, page cache, swap, overcommit, and how the OOM killer picks its victim
- [ ] Filesystems: inodes, the VFS, ext4 vs XFS, journaling, mount options, and "disk full" vs "inodes full"
- [ ] Namespaces (pid, net, mnt, uts, ipc, user, cgroup) and what each one isolates
- [ ] cgroups v2: the cpu, memory, and io controllers, and how CPU throttling happens
- [ ] Kernel space vs user space, syscalls, and the cost of a context switch
- [ ] Security primitives: users and groups, permissions, capabilities, seccomp, and SELinux/AppArmor at a high level
- [ ] The boot process: firmware → bootloader → kernel → initramfs → systemd
- [ ] systemd: units, targets, dependencies, restart policies, slices for resource control, journald
- [ ] Load average, CPU steal, and iowait, and why "high load" doesn't always mean "CPU busy"
- [ ] The USE method (utilization, saturation, errors), applied to every resource

**Tools**
- [ ] **Bash & coreutils** · *Deep*: scripts that fail safely (`set -euo pipefail`, quoting, `trap`), and knowing when a script should become Go
- [ ] **ps, top/htop, /proc, /sys** · *Deep*: read a process's state, memory maps, open files, and limits straight from `/proc`
- [ ] **strace** · *Deep*: attach to a running process, filter by syscall, follow forks, and find the slow call
- [ ] **lsof** · *Deep*: find who holds a file, a deleted-but-open file, or a port
- [ ] **systemctl & journalctl** · *Deep*: write a unit file, debug a failing service, filter logs by unit and time
- [ ] **dmesg** · *Deep*: read OOM kills, disk errors, and NIC resets
- [ ] **vmstat, iostat, pidstat, sar** · *Working*: the 60-second performance checklist
- [ ] **perf** · *Working*: CPU-profile a process and read a flame graph
- [ ] **unshare & nsenter** · *Working*: create and enter namespaces by hand
- [ ] **bpftrace & BCC tools** · *Aware*: what eBPF can see that `strace` can't, and what it costs

**Prove you know it**
- [ ] Explain power-on to login prompt without hand-waving
- [ ] Walk an `oom-kill` line in `dmesg` back to the cgroup limit that caused it
- [ ] Break the initramfs on a lab VM and recover it
- [ ] Run the 60-second performance checklist from memory on a loaded VM and name the bottleneck

### B. Networking

Most "the platform is broken" tickets are networking tickets in disguise.

**Concepts**
- [ ] The TCP/IP layers, and which tool sees which layer
- [ ] IP addressing, CIDR and subnetting, routing tables, ARP, and default gateways
- [ ] TCP: the handshake, connection states, retransmits, windows, `TIME_WAIT`, and what "refused" vs "timed out" mean
- [ ] UDP, and why DNS and QUIC use it
- [ ] DNS: the resolution chain, caching and TTLs, `/etc/resolv.conf`, `search` and `ndots`
- [ ] HTTP/1.1 vs HTTP/2 vs HTTP/3, keep-alive and connection reuse
- [ ] TLS: the handshake, certificate chains, SNI, expiry, and mutual TLS
- [ ] NAT (SNAT and DNAT), conntrack, and what happens when the conntrack table fills up
- [ ] iptables/nftables: tables, chains, and how a packet traverses them
- [ ] Virtual networking: veth pairs, bridges, VLANs, VXLAN overlays, tun/tap
- [ ] Load balancing: L4 vs L7, algorithms, health checks, connection draining
- [ ] Forward and reverse proxies
- [ ] BGP basics: how on-prem Kubernetes announces Service IPs (MetalLB, Calico, Cilium)
- [ ] MTU, fragmentation, and why overlay networks shrink the usable MTU

**Tools**
- [ ] **tcpdump** · *Deep*: capture with a filter, read a handshake, find a retransmit
- [ ] **ss & ip** · *Deep*: list sockets by state; inspect routes, addresses, and links
- [ ] **dig** · *Deep*: trace a resolution, query a specific server, read TTLs
- [ ] **curl** · *Deep*: `-v`, `--resolve`, and a timing breakdown with `-w`
- [ ] **openssl s_client** · *Working*: inspect a certificate chain and its expiry
- [ ] **iptables / nft** · *Working*: read the rules kube-proxy writes
- [ ] **mtr, traceroute, nc** · *Working*: find where packets stop
- [ ] **Wireshark** · *Working*: follow a TCP stream in a capture taken with `tcpdump`
- [ ] **HAProxy or NGINX** · *Working*: a reverse proxy with health checks
- [ ] **Envoy** · *Aware*: why most service meshes and gateways are built on it

**Prove you know it**
- [ ] Trace a request from your laptop to a process on a lab VM, naming every hop, lookup, and translation
- [ ] Find why connections pile up in `TIME_WAIT` or `CLOSE_WAIT`, and say which side is at fault
- [ ] Debug an expired or mismatched certificate from the client side alone

### C. Programming & automation

Platform engineers write software: CLIs, small APIs, and controllers. Scripts
are where you start, not where you stop. Go is checked in detail level by level
in the [Go Mastery Track](#go-mastery-track); this domain covers the rest.

**Concepts**
- [ ] Git beyond commit and push: the object model, rebase vs merge, `bisect`, `reflog`, and recovering from mistakes
- [ ] Python, at reading level: enough to understand, fix, and eventually replace your team's existing scripts
- [ ] Testing: unit vs integration tests, table-driven tests, fakes vs mocks, testing code that calls APIs
- [ ] CLI design people like: flags, help text, exit codes, machine-readable output (`--json`)
- [ ] HTTP APIs: REST conventions, status codes, idempotency, pagination, retries with backoff, versioning
- [ ] Concurrency hazards: races and deadlocks, and how locks and channels prevent them
- [ ] Data formats: JSON, YAML and its traps, JSON Schema
- [ ] Semantic versioning, changelogs, and releasing a tool other people depend on
- [ ] Reading a large codebase: finding your way around Kubernetes or Terraform source

**Tools**
- [ ] **Git** · *Deep*: clean history, bisect a regression, undo anything
- [ ] **Go** · *Deep*: every level of the [Go Mastery Track](#go-mastery-track), G1 → G7
- [ ] **Python** · *Aware*: read and fix a script, run it in a virtual environment
- [ ] **Make** · *Working*: one entry point for build, test, and lint
- [ ] **jq & yq** · *Working*: slice JSON and YAML on the command line
- [ ] **Linters & pre-commit** (ruff, golangci-lint, shellcheck) · *Working*
- [ ] **Rust** · *Working* *(Phase 5)*
- [ ] **TypeScript** · *Aware*: enough to read and tweak a Backstage plugin

**Prove you know it**
- [ ] A CLI tool with tests, a README, and a tagged release that someone else uses
- [ ] A Go HTTP service with tests, graceful shutdown, and Prometheus metrics *(Phase 2)*
- [ ] Answer a "how does Kubernetes actually do X?" question by reading its source *(Phase 3)*

### D. Containers

A container is a Linux process with a few kernel features switched on. Learn it
at that level and every runtime problem becomes a Linux problem.

**Concepts**
- [ ] A container is a process: namespaces + cgroups + a root filesystem
- [ ] Union filesystems (overlayfs), image layers, and why layer order matters for cache and size
- [ ] The OCI image spec: manifests, indexes, multi-arch images, digests vs tags
- [ ] The runtime stack: Docker → containerd → runc, and the CRI between the kubelet and containerd
- [ ] Image hygiene: multi-stage builds, minimal and distroless bases, non-root users, no secrets in layers
- [ ] PID 1 in a container: signal forwarding and zombie reaping (`tini`, `--init`)
- [ ] Rootless containers and user namespaces
- [ ] Registries: auth, pull-through caches and mirrors, garbage collection, and air-gapped setups for on-prem

**Tools**
- [ ] **Docker & BuildKit** · *Deep*: cache mounts, multi-stage, and multi-arch builds with `buildx`
- [ ] **containerd & crictl** · *Deep*: inspect and debug containers on a Kubernetes node without Docker
- [ ] **Harbor** (or another self-hosted registry) · *Working*: projects, robot accounts, replication, scanning
- [ ] **skopeo & crane** · *Working*: copy and inspect images without pulling them
- [ ] **dive** · *Working*: find what makes an image big
- [ ] **Podman & Buildah** · *Aware*: daemonless and rootless alternatives
- [ ] **ko, Cloud Native Buildpacks, kaniko** · *Aware*: building images without a Dockerfile or without a daemon

**Prove you know it**
- [ ] Build a container by hand with `unshare`, cgroups, and `pivot_root`
- [ ] Cut a real image at work by at least half without changing the app
- [ ] Debug a container that ignores `SIGTERM` and takes 30 seconds to stop

### E. Kubernetes: using & operating

The substrate almost every platform runs on today. You don't just deploy to it;
you run it for other people.

**Concepts**
- [ ] Control plane components and what each one owns: API server, etcd, scheduler, controller manager, kubelet, kube-proxy
- [ ] The declarative model: desired state, controllers, and reconciliation
- [ ] Workloads: Pods, Deployments, StatefulSets, DaemonSets, Jobs and CronJobs, and when to use each
- [ ] Services and EndpointSlices, kube-proxy modes (iptables, IPVS, eBPF), and how a `ClusterIP` routes
- [ ] Ingress vs the Gateway API
- [ ] CNI and pod networking, NetworkPolicy, and default-deny
- [ ] Cluster DNS: CoreDNS and the life of a lookup
- [ ] Storage: volumes, PV/PVC, StorageClasses, CSI, and access modes
- [ ] ConfigMaps and Secrets, and why base64 is not encryption
- [ ] Scheduling: requests and limits, QoS classes, affinity, taints and tolerations, topology spread, priority and preemption
- [ ] Health and lifecycle: liveness, readiness, and startup probes; `preStop` hooks; graceful termination
- [ ] Safe change: rolling update parameters, PodDisruptionBudgets, and node drains
- [ ] Autoscaling: HPA, VPA, and node autoscaling (Cluster Autoscaler, Karpenter)
- [ ] Access control: RBAC, ServiceAccounts, admission control, Pod Security Standards
- [ ] Sharing a cluster: ResourceQuotas, LimitRanges, and overcommit
- [ ] Cluster lifecycle: kubeadm, certificate rotation, version skew, upgrades, and etcd backup and restore

**Tools**
- [ ] **kubectl** · *Deep*: `explain`, JSONPath and custom columns, `debug`, `auth can-i`, `events`, fast enough for the CKA
- [ ] **kubeadm** · *Deep*: install, upgrade, and recover a cluster
- [ ] **Helm** · *Deep*: write a chart, design its values, upgrade and roll back, and know when not to template
- [ ] **Kustomize** · *Deep*: bases and overlays per environment
- [ ] **k9s** · *Working*
- [ ] **kind or k3d** · *Working*: throwaway clusters for testing
- [ ] **Cilium or Calico** · *Working*: install it, predict NetworkPolicy behaviour, debug pod-to-pod traffic
- [ ] **ingress-nginx or Envoy Gateway** · *Working*
- [ ] **MetalLB** · *Working*: LoadBalancer Services on bare metal, in L2 and BGP modes
- [ ] **cert-manager & external-dns** · *Working*
- [ ] **metrics-server** · *Working*: what feeds `kubectl top` and the HPA
- [ ] **Velero** · *Working*: back up and restore namespaces and volumes
- [ ] **Istio or Linkerd** · *Aware*: what a service mesh gives you, what it costs, and when it's worth it
- [ ] **Cluster API, Talos, Rancher** · *Aware*: managing many clusters declaratively

**Prove you know it**
- [ ] Explain `kubectl apply` end to end: API server → etcd → controller → scheduler → kubelet → CRI → cgroups
- [ ] Restore a lab cluster from an etcd snapshot
- [ ] Upgrade a lab cluster by one minor version with zero downtime for a running app
- [ ] Find why a pod is `Pending`, `CrashLoopBackOff`, or `OOMKilled`, in under five minutes each

### F. Extending Kubernetes

Senior platform engineers don't only install controllers; they write them. This
is how you turn "run these five steps" into one resource a developer applies.

**Concepts**
- [ ] Custom Resource Definitions: schemas, validation, versions, and conversion
- [ ] Controllers: level-triggered reconciliation, informers and caches, work queues, resync
- [ ] Ownership and cleanup: owner references, garbage collection, finalizers
- [ ] Status and conditions: how a controller reports what it is doing
- [ ] The operator pattern, and when a Helm chart is enough instead
- [ ] Admission webhooks: validating vs mutating, and their failure modes (a down webhook can block a whole cluster)
- [ ] Leader election and running controllers with high availability
- [ ] API aggregation, at awareness level

**Tools**
- [ ] **kubebuilder & controller-runtime** · *Deep*
- [ ] **envtest** · *Working*: testing controllers against a real API server
- [ ] **kube-rs** · *Aware* (*Working* if you do the Rust Go-deeper in 5e)
- [ ] **Metacontroller, CUE, KCL** · *Aware*: lighter ways to build abstractions without a full operator

**Prove you know it**
- [ ] An operator running in your cluster, with tests and a README that explains its reconcile design
- [ ] Explain what happens to your operator's resources when the controller is down for an hour
- [ ] Explain why a finalizer can leave a namespace stuck in `Terminating`, and how to fix it safely

### G. Infrastructure as Code & configuration

If it was clicked, it doesn't exist. Every layer under the platform comes from code.

**Concepts**
- [ ] Declarative vs imperative, and idempotency
- [ ] Configuration management of mutable servers vs immutable infrastructure
- [ ] Terraform state: what's in it, remote backends, locking, and what goes wrong when two people apply
- [ ] Plan and apply, drift, `import`, and moving resources without destroying them
- [ ] Modules: inputs, outputs, composition, versioning, and how small a module should be
- [ ] Environments: workspaces vs directories, and promoting a change between them
- [ ] Keeping secrets out of IaC code and out of state
- [ ] Testing infrastructure code: validate, lint, policy checks, and real test applies
- [ ] PR-driven infrastructure: plan on pull request, apply on merge
- [ ] Bare-metal provisioning: PXE, cloud-init, golden images
- [ ] Infrastructure as APIs: exposing infrastructure as Kubernetes-style resources instead of Terraform files *(Phase 4)*

**Tools**
- [ ] **Terraform / OpenTofu** · *Deep*
- [ ] **Ansible** · *Deep*: roles, inventories, idempotent playbooks, encrypted variables
- [ ] **cloud-init** · *Working*
- [ ] **Packer** · *Working*: VM images from code
- [ ] **tflint, Checkov or Trivy config scanning** · *Working*: catch mistakes and policy violations before apply
- [ ] **Atlantis** (or the same flow in your CI) · *Working*: PR-driven Terraform
- [ ] **Crossplane** · *Working* *(Phase 4)*
- [ ] **Terragrunt, Pulumi** · *Aware*
- [ ] **MAAS, Tinkerbell, Metal3** · *Aware*: bare-metal provisioning as a service

**Prove you know it**
- [ ] Rebuild the whole lab from empty with one command
- [ ] Refactor a Terraform module (rename, split) with zero resources destroyed
- [ ] Find and fix a drift between Terraform state and reality

### H. CI/CD, delivery & GitOps

The paved road from a commit to production is the first thing most platforms
offer, and the thing developers judge you by.

**Concepts**
- [ ] Continuous integration: trunk-based development, small batches, fast feedback
- [ ] Build once, deploy many: immutable artifacts promoted between environments
- [ ] Pipeline design: stages, caching, parallelism, reusable templates, pipelines as code
- [ ] CI runners: ephemeral vs long-lived, autoscaling, isolation between jobs
- [ ] Deployment strategies: rolling, blue/green, canary, feature flags, and their tradeoffs
- [ ] Progressive delivery: automated canary analysis against SLIs *(Phase 5)*
- [ ] GitOps: pull vs push, reconciliation and drift, app-of-apps, ApplicationSets, repo and environment layout
- [ ] Credentials in pipelines: OIDC federation instead of long-lived keys
- [ ] Roll back vs roll forward, and the database changes that make rollback impossible
- [ ] Dependency updates as a continuous, automated process
- [ ] The DORA metrics: deployment frequency, lead time, change failure rate, time to restore

**Tools**
- [ ] **Your CI system** (GitLab CI, GitHub Actions, or Jenkins) · *Deep*: reusable templates other teams include
- [ ] **Argo CD** · *Deep*: projects, sync waves, health checks, ApplicationSets, RBAC, SSO
- [ ] **Flux** · *Aware*: how it differs from Argo CD
- [ ] **Argo Rollouts or Flagger** · *Working*
- [ ] **Renovate or Dependabot** · *Working*
- [ ] **Tekton, Dagger** · *Aware*
- [ ] **OpenFeature** · *Aware*: feature flags as a platform capability

**Prove you know it**
- [ ] A commit reaches the cluster with no manual step, and a deleted cluster comes back from git
- [ ] Measure the four DORA metrics for one service at work
- [ ] A canary that rolls itself back when its error rate rises *(Phase 5)*

### I. Observability

A platform that can't show teams what their service is doing isn't finished.
Telemetry comes before SLOs, and before any claim that something "works".

**Concepts**
- [ ] Metrics, logs, traces, and profiles, and the question each one answers
- [ ] Metric types: counter, gauge, histogram, summary
- [ ] Labels and cardinality, and why one bad label can take down Prometheus
- [ ] Pull vs push collection, service discovery, relabeling
- [ ] PromQL: `rate` vs `irate`, aggregation, `histogram_quantile`, recording rules
- [ ] RED, USE, and the four golden signals
- [ ] Alert design: page on symptoms, not causes; every alert actionable; routing, grouping, inhibition, silences
- [ ] Dashboards that answer a question, instead of walls of graphs
- [ ] Log pipelines: collection, parsing, structured logs, retention, and cost
- [ ] Distributed tracing: spans, context propagation, sampling *(Phase 3)*
- [ ] OpenTelemetry: the SDKs, the Collector, and OTLP *(Phase 3)*
- [ ] Scaling Prometheus: federation, remote write, long-term storage, HA pairs
- [ ] Observability as a platform service: every new service gets metrics, dashboards, and alerts by default, per tenant *(Phase 3)*

**Tools**
- [ ] **Prometheus** · *Deep*
- [ ] **Grafana** · *Deep*: dashboards as code, provisioning
- [ ] **Alertmanager** · *Deep*
- [ ] **kube-prometheus-stack** · *Deep*: ServiceMonitors, PrometheusRules
- [ ] **node_exporter & blackbox_exporter** · *Working*
- [ ] **Loki** (or the ELK stack) · *Working*
- [ ] **OpenTelemetry Collector** · *Working* *(Phase 3)*
- [ ] **Tempo or Jaeger** · *Working* *(Phase 3)*
- [ ] **Thanos, Mimir, or VictoriaMetrics** · *Aware*
- [ ] **Pyroscope** · *Aware*: continuous profiling
- [ ] **Datadog, Grafana Cloud** · *Aware*: what the SaaS options cost and give you

**Prove you know it**
- [ ] Find the label that is blowing up a Prometheus server's memory
- [ ] Follow one slow request from a dashboard to its trace to its logs *(Phase 3)*
- [ ] An alert that fired for real, with a runbook a teammate followed

### J. Security, identity & supply chain

A shared platform concentrates risk. Security belongs in the golden path as a
default, not in a review at the end.

**Concepts**
- [ ] Least privilege, and authentication vs authorization
- [ ] OIDC and OAuth 2 basics, and SSO for platform tools (Argo CD, Grafana, Backstage)
- [ ] Workload identity: ServiceAccount tokens, IRSA / EKS Pod Identity, and SPIFFE at awareness level
- [ ] Secrets management: never plain text in git, rotation, short-lived and dynamic secrets
- [ ] PKI: certificate authorities, the cluster's internal certificates, automated renewal
- [ ] Encryption in transit and at rest, including encrypting Secrets in etcd
- [ ] Pod hardening: `securityContext`, non-root, read-only root filesystem, dropped capabilities
- [ ] Network segmentation: default-deny with explicit allows
- [ ] Supply chain: SBOMs, image signing and verification, provenance, the SLSA levels
- [ ] Vulnerability triage: what to fix now, what to accept, and how not to drown in CVEs
- [ ] Policy as code: admission policies as guardrails with error messages that say how to fix the problem
- [ ] Audit logging: who did what to the cluster, and where that log goes
- [ ] Threat modeling basics (STRIDE) for a platform

**Tools**
- [ ] **Vault or OpenBao** · *Working*
- [ ] **External Secrets Operator** · *Working*
- [ ] **SOPS or Sealed Secrets** · *Working*: encrypted secrets in git for GitOps
- [ ] **Kyverno or OPA Gatekeeper** · *Working*
- [ ] **Trivy** · *Working*: scanning images, IaC, and clusters
- [ ] **Cosign & Syft** · *Working*: sign images and generate SBOMs
- [ ] **Keycloak or Dex** · *Working*: an SSO provider for the lab
- [ ] **Falco** · *Aware*: runtime threat detection
- [ ] **kube-bench** · *Aware*: CIS benchmark checks
- [ ] **SPIRE** · *Aware*

**Prove you know it**
- [ ] An unsigned or tampered image is refused at admission
- [ ] Rotate a database password used by a running app with no downtime
- [ ] Show that tenant A can't read tenant B's secrets, and name each layer that stops it

### K. Platform as a product

**The domain that makes you a Platform Engineer** rather than a DevOps engineer
with more tools. Most candidates can list the tools above; few can talk about
users, abstractions, and adoption with evidence.

**Concepts**
- [ ] What an internal developer platform is, and what it isn't (a portal, a ticket queue with a UI, or "we run Kubernetes")
- [ ] The platform as a product: users, user research, a roadmap, adoption, and teams' freedom not to use it
- [ ] Team Topologies: stream-aligned, platform, enabling, and complicated-subsystem teams
- [ ] The three interaction modes: collaboration, X-as-a-Service, facilitating
- [ ] Cognitive load, as the thing a platform exists to reduce
- [ ] Golden paths (paved roads) vs guardrails vs gates
- [ ] The thinnest viable platform: start with a template and a wiki page, not a portal
- [ ] Abstraction design: what to hide, what to expose, and where the escape hatches go
- [ ] Self-service through git and APIs instead of tickets
- [ ] Service catalog and ownership metadata
- [ ] Scorecards and production-readiness reviews
- [ ] Developer experience metrics: DORA, SPACE, DevEx, time to first deploy, onboarding time
- [ ] The CNCF Platform Engineering Maturity Model
- [ ] Documentation as part of the product (Diátaxis)
- [ ] Versioning, deprecation, and moving many teams off an old way of working
- [ ] Build vs buy vs adopt open source, and total cost of ownership
- [ ] Internal marketing: demos, changelogs, office hours, platform champions

**Tools**
- [ ] **Backstage** · *Working*: software catalog, software templates, TechDocs
- [ ] **Copier or cookiecutter** · *Working*: templates that can push updates to projects created from them
- [ ] **Score** · *Aware*: a platform-agnostic workload spec
- [ ] **Port, Cortex, OpsLevel** · *Aware*: commercial portals and scorecards
- [ ] **Kratix, Humanitec** · *Aware*: platform orchestrators

**Prove you know it**
- [ ] Interview three developers and turn what they said into a prioritized platform backlog
- [ ] A one-page platform README written for its users, not its builders
- [ ] Measure time to first deploy before and after your golden path
- [ ] Deprecate something in your lab platform with a migration guide, and move one user off it

### L. Reliability

The platform is a production system too. Teams adopt a platform they trust and
route around one they don't.

**Concepts**
- [ ] SLIs, SLOs, and error budgets, and how to choose a target
- [ ] Multi-window, multi-burn-rate alerting
- [ ] SLOs for the platform itself: deploy success rate, pipeline duration, API server and registry availability
- [ ] Percentiles vs averages, and coordinated omission
- [ ] Incident roles (incident commander, communications, operations), severity levels, status updates
- [ ] Blameless postmortems, and making sure the action items land
- [ ] Runbooks, and on-call health (pages per shift, sleep, handover)
- [ ] Toil: defining it, measuring it, budgeting time to remove it
- [ ] Failure handling: timeouts, retries with backoff and jitter, circuit breakers, load shedding
- [ ] Capacity planning: headroom, load testing, forecasting from real data *(Phase 5)*
- [ ] Chaos engineering: a steady-state hypothesis, a blast radius, abort conditions *(Phase 5)*
- [ ] Disaster recovery: RPO and RTO, restore-tested backups, failover across zones and clusters *(Phase 5)*
- [ ] SRE engagement models, and how an SRE function works inside a company

**Tools**
- [ ] **Sloth or Pyrra** · *Working*: SLO specs that generate burn-rate alerts
- [ ] **k6** · *Working*: load tests as code *(Phase 5)*
- [ ] **Chaos Mesh or LitmusChaos** · *Working* *(Phase 5)*
- [ ] **An on-call tool** (PagerDuty, Opsgenie, Grafana OnCall) · *Working*
- [ ] **incident.io, Rootly** · *Aware*

**Prove you know it**
- [ ] A burn-rate alert that fired for real, and an SLO target you've defended to a skeptic
- [ ] Three postmortems from game days, with their action items done
- [ ] A timed restore from backup, measured against a stated RTO *(Phase 5)*

### M. Data, storage & stateful services

Stateful services are where platforms get hard, and where most candidates are
weakest. Your on-prem object storage work is a head start here.

**Concepts**
- [ ] Block vs file vs object storage, and what each one is good for
- [ ] Object storage internals: the S3 API, consistency, erasure coding vs replication, failure domains
- [ ] RAID levels, and what they do and don't protect against
- [ ] Database internals: B+ tree indexes, the write-ahead log, transactions and isolation levels
- [ ] Replication: synchronous vs asynchronous, replication lag, failover, split brain
- [ ] Connection pooling, and why databases fall over from too many connections
- [ ] Backups: full, incremental, point-in-time recovery, restore drills
- [ ] Stateful workloads on Kubernetes: StatefulSets, CSI, local vs network storage, database operators
- [ ] Schema migrations without downtime (expand and contract)
- [ ] Caches (Redis) and queues and streams (Kafka), at the level of "how do they fail?"
- [ ] Databases as a platform service: self-service provisioning, with backups and upgrades owned by the platform

**Tools**
- [ ] **PostgreSQL** · *Working*: replication, `pg_basebackup`, PgBouncer, `EXPLAIN`
- [ ] **CloudNativePG** · *Working*
- [ ] **Your S3-compatible store** (MinIO, Ceph RGW, or the one at work) · *Deep*: this is your specialty
- [ ] **Redis** · *Working*
- [ ] **Rook-Ceph, Longhorn** · *Aware*: storage for bare-metal Kubernetes
- [ ] **Kafka (Strimzi)** · *Aware*

**Prove you know it**
- [ ] Kill a PostgreSQL primary, promote the replica, and state the RPO and RTO you measured
- [ ] A tenant requests a database through the platform and gets one, with backups, without your help
- [ ] Explain where your object store keeps each copy of an object, and what happens when a disk, a node, and a rack fail

### N. Cloud & FinOps

The same platform on a substrate someone else runs, with a bill attached.

**Concepts**
- [ ] The shared responsibility model, regions, and availability zones
- [ ] VPC design: CIDR planning, public and private subnets, route tables, NAT gateways, VPC endpoints, peering and Transit Gateway
- [ ] IAM: identity vs resource policies, roles and trust policies, assume-role, permission boundaries, SCPs
- [ ] Multi-account structure: AWS Organizations and landing zones
- [ ] Compute: EC2 instance families, Auto Scaling groups, spot instances
- [ ] EKS: managed node groups vs Karpenter, add-ons, Pod Identity / IRSA, upgrades
- [ ] Storage and data: S3 storage classes, EBS, EFS, RDS
- [ ] Load balancing and DNS: ALB vs NLB, Route 53
- [ ] Hybrid connectivity: VPN and Direct Connect between your datacenter and AWS
- [ ] Where cloud money goes (compute, NAT, egress, storage), rightsizing, savings plans
- [ ] FinOps: tagging, cost allocation, showback vs chargeback, unit economics
- [ ] On-prem vs cloud tradeoffs you can argue from experience

**Tools**
- [ ] **AWS CLI** · *Working*
- [ ] **Terraform AWS provider** · *Deep*
- [ ] **EKS** · *Working*
- [ ] **Karpenter** · *Working*
- [ ] **OpenCost or Kubecost** · *Working*
- [ ] **AWS Cost Explorer & Budgets** · *Working*
- [ ] **Azure and GCP equivalents** · *Aware*: map each AWS service you use to its counterpart

**Prove you know it**
- [ ] Your platform runs on EKS from the same GitOps repo, and app teams didn't have to change anything
- [ ] A monthly cost per tenant you can explain line by line
- [ ] Explain why a pod on EKS can or can't reach an S3 bucket, layer by layer: network, IAM, bucket policy

### O. System design & distributed systems

What the system design round tests, and what you need to design a platform for
hundreds of engineers instead of a lab for one. The
[System Design Track](#system-design-track) teaches it level by level.

**Concepts**
- [ ] Back-of-the-envelope estimation: requests per second, storage, bandwidth, and the latency numbers behind them
- [ ] The core building blocks and when to use each: load balancers, caches, CDNs, SQL and NoSQL databases, queues, logs, object storage
- [ ] Control plane vs data plane, and designing for the control plane being down
- [ ] Blast radius by design: failure domains, cells, shuffle sharding
- [ ] Timeouts, retries with backoff and jitter, and retry storms
- [ ] Disaster recovery: RPO, RTO, and the four DR strategies
- [ ] CAP and PACELC, and consistency models (strong, eventual, read-your-writes)
- [ ] Consensus and quorum: Raft, and why etcd wants an odd number of members
- [ ] Replication, partitioning (sharding), and rebalancing
- [ ] Idempotency, and why "exactly once" is usually "at least once plus deduplication"
- [ ] Queues, backpressure, and what happens when consumers fall behind
- [ ] Caching patterns and invalidation
- [ ] Rate limiting: token bucket, leaky bucket, sliding window
- [ ] Service discovery and load balancing between services
- [ ] Multi-tenancy isolation models: namespace, virtual cluster, cluster per tenant
- [ ] Multi-cluster patterns: fleets, cluster per environment vs per team, global traffic routing
- [ ] Monoliths vs services, and what microservices cost the platform team
- [ ] API compatibility: versioning and evolving schemas without breaking clients

**Tools**
- [ ] **vcluster** · *Aware*
- [ ] **Cluster API or Karmada fleets** · *Aware*
- [ ] **NATS** · *Aware*: lightweight messaging

**Prove you know it**
- [ ] A 45-minute design out loud: an internal developer platform for 300 engineers
- [ ] A 45-minute design out loud: a multi-tenant metrics or logging pipeline
- [ ] A 45-minute design out loud: a CI system that runs 10,000 jobs a day
- [ ] A Notion **Design Journal** with 40+ katas and design docs
- [ ] A design doc at work that was reviewed, and the review changed the design

### P. Ways of working

At senior level the job is mostly writing, persuading, and migrating. Practise
these at work in every phase.

**Skills**
- [ ] Writing a design doc or RFC: problem, options, decision, tradeoffs
- [ ] Architecture Decision Records (ADRs) for the platform's big choices
- [ ] Writing for engineers: READMEs, runbooks, onboarding guides, changelogs
- [ ] Scoping and estimating work, and saying no with a reason
- [ ] Influencing without authority: getting other teams to adopt something
- [ ] Running a migration across many teams: tracking, help, deadlines, and the long tail
- [ ] Prioritizing: impact vs effort, and saying which users you're not serving yet
- [ ] Code review that teaches, and mentoring someone more junior
- [ ] Demos and short talks that show the platform to its users
- [ ] Incident communication: clear, calm status updates for non-engineers
- [ ] Working async in English: written updates people can act on without a meeting

**Prove you know it**
- [ ] An RFC at work that was discussed and adopted
- [ ] A migration you led where other teams did the work
- [ ] Someone you onboarded or mentored who now does the thing without you

---

## Back to Basics Saturday
**Every Saturday, alongside every phase, and after you're hired too · ~3 h/week**

Tools change every few years. Computer science doesn't. This standing track
relearns CS from the start while the main track teaches you the stack. It does
three things for you:

- **Keeps you relevant.** When today's tools are replaced, the people who
  understand memory, concurrency, and data structures adapt in weeks. People who
  only know the tools start over.
- **Fills the self-taught gaps.** Most DevOps engineers never studied algorithms,
  operating systems, or databases formally. Senior engineers are expected to
  reason about all three.
- **Keeps you interview-ready.** Coding becomes a weekly habit instead of a
  panic before interviews. You can take an opportunity whenever it shows up.

### The shape of a Saturday

| Block | Duration | What |
|---|---|---|
| **CS fundamentals** | 1.5 h | The next chunk of the current module below. Notes go in **Notes** (Track = CS). |
| **LeetCode** | 1.5 h | 2–3 problems from the NeetCode list. |
| *Last Saturday of the month* | | Swap the CS block for **Stay current** (below). |

This track has **no gates and no effort budget**, and it doesn't wait for the
main track. Modules are in order, and each has a "done when" check. Some pair
naturally with a phase (noted below); if the timing lines up, great, but don't
hold one track for the other.

The map for this whole track: [Teach Yourself Computer Science](https://teachyourselfcs.com).
Follow it loosely; the modules below are the core of it, trimmed to fit 1.5 h a week.

### CS fundamentals, from the start

**B1. How a computer works**
- [ ] [CS50x](https://cs50.harvard.edu/x/): weeks 0–5 only (C, memory, pointers, data structures). The C is the point: it's where you see memory for real.
- [ ] [Code: The Hidden Language of Computer Hardware and Software](https://www.charlespetzold.com/code/) by Charles Petzold (book, easy weekend reading)
- [ ] *Go deeper:* [Nand2Tetris](https://www.nand2tetris.org): build a computer from logic gates up

**Done when:** you can explain what a pointer is in terms of memory addresses,
why a buffer overflow happens, and what the CPU cache is for.

**B2. Data structures & algorithms**
- [ ] [Big O](https://samwho.dev/big-o)
- [ ] [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms-second-edition) (book, the gentlest good introduction)
- [ ] [Tech Interview Handbook: algorithms study cheatsheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/)

**Done when:** you've implemented a hash map, a heap, a trie, and BFS/DFS from
scratch in Go, and can state the complexity of each operation.

**B3. Operating systems** *(pairs with Phase 1)*
- [ ] [Operating Systems: Three Easy Pieces (OSTEP)](https://pages.cs.wisc.edu/~remzi/OSTEP/): free, and the best OS book for engineers. Core: the virtualization and concurrency parts. Persistence is *Go deeper*.
- [ ] *Go deeper:* [Computer Systems: A Programmer's Perspective](https://csapp.cs.cmu.edu/): the memory hierarchy and linking chapters

**Done when:** you've written a small program with threads and a race condition,
fixed it with a lock, and can explain how a virtual address becomes a physical one.

**B4. Networking fundamentals** *(pairs with Phase 1b)*
- [ ] [Computer Networking: A Top-Down Approach](https://gaia.cs.umass.edu/kurose_ross/index.php) by Kurose & Ross: chapters 1–3 (application and transport layers)
- [ ] [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/): the sockets API

**Done when:** you've written a TCP echo server and a minimal HTTP server using
raw sockets, with no framework.

**B5. Databases** *(pairs with Phase 5c)*
- [ ] [CMU 15-445: Intro to Database Systems](https://15445.courses.cs.cmu.edu/): the lectures on storage, indexes (B+ trees), transactions, and recovery
- [ ] *Go deeper:* the rest of the course, including the projects

**Done when:** you can explain how a B+ tree index works, what a write-ahead log
is for, and what each isolation level prevents.

**B6. Distributed systems** *(pairs with Phase 5)*
- [ ] [Designing Data-Intensive Applications](https://dataintensive.net) by Martin Kleppmann: the most useful book for a senior SRE after the Google SRE book. Read all of it, slowly.
- [ ] [The Raft consensus algorithm](https://raft.github.io): read the paper and play with the visualization
- [ ] *Go deeper:* [MIT 6.5840 Distributed Systems](https://pdos.csail.mit.edu/6.824/): lectures and labs

**Done when:** you can explain Raft leader election and log replication, and
why etcd needs a quorum, well enough to teach it.

**After B6:** go back to your weakest module, or pick a new area from Teach
Yourself CS (compilers, security, and so on). The Saturday never stops; only
the topic changes.

### LeetCode

- [ ] Work through the [NeetCode roadmap](https://neetcode.io/roadmap) (the
  NeetCode 150), pattern by pattern, in order. Start with arrays & hashing.
- **Language:** Go, from the first problem. Algorithms in Go make you fluent with
  slices, maps, and the standard library faster than anything else, and that
  fluency is part of the Go Mastery Track. Once you start Rust in Phase 5, solve
  every third problem in Rust as well: LeetCode is a good way to fight the borrow checker on small problems.
- **The 30-minute rule:** try for 30 minutes before looking at a solution. If you
  looked, re-solve it from scratch the next Saturday without looking.
- **Log every problem** in the Notion **LeetCode** database: problem, pattern, what tripped
  you up. Review the "Tripped" property on deload weeks.
- **Mix in ops-flavoured problems**, because platform and SRE coding rounds favour them: log
  parsing, rate limiters, LRU cache, top-K, merging intervals, and simple
  concurrency (a worker pool, a bounded queue).
- **Milestone, not deadline:** NeetCode 150 done before Phase 6. After that, keep
  doing 1–2 problems a week to stay warm, forever.

### Stay current (last Saturday of the month)

Spend the CS block catching up with the field, then write one paragraph in
the Notion **Stay Current** page: what changed, and does it matter for me? **Note tools; don't
chase them** (see failure mode 4 in §12).

- [ ] [SRE Weekly](https://sreweekly.com): the best weekly roundup of incidents and reliability writing
- [ ] [CNCF on YouTube](https://www.youtube.com/@cncf): KubeCon talks; watch one, skip the vendor pitches
- [ ] [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar): twice a year, a sober view of what's rising and falling
- [ ] [A collection of public postmortems](https://github.com/danluu/post-mortems): read one real outage a month and ask how you'd have caught it

---

## Go Mastery Track
**Required in every phase, from Phase 0 to the day you're hired and beyond · one Go evening a week (1.5 h) + every build**

Go is the language of the platform world: Kubernetes, etcd, containerd,
Terraform, Prometheus, Argo CD, Crossplane, and most of the CNCF are written in
it. A platform engineer who is a *master* of Go can read the source of every tool
in the stack, fix it, extend it, and build the pieces nobody else has built yet.
That is the goal of this track: not "can write some Go", but **the person on
the team other engineers ask about Go.**

How it works:

- **Go is the default language for every build in this plan.** Unless a topic
  says otherwise, anything you write is written in Go: CLIs, exporters,
  services, operators, providers, and the LeetCode problems on Saturday.
- **One Go evening a week**, every week, on top of the main track. It's for the
  current level's concepts and reading. The Sunday builds are where you apply them.
- **Seven levels, one per phase.** Each phase gate requires its Go level. The
  levels are in order; don't skip ahead, but do go back and re-read.
- **Read Go every week, not just write it.** Pick a file from the standard
  library or a project you use (Kubernetes, Prometheus, Argo CD) and read it
  until you understand why it's written that way. Masters are made by reading
  good code.
- **Keep a Notion Go Notes page**: gotchas you hit, idioms you learned, questions you
  couldn't answer yet. Review it on deload weeks.

| Level | Theme | Runs with |
|---|---|---|
| **G1** | The language | Phases 0–1 |
| **G2** | Systems programming with Go | Phase 1 |
| **G3** | Concurrency & production services | Phase 2 |
| **G4** | Go for the platform: CLIs, Kubernetes clients, APIs, releases | Phase 3 |
| **G5** | Go for infrastructure: cloud SDKs, Terraform providers, Crossplane | Phase 4 |
| **G6** | Internals & performance: runtime, GC, profiling, operators | Phase 5 |
| **G7** | Mastery in public: upstream code, reviews, teaching | Phase 6 → forever |

### G1. The language

**Concepts**
- [ ] Packages, imports, visibility (exported vs unexported), and the `main` package
- [ ] Basic types, zero values, constants and `iota`, type conversion
- [ ] Arrays vs slices: length, capacity, `append`, and how slices share a backing array
- [ ] Maps: iteration order, the zero value, and why maps aren't safe for concurrent use
- [ ] Strings, bytes, and runes: UTF-8, and why `len("é")` is 2
- [ ] Structs, embedding, and struct tags
- [ ] Methods: value vs pointer receivers, and when each is right
- [ ] Interfaces: implicit satisfaction, small interfaces, `any`, type assertions and type switches
- [ ] Errors as values: `error`, wrapping with `%w`, `errors.Is` and `errors.As`, sentinel vs typed errors
- [ ] `defer`, `panic`, and `recover`, and why you almost never use `panic`
- [ ] Closures and first-class functions
- [ ] Modules: `go.mod`, `go.sum`, semantic import versioning, `replace`, private modules
- [ ] Testing basics: `go test`, table-driven tests, subtests, `t.Helper`, test coverage

**Tools**
- [ ] **go toolchain** · *Deep*: `build`, `run`, `test`, `vet`, `fmt`, `mod tidy`, `install`, `env`, cross-compiling with `GOOS`/`GOARCH`
- [ ] **gopls** in your editor · *Deep*: go to definition, find references, rename
- [ ] **Delve** · *Working*: breakpoints and stepping through a test

**Core**
- [ ] [A tour of Go](https://go.dev/tour/)
- [ ] [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/): the best way in; test-first suits infra work. Do the "Go fundamentals" section.
- [ ] [The Go Programming Language](https://www.gopl.io) by Donovan & Kernighan (book): the classic. Chapters 1–7 now, the rest in G3.
- [ ] [Effective Go](https://go.dev/doc/effective_go)
- [ ] [Go by Example](https://gobyexample.com): reference while you build
- [ ] [Go Slices: usage and internals](https://go.dev/blog/slices-intro)
- [ ] [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors)
- [ ] [Exercism Go track](https://exercism.org/tracks/go): small exercises with mentor feedback; do 20

**Go deeper**
- [ ] [The Go Programming Language Specification](https://go.dev/ref/spec): read it once end to end. It's short, and masters know it.
- [ ] [Learning Go, 2nd Edition](https://www.oreilly.com/library/view/learning-go-2nd/9781098139285/) by Jon Bodner (book): the best "idiomatic Go" book for people who already program
- [ ] [Go Tutorials & Examples](https://gosamples.dev)
- [ ] [Getting up and running with Go](http://www.golangprograms.com)

**Done when:** you can explain what happens to two slices that share a backing
array after an `append`, why a nil pointer stored in an interface isn't `nil`,
and how `errors.Is` walks a wrapped chain, and 20 Exercism exercises are done.

### G2. Systems programming with Go

Go applied to Phase 1: the same Linux and networking internals, from code.

**Concepts**
- [ ] `io.Reader` and `io.Writer`, and composing them (`bufio`, `io.Copy`, `io.TeeReader`)
- [ ] Files and the filesystem: `os`, `io/fs`, `filepath.WalkDir`, permissions
- [ ] Running processes: `os/exec`, pipes, exit codes, environment
- [ ] Signals: `os/signal` and `signal.NotifyContext` for clean shutdown
- [ ] Syscalls from Go: `golang.org/x/sys/unix`, and reading `/proc` directly
- [ ] Networking: `net.Listen`, `net.Dial`, TCP and UDP servers, deadlines
- [ ] HTTP from the standard library: `net/http` clients and servers, and why the default client has no timeout
- [ ] Encoding: `encoding/json` (struct tags, `omitempty`, custom marshalers), YAML via a library
- [ ] CLI basics: `flag`, exit codes, stdout vs stderr, `--json` output
- [ ] Time: `time.Duration`, timers, tickers, and monotonic clocks

**Core**
- [ ] [Powerful Command-Line Applications in Go](https://pragprog.com/titles/rggo/powerful-command-line-applications-in-go/) by Ricardo Gerardi (book): CLIs for exactly the kind of work you do
- [ ] [Network Programming with Go](https://nostarch.com/networkprogrammingwithgo) by Adam Woodbeck (book): TCP, UDP, TLS, and HTTP from first principles; pairs with 1b
- [ ] [Package io](https://pkg.go.dev/io), [os/exec](https://pkg.go.dev/os/exec), and [net/http](https://pkg.go.dev/net/http) docs: read them, examples included
- [ ] [The complete guide to Go net/http timeouts](https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/) (Cloudflare)

**Builds** (these are the Phase 1 Sunday builds)
- [ ] A `ps`-like tool that reads `/proc` directly: PID, state, RSS, open file count
- [ ] A TCP echo server and a port checker, with deadlines
- [ ] The Phase 1 ops CLI (1c), in Go

**Done when:** the 1c tool is released, and you can explain why your HTTP client
needs timeouts and how your CLI behaves when it receives `SIGTERM`.

### G3. Concurrency & production services

Go applied to Phase 2: services that run in Kubernetes and behave well there.

**Concepts**
- [ ] Goroutines, and how they differ from OS threads
- [ ] Channels: buffered vs unbuffered, closing, ranging, nil channels, `select`
- [ ] The `sync` package: `Mutex`, `RWMutex`, `WaitGroup`, `Once`, and `sync/atomic`
- [ ] Patterns: worker pools, fan-out/fan-in, pipelines, bounded concurrency with semaphores
- [ ] `context.Context`: cancellation, deadlines, propagation through a call chain, and what not to put in it
- [ ] `errgroup` for groups of goroutines that can fail
- [ ] Goroutine leaks: how they happen and how to find them
- [ ] The Go memory model, and data races vs race conditions
- [ ] Production HTTP services: server timeouts, graceful shutdown, health and readiness endpoints, middleware
- [ ] Structured logging with `log/slog`
- [ ] Configuration: flags, environment variables, and config files, in that order of preference
- [ ] Instrumentation: Prometheus counters, gauges, and histograms with `client_golang`
- [ ] Container-friendly Go: static binaries, distroless images, `GOMAXPROCS` and `GOMEMLIMIT` inside cgroup limits

**Tools**
- [ ] **Race detector** (`go test -race`) · *Deep*
- [ ] **client_golang** · *Deep*
- [ ] **ko** · *Working*: build container images for Go apps without a Dockerfile

**Core**
- [ ] [Concurrency in Go](https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/) by Katherine Cox-Buday (book)
- [ ] [The Go Programming Language](https://www.gopl.io): chapters 8–9 (goroutines, channels, shared variables)
- [ ] [Go Concurrency Patterns: Pipelines and cancellation](https://go.dev/blog/pipelines)
- [ ] [Go Concurrency Patterns: Context](https://go.dev/blog/context)
- [ ] [The Go Memory Model](https://go.dev/ref/mem)
- [ ] [Data Race Detector](https://go.dev/doc/articles/race_detector)
- [ ] [Instrumenting a Go application for Prometheus](https://prometheus.io/docs/guides/go-application/)
- [ ] [Let's Go](https://lets-go.alexedwards.net) by Alex Edwards (book): building a real web service with the standard library

**Builds**
- [ ] A Prometheus exporter in Go for something in your lab or at work that has no exporter, deployed via GitOps
- [ ] A service with graceful shutdown, readiness that flips during shutdown, `slog` logging, and RED metrics, proven to drop zero requests during a rolling update

**Done when:** `go test -race` is part of your CI, the exporter runs in the lab,
and you can explain a goroutine leak you caused and how you found it.

### G4. Go for the platform

Go applied to Phase 3: the tools your users touch.

**Concepts**
- [ ] CLI design with Cobra: commands, flags, config, shell completion
- [ ] Talking to Kubernetes: client-go, the typed vs dynamic clients, informers, server-side apply
- [ ] Generics: type parameters and constraints, and when *not* to use them
- [ ] API design: REST with `net/http` routing, request validation, versioning, idempotent operations
- [ ] gRPC and Protocol Buffers basics: services, streaming, and why Kubernetes and etcd use them
- [ ] Testing in depth: fakes vs mocks, `httptest`, golden files, fuzzing, integration tests with real dependencies
- [ ] Project layout: `cmd/`, `internal/`, package boundaries, avoiding cyclic imports
- [ ] Dependency hygiene: minimal dependencies, `govulncheck`, upgrading modules safely
- [ ] Releasing: versioned binaries, checksums, changelogs, images, and Homebrew/`go install` support
- [ ] Code style: the Go Code Review Comments and Google's Go style guide

**Tools**
- [ ] **Cobra** · *Deep*
- [ ] **client-go** · *Working*
- [ ] **golangci-lint** · *Deep*: a config you can defend
- [ ] **GoReleaser** · *Working*
- [ ] **govulncheck** · *Working*
- [ ] **testcontainers-go** · *Working*
- [ ] **gRPC & protoc / buf** · *Working*

**Core**
- [ ] [Cobra](https://cobra.dev)
- [ ] [client-go](https://github.com/kubernetes/client-go) and its [examples](https://github.com/kubernetes/client-go/tree/master/examples)
- [ ] [Tutorial: Getting started with generics](https://go.dev/doc/tutorial/generics)
- [ ] [Go Fuzzing](https://go.dev/doc/security/fuzz/)
- [ ] [gRPC Go quick start](https://grpc.io/docs/languages/go/quickstart/)
- [ ] [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- [ ] [Style Guide](https://google.github.io/styleguide/go/guide)
- [ ] [Style Decisions](https://google.github.io/styleguide/go/decisions)
- [ ] [Best Practices](https://google.github.io/styleguide/go/best-practices)
- [ ] [GoReleaser](https://goreleaser.com)

**Builds**
- [ ] The platform CLI (3b): `platform new-service`, `platform tenant create`, `platform status`, with completion, `--json` output, tests, and releases
- [ ] Read one Kubernetes controller in the Kubernetes source (the ReplicaSet controller is a good first one) and write up how it works

**Done when:** someone other than you uses the platform CLI, it's released with
GoReleaser, and you can review a Go pull request against the style guide with
comments the author agrees with.

### G5. Go for infrastructure

Go applied to Phase 4: extending the infrastructure tools themselves.

**Concepts**
- [ ] Cloud SDKs: the AWS SDK for Go v2, credentials chains, retries, pagination, waiters
- [ ] How a Terraform provider works: schemas, CRUD, plan modifiers, state, import, and acceptance tests
- [ ] Crossplane composition functions: turning a tenant's request into managed resources, in Go
- [ ] Plugin architectures: how Terraform talks to providers over gRPC
- [ ] Idempotency and reconciliation when the API underneath is slow, flaky, or eventually consistent

**Core**
- [ ] [AWS SDK for Go v2](https://aws.github.io/aws-sdk-go-v2/docs/)
- [ ] [Implement a provider with the Terraform Plugin Framework](https://developer.hashicorp.com/terraform/tutorials/providers-plugin-framework) (HashiCorp tutorial series)
- [ ] [Write a composition function in Go](https://docs.crossplane.io/latest/guides/write-a-composition-function-in-go/) (Crossplane)

**Builds**
- [ ] A small **Terraform provider** for something on-prem that has none, such as buckets and users on your S3-compatible store, with acceptance tests. Very few candidates have written one.
- [ ] The 4c tenant bucket request as a Crossplane composition function in Go

**Done when:** your provider plans, applies, imports, and detects drift, and
the composition function runs in the lab.

### G6. Internals & performance

Go applied to Phase 5: knowing what the runtime does, so you can make Go fast
and predictable. This is the level that separates a Go user from a Go master.

**Concepts**
- [ ] The scheduler: Gs, Ms, and Ps, work stealing, preemption, and what blocks a thread
- [ ] Memory: stack vs heap, escape analysis, allocation costs
- [ ] The garbage collector: tri-color mark and sweep, GC pacing, `GOGC` and `GOMEMLIMIT`
- [ ] Data layout: struct field alignment and padding, slices of structs vs pointers
- [ ] Profiling: CPU, heap, allocation, goroutine, block, and mutex profiles with `pprof`
- [ ] The execution tracer, and reading a trace
- [ ] Benchmarks that don't lie: `testing.B`, `benchstat`, avoiding compiler optimizations
- [ ] Profile-guided optimization (PGO)
- [ ] `unsafe`, `cgo`, and `//go:` directives: what they do and why to avoid them
- [ ] How interfaces, maps, and channels are implemented in the runtime
- [ ] Building controllers: controller-runtime internals (with 5a)

**Tools**
- [ ] **pprof** · *Deep*
- [ ] **go tool trace** · *Working*
- [ ] **benchstat** · *Working*
- [ ] **kubebuilder & controller-runtime** · *Deep* (5a)

**Core**
- [ ] [100 Go Mistakes and How to Avoid Them](https://100go.co) by Teiva Harsanyi (book): read all of it; most of it you'll recognize from your own code by now
- [ ] [Efficient Go](https://www.oreilly.com/library/view/efficient-go/9781098105709/) by Bartłomiej Płotka (book): written by a Prometheus and Thanos maintainer
- [ ] [A Guide to the Go Garbage Collector](https://go.dev/doc/gc-guide)
- [ ] [Diagnostics](https://go.dev/doc/diagnostics)
- [ ] [Profiling Go Programs](https://go.dev/blog/pprof)
- [ ] [Profile-guided optimization](https://go.dev/doc/pgo)
- [ ] [Scheduling In Go](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html) (Ardan Labs, three parts)
- [ ] [High Performance Go Workshop](https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html) by Dave Cheney

**Go deeper**
- [ ] [Go Memory Management](https://povilasv.me/go-memory-management)
- [ ] [50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs](https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang)
- [ ] [Go Design Patterns](https://github.com/tmrts/go-patterns)
- [ ] The Go runtime source: `src/runtime/proc.go` (scheduler) and `src/runtime/map*.go`

**Builds**
- [ ] Profile your exporter, operator, or CLI under load; cut CPU or allocations by a measured amount; write a post with the before and after profiles
- [ ] Fix a memory problem in a containerized Go app by setting `GOMEMLIMIT` correctly, and show the effect on OOM kills

**Done when:** you can read a CPU and heap profile of someone else's service and
say where the time and memory go, and explain how the scheduler and GC behave
inside a container with a CPU limit.

### G7. Mastery in public

From Phase 6 onward, and forever. Mastery shows in what other people can see.

- [ ] **Upstream Go code.** At least one merged pull request in Go to a CNCF project you use (Kubernetes, Prometheus, Argo, Crossplane, Kyverno, or a smaller one). Start with a `good first issue`.
- [ ] **Code review.** Review Go pull requests at work or in open source every week. Reviewing teaches as much as writing.
- [ ] **Teach it.** A talk, a workshop, or a post series on something from G3 or G6.
- [ ] **Interviews in Go.** Do every coding round in Go, and be ready to explain your use of slices, maps, and goroutines while you code.
- [ ] **Keep up.** Read the release notes of every Go release ([Release History](https://go.dev/doc/devel/release)), skim [Golang Weekly](https://golangweekly.com), and watch a few [GopherCon](https://www.youtube.com/@GopherAcademy) talks a year.
- [ ] *Go deeper:* [Contribute to Go itself](https://go.dev/doc/contribute): even a documentation fix to the standard library counts.

**Done when:** never. This level is the habit that keeps you a master.

---

## System Design Track
**Required in every phase, from Phase 0 to the day you're hired and beyond · one design evening a week (1.5 h) + a design doc before every build**

Senior platform engineers are hired on design, and they spend the job on it:
choosing abstractions, isolating tenants, drawing failure domains, planning
migrations. The system design round is the highest-weight round in senior
Platform and SRE loops, and it can't be crammed in the last month. Design is a
skill built by **doing many designs and getting them wrong**, not by reading
other people's solutions.

The goal of this track: **design any system out loud in 45 minutes, start from
the users and the numbers, defend every tradeoff, and volunteer how it fails
and how you'd operate it**, without being asked.

How it works:

- **One design evening a week**, every week, on top of the main track. Alternate:
  - *Odd weeks:* the current level's concepts and reading.
  - *Even weeks:* one **design kata**. Take a prompt, set a 45-minute timer, and
    design it out loud on [Excalidraw](https://excalidraw.com). Then spend 30
    minutes comparing it with a reference answer and writing down what you missed.
- **Design before you build** (rule 7). Every build bigger than one Sunday starts
  with a one-page design doc: the problem, the users, requirements and numbers,
  the options you considered, the decision, how it fails, and how you'll know it
  works. When the build is done, add a section called "What I got wrong".
- **Keep a design journal** in the Notion **Design Journal**: every kata and every design doc,
  one page each. Aim for 40+ by Phase 6. It is your interview revision and the
  raw material for posts.
- **Every design answers the same five questions**, in this order:
  1. **Who uses it, and what must it do?** Functional and non-functional requirements.
  2. **How big is it?** Back-of-the-envelope numbers: requests per second, storage, bandwidth.
  3. **What's the design?** Components, APIs, data model, and how a request flows.
  4. **How does it fail?** Blast radius, failure domains, what degrades and what stops.
  5. **How do you run it?** SLIs and SLOs, rollout, on-call, and cost.

  Questions 4 and 5 are where a platform engineer beats a generic backend
  candidate. Never skip them.
- **Six levels, one per phase.** Each phase gate requires its level. Katas get
  harder as you go; re-do old ones on deload weeks and see how your answer has changed.

| Level | Theme | Runs with |
|---|---|---|
| **SD1** | Foundations: how a request flows, numbers, estimation | Phases 0–1 |
| **SD2** | Building blocks: load balancers, caches, databases, queues, APIs | Phase 2 |
| **SD3** | Designing platforms: control planes, abstractions, tenancy, design docs | Phase 3 |
| **SD4** | Designing for the cloud: zones, regions, disaster recovery, cost | Phase 4 |
| **SD5** | Distributed systems depth: consistency, consensus, partitioning | Phase 5 |
| **SD6** | The interview, and design in public | Phase 6 → forever |

### SD1. Foundations

**Concepts**
- [ ] What happens when you type a URL, hop by hop: DNS, TCP, TLS, load balancer, app, database, and back
- [ ] Latency numbers and orders of magnitude: memory vs SSD vs disk vs network vs cross-region
- [ ] Back-of-the-envelope estimation: requests per second from daily users, storage per year, bandwidth, peak vs average
- [ ] Functional vs non-functional requirements, and availability in nines: how much downtime each nine allows per month
- [ ] Vertical vs horizontal scaling, stateless services, and why the state is always the hard part
- [ ] The interview framework: requirements → estimates → API → high-level design → deep dive → failure and operations

**Core**
- [ ] [The System Design Primer](https://github.com/donnemartin/system-design-primer): the canonical reference
- [ ] [Latency numbers every programmer should know](https://colin-scott.github.io/personal_website/research/interactive_latency.html): learn them, then learn them again
- [ ] [Web Architecture 101](https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947)
- [ ] [Scale From Zero To Millions Of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [ ] [Back-of-the-envelope estimation](https://bytebytego.com/courses/system-design-interview/back-of-the-envelope-estimation)
- [ ] [A framework for system design interviews](https://bytebytego.com/courses/system-design-interview/a-framework-for-system-design-interviews)
- [ ] [System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) (Hello Interview): a fast, modern overview of the whole interview
- [ ] **Exercise: draw your workplace.** From memory, draw your company's
  production architecture on one diagram: every component, and how a request
  moves through it. Use levels 1 and 2 of the [C4 model](https://c4model.com).
  Then walk a colleague through it and fix what they correct.
- [ ] **Exercise: ten estimates.** Write ten estimation drills in
  an **Estimates** page in the Design Journal. Use your own job where you can: "how much log
  storage does our cluster need per year?", "how many requests per second does
  our busiest service see at peak?". Check each one against the real number.

**Done when:** you can estimate requests per second, storage, and bandwidth for
a described system in five minutes without a calculator, and explain every hop
of a request through your workplace's stack.

### SD2. Building blocks

Every design is assembled from the same dozen parts. For each one, know when
you'd use it, what it costs, and how it fails.

**Concepts**
- [ ] Load balancing: L4 vs L7, algorithms, health checks, and sticky sessions
- [ ] Caching: cache-aside, write-through, write-back, TTLs, invalidation, stampedes, and CDNs
- [ ] Databases: SQL vs NoSQL, indexes, read replicas, connection pooling, and how to choose
- [ ] Replication and sharding, first pass: leader and followers, choosing a shard key, hot partitions
- [ ] Queues vs logs: work queues, Kafka-style logs, at-least-once delivery, dead-letter queues
- [ ] Object vs block vs file storage, and when each fits
- [ ] API design: REST vs gRPC, pagination, idempotency keys, versioning
- [ ] Rate limiting algorithms, and where in the stack to enforce them
- [ ] Reverse proxies, API gateways, and service meshes: what each one is actually for

**Core**
- [ ] [Load Balancing](https://samwho.dev/load-balancing): interactive and genuinely excellent
- [ ] [Caching](https://planetscale.com/blog/caching)
- [ ] [Scaling your API with rate limiters](https://stripe.com/blog/rate-limiters) (Stripe)
- [ ] [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency) (Stripe)
- [ ] [System Design Interview, Volume 1](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) by Alex Xu (book): read it across SD1 and SD2, one chapter per odd week
- [ ] **Katas:** a URL shortener, a rate limiter, a distributed cache, a
  notification system, and a file-sharing service backed by S3-compatible
  storage (you run that at work, so go deep on it).
- [ ] **Build:** implement the rate limiter you designed, in Go: token-bucket
  HTTP middleware with tests and a benchmark. Then write down where the design
  and the code disagreed.
- [ ] **Design doc:** write one for the lab's observability stack (2e) *before*
  you build it.

**Go deeper**
- [ ] [System Design 101](https://github.com/ByteByteGoHq/system-design-101)
- [ ] [What's in a Production Web Application?](https://web.archive.org/web/20210106095747/http://stephenmann.io/post/whats-in-a-production-web-application)

*Structured courses (pick at most one; they overlap heavily and don't replace the katas):*
- [ ] [SystemsExpert course from AlgoExpert](https://www.algoexpert.io/systems/product)
- [ ] [Grokking the System Design Interview](https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers)

**Done when:** five katas are done, timed and journaled, and for every concept
above you can say when you'd use it, what it costs, and how it fails.

### SD3. Designing platforms

This is your home ground: the designs platform interviews ask for, and the
designs you'll write at work. The systems you build in Phase 3 are designed here first.

**Concepts**
- [ ] Control plane vs data plane, and why the data plane must keep working when the control plane is down
- [ ] Declarative APIs and reconciliation loops as a general design pattern, not just a Kubernetes feature
- [ ] Designing abstractions: what to hide, what to expose, where the escape hatches go, and what a leaky abstraction costs
- [ ] Multi-tenancy: isolation models, noisy neighbours, and fairness
- [ ] Blast radius and failure domains: what one bad change, one bad tenant, or one bad node can break
- [ ] Migration patterns: strangler fig, dual running, feature flags, and a rollback plan for every step
- [ ] Design docs, RFCs, and ADRs: writing a decision so that others can review it

**Core**
- [ ] [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/): what a good design doc contains, and when not to write one
- [ ] [Architecture Decision Records](https://adr.github.io)
- [ ] [Borg, Omega, and Kubernetes](https://queue.acm.org/detail.cfm?id=2898444): ten years of lessons from designing cluster platforms at Google
- [ ] [Control planes vs data planes](https://brooker.co.za/blog/2019/03/17/control.html) by Marc Brooker
- [ ] **Katas:** an internal developer platform for 300 engineers, a CI system
  that runs 10,000 jobs a day, a deployment system with progressive rollout, a
  multi-tenant logging pipeline, a secrets service, a feature-flag service, and
  an artifact cache for an on-prem datacenter.
- [ ] **Design docs:** the golden path (3c) and the tenancy model (3d), each
  reviewed by at least one engineer at work *before* you build. Record the big
  decisions as ADRs in the lab repo.

**Go deeper**
- [ ] [Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/) by Mark Richards & Neal Ford (book)
- [ ] [Kubernetes design principles](https://github.com/kubernetes/design-proposals-archive/blob/main/architecture/principles.md)

**Done when:** two design docs have been reviewed by someone else and their
feedback changed the design, and you can design the 300-engineer platform out
loud in 45 minutes.

### SD4. Designing for the cloud

**Concepts**
- [ ] Availability zones and regions, correlated failures, and static stability
- [ ] Multi-AZ by default; multi-region only when you can justify the cost. Active-passive vs active-active.
- [ ] Disaster recovery: RPO and RTO; backup and restore vs pilot light vs warm standby vs multi-site
- [ ] Cells and shuffle sharding: limiting the blast radius by design
- [ ] Timeouts, retries with backoff and jitter, and how retries turn a blip into an outage
- [ ] Managed vs self-hosted as a design decision: cost, control, and who gets paged
- [ ] Cost as a design constraint: data transfer, storage tiers, per-request pricing

**Core**
- [ ] [The Amazon Builders' Library](https://aws.amazon.com/builders-library/): the best free writing on designing systems that stay up. Skim the index, then read the four below.
- [ ] [Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) (Builders' Library)
- [ ] [Static stability using Availability Zones](https://aws.amazon.com/builders-library/static-stability-using-availability-zones/) (Builders' Library)
- [ ] [Workload isolation using shuffle-sharding](https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/) (Builders' Library)
- [ ] [Avoiding insurmountable queue backlogs](https://aws.amazon.com/builders-library/avoiding-insurmountable-queue-backlogs/) (Builders' Library)
- [ ] [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html): the reliability and cost optimization pillars
- [ ] [Reducing the scope of impact with cell-based architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html)
- [ ] [Disaster recovery options in the cloud](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
- [ ] **Katas:** the platform in two regions (active-passive), a metrics
  pipeline on AWS with a monthly cost estimate, moving an on-prem service to AWS
  with zero downtime, and an object storage service. Every kata from now on
  ends with a cost estimate.
- [ ] **Design doc:** disaster recovery for the platform on EKS, with stated RPO
  and RTO. Then test it in a game day and record the RTO you actually got.

**Go deeper**
- [ ] [System Design Interview, Volume 2](https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119) by Alex Xu & Sahn Lam (book)

**Done when:** the DR drill's measured RTO is within your design, and you can
explain the monthly cost of every kata you did at this level.

### SD5. Distributed systems depth

Runs with Phase 5b and Back to Basics B6 (DDIA). This is the level where you
stop drawing boxes and start explaining what happens *between* them.

**Concepts**
- [ ] Consistency models: linearizable, sequential, causal, eventual, read-your-writes
- [ ] Consensus and leader election, and what a quorum buys you
- [ ] Partitioning and rebalancing; consistent hashing
- [ ] Time and order: why wall clocks lie, logical clocks, fencing tokens
- [ ] Exactly-once as at-least-once plus idempotency
- [ ] Backpressure, load shedding, and metastable failures

**Core**
- [ ] [Understanding Distributed Systems](https://understandingdistributed.systems) by Roberto Vitillo (book): the bridge between interview prep and DDIA
- [ ] [Patterns of Distributed Systems](https://martinfowler.com/articles/patterns-of-distributed-systems/) by Unmesh Joshi
- [ ] [Consistency models](https://jepsen.io/consistency) (Jepsen)
- [ ] [Dynamo: Amazon's Highly Available Key-value Store](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) (paper)
- [ ] [Large-scale cluster management at Google with Borg](https://research.google/pubs/large-scale-cluster-management-at-google-with-borg/) (paper)
- [ ] **Katas:** a distributed key-value store, a distributed job scheduler, a
  Kafka-like log, and a global rate limiter. For each, state the consistency it
  gives and what happens during a network partition.
- [ ] **Build:** a consistent-hash ring in Go with virtual nodes. Measure how
  many keys move when a node joins or leaves, and write it up.

**Go deeper**
- [ ] [Metastable Failures in Distributed Systems](https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s11-bronson.pdf) (paper)
- [ ] [Database Internals](https://www.databass.dev) by Alex Petrov (book)

**Done when:** 5b's "done when" passes, and for every SD5 kata you can say what
consistency it gives and how it behaves during a partition.

### SD6. The interview, and design in public

Runs with Phase 6a, and never stops. By now the journal holds 40+ designs; this
level turns them into interview performance and into influence at work.

- [ ] **Ten mock design interviews with another person**: peers, colleagues, or
  a paid service such as [interviewing.io](https://interviewing.io). Get written
  feedback every time. At least three should be platform-flavoured.
- [ ] **Review designs at work.** Comment in writing on other people's design
  docs. Reviewing well is part of the senior bar.
- [ ] **Publish two design docs** from the lab as posts, including "what I got wrong".
- [ ] **One kata a month, forever**, after you're hired too.

**Done when:** three mock design interviews in a row came back at senior level,
including one platform design.

---

## Phase 0: Gap Audit & Instrumentation
**Effort budget: ~30 h**

You already know a lot, but "I use it every day" hides gaps. Phase 0 finds out
exactly where your knowledge stops, and sets up the tooling for the rest of the
plan. It's short, but don't skip it: the audit decides how much of Phases 1–2
you can test out of.

### Build
1. **The gap audit.** Work through [The Platform Engineering Checklist](#the-platform-engineering-checklist),
   then the SRE Checklist and the sysadmin question set below, *cold*, before
   studying anything. Score each item as **Explain**
   (I can teach it), **Use** (I do it at work but couldn't explain why it works),
   or **Gap** (I don't know it). Record the result in the Notion **Gap Audit** database.
   Expect a lot of **Use** on Linux, Docker, and Kubernetes. Those are exactly
   the areas this plan turns into **Explain**.
2. **The lab.** Three Linux VMs (Proxmox, or libvirt/KVM on a spare box; one
   32 GB machine is enough). Rules: no clicking, everything reproducible. Start
   with the Bash you already write; Terraform and Ansible replace it in Phase 2.
   Anything you can safely do on non-production systems at work counts too.
3. **The Notion workspace.** One top-level page, **Roadmap**, holding these
   databases and pages. Use database properties, not folders, so every view
   (by phase, by track, by week) is one filter away.

   | Item | Type | Key properties |
   |---|---|---|
   | **Notes** | Database | Topic, Phase, Track (Gate / Go / SD / CS), Status (Draft / Prose / Posted) |
   | **Gap Audit** | Database | Item, Domain, Score (Explain / Use / Gap), Phase |
   | **Hours** | Database | Date, Hours, Session (Theory / Practice / Go / SD / Build / CS / LeetCode), Phase |
   | **Design Journal** | Database | Title, Type (Kata / Design doc), SD level, Date, Minutes. Holds the **Estimates** page. |
   | **LeetCode** | Database | Problem, Pattern, Tripped, Date, Re-solved |
   | **Work Log** | Database | Week, What broke, What I built, Who used it, What it saved |
   | **Parked** | Database | Item, Phase, Why parked |
   | **Reviews** | Database | Quarter (`YYYY-QN`), one page per quarterly review |
   | **Platform Audit**, **Platform Users**, **Go Notes**, **Stay Current**, **On-prem vs AWS** | Pages | — |

   Notion's toggles and synced blocks are fine for notes, but keep Anki for
   facts you must recall under interview pressure: syscalls, signals, exit
   codes, TCP states, PromQL functions, Go gotchas.
4. **The hours log.** The **Hours** database, one row per session. This
   replaces the calendar.
5. **The work log.** Start the **Work Log** database now (see §9). What you do at work
   over the next two years is half your evidence.
6. **The platform audit.** List the ten most common requests developers send
   your team at work (tickets, chat messages, "can you just..."), and score
   your workplace against the CNCF Platform Engineering Maturity Model. Write
   it up in the Notion **Platform Audit** page. Every request on that list that a developer
   could do themselves is a candidate feature for your Phase 3 platform.

### Core
- [ ] [CNCF Platform Engineering Maturity Model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/): the instrument for the platform audit
- [ ] [SRE Checklist](https://github.com/bregman-arie/sre-checklist): a second view for the gap audit
- [ ] [Sysadmin Test Questions](https://github.com/trimstray/test-your-sysadmin-skills): score yourself cold
- [ ] [What happens when you type google.com into your browser's address box and press enter?](https://github.com/alex/what-happens-when): explain every step out loud before reading; each step you can't explain goes in the audit
- [ ] [School of SRE](https://linkedin.github.io/school-of-sre): skim once to see the full map, and mark the parts that are new to you
- [ ] [Things That Makes a Good Site Reliability Engineer](https://reliabilityengineering.substack.com/p/things-that-makes-a-good-site-reliability)

### Refreshers (only if the audit shows a gap)
- [ ] [Useful git commands for SRE and DevOps engineers](https://reliabilityengineering.substack.com/p/useful-git-commands-for-sre-and-devops)
- [ ] [Processes and Threads](https://planetscale.com/blog/processes-and-threads)
- [ ] Simple version: [What happens when you type in 'www.cnn.com' in your browser?](https://syedali.net/2013/08/18/what-happens-when-you-type-in-www-cnn-com-in-your-browser)
- [ ] [Introduction to Linux – Full Course for Beginners](https://www.youtube.com/watch?v=sWbUDq4S6Y8): skim only for specific gaps

### Gate to Phase 1
- [ ] Gap audit committed, with every checklist item scored Explain / Use / Gap.
- [ ] Platform audit committed: the top developer requests and a maturity score.
- [ ] Lab rebuilds from scratch with one command.
- [ ] Four consecutive weeks of cadence in the hours log, including four Go evenings.
- [ ] Go toolchain, `gopls`, and Delve set up; A Tour of Go finished; G1 under way.
- [ ] Design Journal started in Notion; SD1 under way.

---

## Phase 1: The Spine
**Effort budget: ~220 h**

You use Linux every day. This phase is about going *under* what you use: the
syscalls behind your commands, the kernel behind your containers, the packets
behind your services. Everything senior is built on this phase. Kubernetes, service meshes, and
whatever replaces them later are all abstractions over Linux processes, memory,
filesystems, and packets. Engineers who skip this phase get stuck at mid-level,
because they can only debug down to the abstraction boundary. **This phase
decides whether you become senior.**

Work 1a and 1c together (theory evenings on Linux, Sunday builds in Go that
automate your Linux work), then move to 1b. The Go evening runs G1, then G2.

### 1a. Linux internals

The highest-leverage body of knowledge in this roadmap.

**Prove it** (cold, on a lab VM, no notes). Explain out loud and write it down:
- [ ] What happens, syscall by syscall, when Bash runs `cat file | grep x > out`? Who opens which file descriptor, and when?
- [ ] A process is using 4 GB of "memory" according to `top`. How much of that is really its own? What are RSS, VSZ, page cache, and shared memory?
- [ ] A service was killed and `dmesg` shows `oom-kill`. Walk from that line to the cgroup limit that caused it.
- [ ] `df` says the disk has space but writes fail with "No space left on device". Name two causes and how to confirm each.

**Core** (only for the parts you couldn't explain)
- [ ] [What every SRE should know about GNU/Linux shell related internals: file descriptors, pipes, terminals, user sessions, process groups and daemons](https://biriukov.dev/docs/fd-pipe-session-terminal/0-sre-should-know-about-gnu-linux-shell-related-internals-file-descriptors-pipes-terminals-user-sessions-process-groups-and-daemons)
- [ ] [SRE deep dive into Linux Page Cache](https://biriukov.dev/docs/page-cache/0-linux-page-cache-for-sre)
- [ ] [Processes in Linux - Everything You Need to Know](https://reliabilityengineering.substack.com/p/everything-you-need-to-know-about)
- [ ] [An introduction to the Linux boot and startup processes](https://opensource.com/article/17/2/linux-boot-and-startup): then break the initramfs on a lab VM on purpose and recover it
- [ ] [Understanding Inodes](https://syedali.net/2015/02/08/understanding-inodes)
- [ ] [Understanding proc filesystem](https://syedali.net/2013/08/20/understanding-proc-filesystem)
- [ ] [Understanding Linux filesystems: ext4 and beyond](https://opensource.com/article/18/4/ext4-filesystem): you run S3-compatible storage on-prem, so this is your day job
- [ ] [Linux Kernel Memory Management](http://learnlinuxconcepts.blogspot.com/2014/02/linux-memory-management.html)
- [ ] [Kernel Space and User Space](http://learnlinuxconcepts.blogspot.com/2014/02/kernel-space-and-user-space.html)
- [ ] [Linux Kernel System Calls](http://learnlinuxconcepts.blogspot.com/2014/02/system-calls.html)
- [ ] [Linux Kernel Process Management](http://learnlinuxconcepts.blogspot.com/2014/03/process-management.html)

**Troubleshooting**: this is a *skill*, not a reading list. Drill it weekly,
even if the Prove it test went well.
- [ ] [Linux Performance Analysis in 60,000 Milliseconds](https://medium.com/netflix-techblog/linux-performance-analysis-in-60-000-milliseconds-accc10403c55): memorize this checklist
- [ ] [Linux troubleshooting tools](https://syedali.net/2013/08/20/linux-troubleshooting-tools)
- [ ] [strace](https://www.dedoimedo.com/computers/strace.html)
- [ ] [lsof](https://www.dedoimedo.com/computers/lsof.html)
- [ ] [SadServers: practise Linux troubleshooting](https://sadservers.com). **Standing commitment: one scenario a week, timed, until you're hired.** Nothing else on this list carries over to interviews as directly.

**Go deeper**
- [ ] [Linux Internals workshop - Google TechTalks](https://www.youtube.com/playlist?list=PLSIUOFhnxEiC3YTdxwqZqgEY5imVL8U8J)
- [ ] [How Does Linux Boot Process Work?](https://youtu.be/XpFsMB6FoOs)
- [ ] [What happens when we turn on computer?](https://www.geeksforgeeks.org/what-happens-when-we-turn-on-computer/)
- [ ] [What happens when we turn on computer? (discussion)](https://leetcode.com/discuss/interview-question/125107/What-happens-when-we-turn-on-computer)
- [ ] [From Power up to login prompt](http://www.scott-a-s.com/files/linux_boot.pdf)
- [ ] [Understand UNIX / Linux Inodes Basics with Examples](https://www.thegeekstuff.com/2012/01/linux-inodes)
- [ ] [Common Mount Options](https://syedali.net/2015/01/06/common-mount-options)
- [ ] [Explain the basics of Linux kernel](http://learnlinuxconcepts.blogspot.com/2014/03/explain-basics-of-linux-kernel.html)
- [ ] [Linux Addressing](http://learnlinuxconcepts.blogspot.com/2014/02/linux-addressing.html)
- [ ] [Stack and Heap](http://learnlinuxconcepts.blogspot.com/2014/02/stack-and-heap.html)
- [ ] [Paging and Segmentation](http://learnlinuxconcepts.blogspot.com/2014/02/paging-and-segmentation.html)
- [ ] [The Virtual Filesystem](http://learnlinuxconcepts.blogspot.com/2014/10/the-virtual-filesystem.html)
- [ ] [Concurrency and Race Conditions](http://learnlinuxconcepts.blogspot.com/2014/07/concurrency-and-race-conditions.html)
- [ ] [Memory Leak](https://stackoverflow.com/questions/312069/the-best-memory-leak-definition)
- [ ] [What is a kernel Panic?](http://learnlinuxconcepts.blogspot.com/2014/07/what-is-kernel-panic.html)
- [ ] [Linux system debugging](https://www.dedoimedo.com/computers/linux-system-debugging-super.html)
- [ ] [linux-insides: a book about the Linux kernel](https://0xax.gitbooks.io/linux-insides/content): reference; dip in, don't read it cover to cover

**Done when:** you can explain power-on to login prompt without hand-waving,
explain an OOM kill from `dmesg` to the cgroup that caused it, and reach for
`strace`, `lsof`, `/proc`, and `perf` without thinking about it.

### 1b. Networking

This is where on-prem experience makes you much better than cloud-only peers,
because you can actually see the topology.

**Prove it:**
- [ ] A client gets `connection refused` from one service and a timeout from another. What does each mean at the TCP level, and how do you tell them apart with `ss` and `tcpdump`?
- [ ] `curl` to a service takes 5 seconds, but only the first time. Name the likely culprit and how you'd prove it.
- [ ] Draw the path of a packet from a pod on one node to a pod on another node in your work cluster, including every NAT and every virtual interface.

**Core**
- [ ] [The Internet explained from first principles](https://explained-from-first-principles.com/internet)
- [ ] [Beej's Guide to Networking Concepts](https://beej.us/guide/bgnet0)
- [ ] [Introduction to Linux interfaces for virtual networking](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking): the foundation of every container network you'll debug
- [ ] [What every SRE should know about GNU/Linux resolvers and Dual-Stack applications](https://biriukov.dev/docs/resolver-dual-stack-application/0-sre-should-know-about-gnu-linux-resolvers-and-dual-stack-applications)
- [ ] [Introduction to modern network load balancing and proxying](https://blog.envoyproxy.io/introduction-to-modern-network-load-balancing-and-proxying-a57f6ff80236)
- [ ] **Exercise:** capture a full HTTP request with `tcpdump` on a lab VM and annotate
  every packet: DNS, TCP handshake, TLS, request, teardown.

**Go deeper**
- [ ] [Network protocols for anyone who knows a programming language](https://www.destroyallsoftware.com/compendium/network-protocols?share_key=97d3ba4c24d21147)
- [ ] [Load Balancing Algorithms](https://syedali.net/2013/08/22/load-balancing-algorithms)
- [ ] [Multi-tier load-balancing with Linux](https://vincent.bernat.ch/en/blog/2018-multi-tier-loadbalancer)

**Done when:** you can trace a packet from your laptop to a process on a lab VM
and name every hop, lookup, and translation along the way.

### 1c. Go for operations

You already automate with Bash. Go is where you go when a script outgrows Bash:
structured data, APIs, error handling, tests, and a single static binary you
can drop on any server or into any container. This topic is levels **G1 and G2**
of the [Go Mastery Track](#go-mastery-track), applied to your job.

- [ ] **Build:** a real CLI tool *for your job*, in Go, e.g. a log parser, a
  health-checker for your object storage, or a report on your Kubernetes
  resources through its API. Ideally, replace one of your team's Bash scripts
  that has become painful. It needs flags, error handling, tests, a README, and
  a tagged release with binaries.
- [ ] *Python, reading level only:* if your team's scripts are Python, spend an
  evening with [Python For Everyone](https://www.py4e.com/) so you can read and
  fix them. Don't write new tools in it.

**Done when:** someone else could clone the tool, run it, and understand the
code without asking you, and Go track levels G1 and G2 are done.

### Books for this phase
- [ ] [UNIX and Linux System Administration Handbook (5th Edition)](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554): desk reference for the whole phase
- [ ] [Linux Pocket Guide, 3rd Edition](http://shop.oreilly.com/product/0636920040927.do)
- [ ] [TCP/IP Illustrated, Volume 1](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313): reference; read the TCP chapters properly
- [ ] [Linux Kernel Development (3rd Edition)](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468): optional stretch goal

### Gate to Phase 2
- [ ] 20+ SadServers scenarios solved.
- [ ] The packet-tracing and OOM-kill explanations written up in Notion **Notes**.
- [ ] Go tool published with tests and a release.
- [ ] Three posts published.
- [ ] Checklist A and B ticked, plus the Git items in C.
- [ ] Go track: G1 and G2 done.
- [ ] System design: SD1 done; your workplace diagram reviewed by a colleague.

---

## Phase 2: Platform Foundations
**Effort budget: ~230 h**

You already *use* containers, pipelines, and Kubernetes. This phase takes you
from user to **builder and operator**: you'll know how they work inside, you'll
provision them from code, and you'll be able to see what they're doing. These
are the parts every platform is built from. Phase 3 turns them into a product.

Where your hours go: 2a, 2b, and 2d are mostly **Prove it** plus internals, since
you use these daily. 2c (Terraform/Ansible) and 2e (monitoring) are new to you,
so they get the full treatment. Everything runs **in your lab**, with no cloud bill.

### 2a. Containers, first and properly

Containers are Linux namespaces + cgroups + a filesystem trick. Learn them at
that level and Kubernetes stops being magic.

**Prove it:**
- [ ] Which namespaces does a container get, and which does it share with the host by default?
- [ ] A container's memory limit is 512 MB. Where exactly is that enforced, and what happens at 513 MB?
- [ ] Why is a 1.2 GB image slow to deploy, and what are three ways to fix it without changing the app?

**Core**
- [ ] [Anti-Patterns When Building Container Images](https://jpetazzo.github.io/2021/11/30/docker-build-container-images-antipatterns)
- [ ] **Exercise:** build a container from scratch with `unshare`, `cgcreate`, and
  `pivot_root`. No Docker. One build session, and you won't be confused about
  containers again.

**Go deeper**
- [ ] [Introduction to Docker and Containers](http://container.training/intro-selfpaced.yml.html): refresher only
- [ ] [Containers Patterns](https://l0rd.github.io/containerspatterns)
- [ ] [Docker Container Anti Patterns](https://blog.couchbase.com/docker-container-anti-patterns/)

**Done when:** you can explain what `docker run` does in terms of syscalls and
kernel features.

### 2b. Kubernetes

You deploy to Kubernetes at work. The senior step is being the person who
understands the control plane, the network, and the failure modes when it
breaks. Install it the hard way once (kubeadm, or Kubernetes the Hard Way), then
never again.

**Prove it:**
- [ ] A pod is stuck in `Pending`. List every component that could be responsible, in order, and how you'd check each one.
- [ ] Explain how a `ClusterIP` Service actually routes traffic. Where do the rules live, and who writes them?
- [ ] etcd loses quorum. What still works in the cluster, and what stops?
- [ ] A Deployment rollout hangs at 50%. What decides that, and how do you find out why?

**Core**
- [ ] [What happens when ... Kubernetes edition!](https://github.com/jamiehannaford/what-happens-when-k8s/blob/master/README.md): the most important document in this section
- [ ] [THE KUBERNETES NETWORKING GUIDE](https://www.tkng.io): networking is the part everyone fakes, so don't
- [ ] [Kubernetes networking: service, kube-proxy, load balancing](https://learnkube.com/kubernetes-services-and-load-balancing)
- [ ] [The life of a DNS query in Kubernetes](https://www.nslookup.io/learning/the-life-of-a-dns-query-in-kubernetes)
- [ ] [From Linux Primitives to Kubernetes Security Contexts](https://learnkube.com/security-contexts): this is where your Phase 1 kernel knowledge pays off
- [ ] [Kubernetes production best practices](https://learnkube.com/production-best-practices)
- [ ] [Gateway API](https://gateway-api.sigs.k8s.io/): the successor to Ingress, and the traffic API most new platforms expose to app teams
- [ ] **Build:** package one of your services as a Helm chart *and* as Kustomize
  overlays. Write down which one you'd hand to an app team, and why.
- [ ] [47 Things To Become a Kubernetes Expert](https://ymmt2005.hatenablog.com/entry/k8s-things): use as a self-audit at the end
- [ ] **CKA exam passed** 🎯. It is hands-on and timed, so drill `kubectl` speed
  instead of watching videos. Book the exam once you're about two-thirds through
  this topic; a paid exam slot is the one deadline worth having.

**Go deeper**
- [ ] [Deploying and Scaling Microservices with Docker and Kubernetes](http://container.training/kube-selfpaced.yml.html): refresher only
- [ ] [Demystifying the Kubernetes Iceberg](https://asankov.dev/post/demystifying-the-kubernetes-iceberg-1)
- [ ] [Kubernetes Learning Roadmap](https://github.com/techiescamp/kubernetes-learning-path)
- [ ] [A Guide to the Kubernetes Networking Model](https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model)
- [ ] [Kubernetes Production Patterns](https://github.com/gravitational/workshop/blob/master/k8sprod.md)
- [ ] [Kubernetes Best Practices 101](https://github.com/diegolnasc/kubernetes-best-practices)
- [ ] [15 Kubernetes Best Practices Every Developer Should Know](https://spacelift.io/blog/kubernetes-best-practices)
- [ ] [Kubernetes YAML tips and tricks](https://itnext.io/kubernetes-yaml-tips-and-tricks-904a2c0b2b81)

**Done when:** CKA is passed, and you can explain `kubectl apply` end to end:
API server → etcd → controller → scheduler → kubelet → CRI → cgroups/namespaces.

### 2c. Infrastructure as Code

**New to you, so this gets the full loop.** For a DevOps engineer this is the
biggest gap on the CV: nearly every SRE and Platform job ad asks for Terraform.
Target your **lab** (the Proxmox or libvirt Terraform provider), not a cloud.
The concepts are identical, and you'll reuse all of it in Phase 4.

**Core**
- [ ] [Terraform](https://learn.hashicorp.com/terraform)
- [ ] [A Comprehensive Guide to Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca)
- [ ] [Google Cloud: Best practices for using Terraform](https://cloud.google.com/docs/terraform/best-practices-for-terraform): cloud-agnostic advice despite the title
- [ ] [Ansible](https://github.com/leucos/ansible-tuto): you need this for on-prem; IaC and config management solve different problems

**Go deeper**
- [ ] [Terraform Roadmap](https://roadmap.sh/terraform)

**Done when:** your lab VMs are provisioned by Terraform and configured by
Ansible, with state and modules you can explain, *and* you've brought one piece
of it to work (a Terraform module or an Ansible role replacing a manual process).

### 2d. CI/CD & delivery

You build pipelines already. The gap is usually on the *delivery* side: how
changes reach production safely, and how to recover when they don't.

**Prove it:**
- [ ] For a service at work: if a bad release goes out right now, how long until it's rolled back, and who has to do what?
- [ ] Argue blue/green vs. canary vs. rolling for a stateful service. Which would you choose, and what would make you change your mind?
- [ ] What's the difference between push-based CD (your pipeline runs `kubectl apply`) and pull-based GitOps, and what failure does each one handle better?

**Core**
- [ ] [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
- [ ] [Six Strategies for Application Deployment](https://thenewstack.io/deployment-strategies): be able to argue blue/green vs. canary vs. rolling, with the tradeoffs
- [ ] [What Is GitOps?](https://codefresh.io/learn/gitops)
- [ ] **Build:** ArgoCD or Flux managing the entire lab from git. Deleting the
  cluster and re-bootstrapping must restore everything.

**Go deeper**
- [ ] [CI/CD patterns](https://continuousdelivery.com/implementing/patterns)
- [ ] [7 Pipeline Design Patterns for Continuous Delivery](https://www.singlestoneconsulting.com/blog/7-pipeline-design-patterns-for-continuous-delivery)

**Done when:** a commit to your repo reaches the cluster with no manual steps,
and a deleted cluster comes back from git.

### 2e. Observability foundations

**New to you, so this gets the full loop.** Prometheus comes here, not in the reliability phase, because you need telemetry
*before* you can do SLOs in Phase 3.

**Core**
- [ ] [Introduction to Prometheus](https://training.promlabs.com/training/introduction-to-prometheus/training-overview/introduction)
- [ ] [A Deep Dive Into the Four Types of Prometheus Metrics](https://www.timescale.com/blog/four-types-prometheus-metrics-to-collect)
- [ ] [How Prometheus Querying Works](https://www.timescale.com/blog/how-prometheus-querying-works-and-why-you-should-care)
- [ ] [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet): weekly drill material from here on
- [ ] [The four Golden Signals of Kubernetes monitoring](https://sysdig.com/blog/golden-signals-kubernetes)

**Go deeper**
- [ ] [Prometheus Relabeling Training](https://training.promlabs.com/training/relabeling/training-overview/prerequisites)
- [ ] [Avoid These 6 Mistakes When Getting Started With Prometheus](https://promlabs.com/blog/2022/12/11/avoid-these-6-mistakes-when-getting-started-with-prometheus)

**Done when:** Prometheus, Grafana, and Alertmanager run on real workloads in
the lab, deployed via GitOps, with at least one alert that has actually fired,
*and* you've added a dashboard or an alert at work for something that wasn't
monitored before.

### Gate to Phase 3
- [ ] CKA passed.
- [ ] Lab rebuilds from an empty cluster via GitOps in under 30 minutes.
- [ ] Observability stack running and alerting.
- [ ] Six posts published in total.
- [ ] Checklist D, E, G, and H ticked, plus the items in I not marked for a later phase.
- [ ] Go track: G3 done; your Go exporter runs in the lab via GitOps.
- [ ] System design: SD2 done; the observability stack had a design doc before it was built.

> **Optional job move.** Once you pass this gate, you are a credible candidate
> for Platform Engineer or SRE-titled roles (not only DevOps) in your *local or
> regional* market. If your current job doesn't give you room to grow into SRE
> work (on-call, SLOs, owning services, IaC), a move here speeds up every later
> phase more than any amount of lab time. See §10. If you move, keep the plan
> and continue from Phase 3.

---

## Phase 3: Building the Platform
**Effort budget: ~260 h**

Phase 2 gave you the parts. **Phase 3 is where you become a Platform Engineer**:
you turn those parts into a product that other engineers use without asking
you. The difference isn't tooling. It's that you now have users, you design
abstractions for them, and you measure whether their work got easier.

Your users are the developers at work. Talk to them before you build anything
(3a). Everything here is built in the lab first and, wherever you can, offered
to a real team at work. Rule 5 applies from now on: a build counts once someone
other than you has used it.

Work 3a and 3b together (theory evenings on platform thinking, Sunday builds in
Go), then 3c to 3f in order. Each one adds a capability to the same golden path.
By the end of this phase you should meet the mid-level bar in §3.

### 3a. Platform engineering as a discipline

**Core**
- [ ] [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/): the shortest good definition of what a platform is and what it offers
- [ ] [What I Talk About When I Talk About Platforms](https://martinfowler.com/articles/talk-about-platforms.html) by Evan Bottcher
- [ ] [Team Topologies](https://teamtopologies.com/book) by Matthew Skelton & Manuel Pais (book): platform teams, cognitive load, and interaction modes. Every platform interview uses its vocabulary.
- [ ] [Platform Engineering](https://www.oreilly.com/library/view/platform-engineering/9781098153632/) by Camille Fournier & Ian Nowland (book): the most practical book on building and running a platform team. Read all of it.
- [ ] [How We Use Golden Paths to Solve Fragmentation in Our Software Ecosystem](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem/) (Spotify)
- [ ] [CNCF Platform Engineering Maturity Model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/): re-score your workplace with it and compare against your Phase 0 audit
- [ ] [DORA](https://dora.dev): the four key metrics and the capabilities that drive them
- [ ] **Exercise:** interview three developers at work. Ask what slows them down,
  what they file tickets for, and what they never want to touch. Write it up in
  a Notion **Platform Users** page. Together with the Phase 0 platform audit, this is
  your backlog for the rest of the phase.

**Go deeper**
- [ ] [Mind the platform execution gap](https://martinfowler.com/articles/platform-prerequisites.html)
- [ ] [Platform Strategy](https://leanpub.com/platformstrategy) by Gregor Hohpe (book)
- [ ] [Accelerate](https://itrevolution.com/product/accelerate/) by Forsgren, Humble & Kim (book): the research behind DORA
- [ ] [The SPACE of Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124)
- [ ] [DevEx: What Actually Drives Productivity](https://queue.acm.org/detail.cfm?id=3595878)

**Done when:** you can say, in your own words, what your users need, which
interaction mode your team uses with each of them, and which number would tell
you the platform is helping.

### 3b. Go for the platform

This phase's Go work is level **G4** of the [Go Mastery Track](#go-mastery-track):
Cobra, client-go, API design, deeper testing, and releases. Here you apply it to
the platform itself.

- [ ] **Build: the platform CLI.** Start with `platform new-service <name>`, which
  creates a repo from your golden-path template (3c) and registers it in the
  catalog. Grow it with each topic: `platform tenant create` in 3d, and
  `platform status` showing a service's SLO in 3f. Tests, metrics, and releases
  from the first version.

**Done when:** the CLI runs against your lab, deployed and released through your
own pipeline, with metrics you use in an SLO (3f).

### 3c. Golden paths & self-service

The golden path is the platform's main product: the supported, easy way to get
an application to production. Build it as a plain template first. A portal is
the last thing you add, not the first.

**Core**
- [ ] [What is Backstage?](https://backstage.io/docs/overview/what-is-backstage), then the [software catalog](https://backstage.io/docs/features/software-catalog/) and [software templates](https://backstage.io/docs/features/software-templates/)
- [ ] [Diátaxis](https://diataxis.fr): a framework for documentation people actually use. Platform docs are part of the product.
- [ ] **Build: the golden path.** A template that takes an application from
  nothing to production in the lab: repo, CI pipeline, container image, GitOps
  manifests, dashboard, alerts, and an SLO attached. No tickets, and no help
  from you. Start with Copier or cookiecutter; put it behind Backstage only
  once it works.
- [ ] **Build: the catalog.** Every service in the lab has an owner, a runbook
  link, and its dashboards registered in one place.
- [ ] **Measure it.** Time from "I want a new service" to "it's serving traffic",
  before and after. That number is your first platform metric.

**Go deeper**
- [ ] [Platform Engineering on Kubernetes](https://www.manning.com/books/platform-engineering-on-kubernetes) by Mauricio Salatino (book)
- [ ] [Score](https://score.dev): a workload spec that hides the platform from developers. Useful for seeing what "the right abstraction" can look like.

**Done when:** someone other than you has created a service through your golden
path and got it to production without asking you a question.

### 3d. Multi-tenancy & policy

Once more than one team uses the platform, it has to keep them out of each
other's way, and keep each one inside safe limits, without anyone filing a ticket.

**Core**
- [ ] [Kubernetes multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/): the official overview of isolation models
- [ ] [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [ ] [Kyverno](https://kyverno.io/docs/introduction/) or [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/): pick one
- [ ] **Build: tenant onboarding by pull request.** One PR creates a namespace
  with quotas, limit ranges, default-deny network policies, RBAC, and policy
  defaults. Document the isolation model and its known gaps.
- [ ] **Guardrails, not gates.** Every policy you enforce must have an error
  message that tells the developer how to fix the problem.

**Go deeper**
- [ ] [vcluster](https://www.vcluster.com/docs): virtual clusters, for tenants that need more than a namespace
- [ ] [Capsule](https://projectcapsule.dev): a multi-tenancy operator

**Done when:** you can defend your isolation model against "what stops tenant A
from reading tenant B's secrets?" and "what happens when one tenant's pod tries
to use the whole node?"

### 3e. Security, secrets & supply chain

**Core**
- [ ] [Kubernetes security checklist](https://kubernetes.io/docs/concepts/security/security-checklist/)
- [ ] [External Secrets Operator](https://external-secrets.io/latest/) with [OpenBao](https://openbao.org/docs/) or [Vault](https://developer.hashicorp.com/vault/tutorials/get-started)
- [ ] [cert-manager](https://cert-manager.io/docs/)
- [ ] [SLSA](https://slsa.dev/spec/v1.0/about): supply-chain levels, the shared vocabulary
- [ ] [Sigstore](https://docs.sigstore.dev/): signing and verifying images with Cosign
- [ ] [Trivy](https://trivy.dev/): scanning images, IaC, and clusters
- [ ] **Build:** add security to the golden path. Images scanned and signed in
  CI, an SBOM published, signatures verified at admission, secrets pulled from
  the secret store, and SSO in front of every platform tool. No secret in git,
  ever, in plain text.

**Go deeper**
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems): where security meets reliability; asked about more and more at senior level
- [ ] [Falco](https://falco.org/docs/): runtime detection
- [ ] **CKS** (optional cert, §6)

**Done when:** you can walk an image from commit to running pod and name every
check that would stop a tampered one.

### 3f. Operating the platform: SLOs & incidents

The platform is a production system with its own users. If it's flaky, teams
route around it and your adoption number drops. This is where SRE practice
enters the plan. "How do you set an SLO?" comes up in almost every platform and
SRE interview.

**Core**
- [ ] [Implementing SLOs](https://sre.google/workbook/implementing-slos/): read it three times
- [ ] [Why bother with SLI and SLO?](https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo)
- [ ] [How NOT to Measure Latency](https://youtu.be/lJ8ydIuPFeU): percentiles and coordinated omission; watch it twice
- [ ] [Sloth](https://sloth.dev) or [Pyrra](https://github.com/pyrra-dev/pyrra): generate burn-rate alerts from an SLO spec instead of writing them by hand
- [ ] [Incident Response](https://response.pagerduty.com): the industry reference
- [ ] [Postmortems](https://postmortems.pagerduty.com)
- [ ] [The practical guide to incident management](https://incident.io/guide)
- [ ] [Runbooks](https://web.archive.org/web/20231005015754/https://www.transposit.com/devops-blog/itsm/what-makes-a-good-runbook)
- [ ] **Build: SLOs for the platform itself.** Golden-path pipeline success rate
  and duration, Argo CD sync health, API server and registry availability, and
  the SLO of your Go service, all with multi-window burn-rate alerts. Then make
  "an SLO out of the box" part of the golden path.
- [ ] **Build: the game-day habit.** From here until you're hired, break your lab
  on purpose once a month. Break the *platform*, not just an app: kill Argo CD,
  expire a certificate, fill the registry disk, OOM a pod, blackhole DNS,
  corrupt etcd. Run it as a real incident with a timeline, comms, and
  mitigation, then write the postmortem. **A dozen real postmortems is a
  portfolio almost no junior has.**

**Go deeper**
- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents) (the book): Part II "Principles" and the incident and postmortem chapters
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents)
- [ ] [Identifying and tracking toil using SRE principles](https://cloud.google.com/blog/products/management-tools/identifying-and-tracking-toil-using-sre-principles)
- [ ] [SRE Engagement Models](https://certomodo.substack.com/p/sre-engagement-models)
- [ ] [An Incident Command Training Handbook](https://blog.danslimmon.com/2019/06/24/an-incident-command-training-handbook)
- [ ] [Howie guide to post-incident investigations](https://www.jeli.io/howie/welcome)
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803) (book)

**Done when:** a burn-rate alert on a platform SLO has fired for real, three game
days have run with postmortems, and runbooks exist for the alerts that fired.

### Gate to Phase 4
- [ ] Golden path used end to end by someone other than you.
- [ ] Tenant onboarding by pull request, with quotas, network policies, and policy defaults.
- [ ] Signed, scanned images verified at admission; no plain-text secrets in git.
- [ ] Platform SLOs published, with a burn-rate alert that has fired for real.
- [ ] At least three postmortems written, and the monthly game day is now a habit.
- [ ] Go track: G4 done; the platform CLI is used by someone other than you.
- [ ] System design: SD3 done; golden path and tenancy design docs reviewed by someone else.
- [ ] Checklist I, J, and K ticked, plus C and L except items marked *(Phase 5)*.
- [ ] You meet most of the mid-level rubric in §3, with evidence.
- [ ] Nine posts published in total.

---

## Phase 4: The Platform on AWS
**Effort budget: ~140 h**

By now you have built a platform on hardware you control: Kubernetes,
Terraform, GitOps, a golden path, tenancy, and SLOs. This phase **moves that
platform onto AWS**, then uses the cloud's APIs to give tenants more
self-service. It is short because you're translating what you know, not
learning it from scratch. It also tests your Phase 3 abstractions: app teams
shouldn't notice the move.

### Cost guardrails (do these first)
- [ ] Billing alarm and an AWS Budget with email alerts, set on day one.
- [ ] Everything created by Terraform, and `terraform destroy` at the end of every session.
- [ ] Prefer the smallest instance types and tear down EKS when you aren't using it.
  Most of this phase costs little if you're disciplined, and a lot if you forget one NAT gateway.

### 4a. AWS fundamentals & SAA-C03

Book the exam when you start this topic. A paid slot is the one deadline worth
having.

**Core**
- [ ] [The Open Guide to Amazon Web Services](https://github.com/open-guides/og-aws): the best non-marketing AWS resource there is
- [ ] Official SAA-C03 exam guide + one video course + one practice-exam bank
- [ ] Build every core service by hand once, then again in Terraform: VPC/subnets/route tables, EC2, S3, IAM, RDS, ALB, ASG, CloudWatch
- [ ] **Map AWS onto your on-prem world.** Write an **On-prem vs AWS** page in Notion: your
  S3-compatible store vs. real S3 (consistency, durability, storage classes);
  your physical network vs. VPC; your hypervisor vs. EC2 placement. This
  comparison makes a strong interview story, because most candidates only know
  one side of it.
- [ ] **SAA-C03 exam passed** 🎯

**Done when:** exam passed and the on-prem vs. AWS note is published as a post.

### 4b. Your platform, on AWS

- [ ] [Getting Started With Terraform on AWS](https://spacelift.io/blog/terraform-tutorial)
- [ ] **Build:** stand up EKS with Terraform (remote state in S3, locking, separate
  `dev`/`prod` workspaces or directories), then point your *existing* GitOps
  repo at it. The same platform, the same SLOs, a different substrate.
- [ ] Add CI for the Terraform: `plan` on pull request, `apply` on merge, and a
  scheduled drift-detection job.
- [ ] Write a cost model: what each environment costs per month and why.

**Done when:** your lab platform comes up on AWS from git, and you can tear it
down and rebuild it in one sitting.

*Awareness only. Don't study these; just know they exist and that the concepts transfer:*
- [ ] [Learning Azure](https://docs.microsoft.com/en-us/learn/azure/)
- [ ] [Hands-On Training with GCP](https://cloud.google.com/training/badges)

### 4c. Infrastructure as APIs & cost

On a mature platform, developers don't write Terraform. They ask the platform
for "a bucket" or "a database" and get one with the guardrails already applied,
and they can see what it costs.

**Core**
- [ ] [Crossplane concepts](https://docs.crossplane.io/latest/concepts/): providers, managed resources, compositions
- [ ] [Karpenter](https://karpenter.sh/docs/): node autoscaling for EKS
- [ ] [FinOps Framework](https://www.finops.org/framework/)
- [ ] [OpenCost](https://www.opencost.io/docs/)
- [ ] **Build:** a Crossplane composition (or your own thin API) that gives a
  tenant an encrypted, tagged S3 bucket with IAM scoped to their workload
  identity, requested from the golden path.
- [ ] **Build:** cost per tenant. Tag everything, run OpenCost, and show each
  team what it spends.

**Done when:** a tenant can request cloud infrastructure through the platform
without writing Terraform, and see what it costs.

### Gate to Phase 5
- [ ] SAA-C03 passed.
- [ ] Platform running on EKS from the same GitOps repo.
- [ ] Terraform CI with drift detection working.
- [ ] Cost model written, with cost per tenant.
- [ ] A tenant gets a bucket through the platform without writing Terraform.
- [ ] Checklist N ticked, plus the Phase 4 items in G.
- [ ] Go track: G5 done; your Terraform provider plans, applies, and imports.
- [ ] System design: SD4 done; DR drill run against your design's RTO.

---

## Phase 5: Depth & Convergence
**Effort budget: ~290 h** (~170 h for 5a–5d, ~120 h for Rust in 5e)

This is the phase that makes you look senior. Phases 1–4 gave you a platform
that runs on-prem and in the cloud. Phase 5 goes under it and around it:
extending Kubernetes itself, designing systems out loud, offering stateful
services through the platform, and proving the platform survives failure.

Keep Back to Basics Saturday going. By now it should be in modules B5 and B6
(databases and distributed systems), which pair directly with 5b and 5c.

### 5a. Extending Kubernetes: the operator

Reconciliation loops are the deepest idea in the ecosystem, and the main tool a
platform team has for turning a runbook into an API.

**Core**
- [ ] [The Kubebuilder Book](https://book.kubebuilder.io): do the CronJob tutorial end to end first
- [ ] [Programming Kubernetes](https://www.oreilly.com/library/view/programming-kubernetes/9781492047094/) by Hausenblas & Schimanski (book): informers, work queues, and client-go, explained
- [ ] **Build:** a Kubernetes **operator** with kubebuilder / controller-runtime that
  solves a real problem in your lab, ideally one that replaces a manual step a
  tenant asks you for today.
- [ ] Instrument it with OpenTelemetry: metrics, logs, traces.
- [ ] *Go deeper:* write a Prometheus exporter for something in your lab (or your
  on-prem object storage) that doesn't have one.

**Done when:** the operator runs in your cluster, has tests, and has a README
that explains the reconcile design and its failure modes.

### 5b. Distributed systems & architecture

The main-track side of System Design level **SD5**. The building blocks are
already covered in SD1–SD2; this topic is about what happens between them.

**Core**
- [ ] [Distributed systems](http://book.mixu.net/distsys/single-page.html): start here; short and dense
- [ ] [Failover](https://blog.alexewerlof.com/p/failover)
- [ ] [The principles of extreme fault tolerance](https://planetscale.com/blog/the-principles-of-extreme-fault-tolerance)

**Go deeper**
- [ ] [Monoliths, Service Architecture, and Microservices](https://architecturenotes.co/granularity-of-systems)

**Done when:** you can run a 45-minute design session out loud (an internal
developer platform for 300 engineers, a multi-tenant metrics pipeline, a CI
system, an object store) and volunteer the users, SLIs, failure modes, and
rollout plan without being asked.

### 5c. Data services on the platform

Stateful systems are where reliability gets genuinely hard, and where most
candidates are weakest. Being the platform engineer who can offer databases
safely, as a service, is a big advantage.

**Core**
- [ ] [Things You Should Know About Databases](https://architecturenotes.co/things-you-should-know-about-databases)
- [ ] [How do database indexes work?](https://planetscale.com/blog/how-do-database-indexes-work)
- [ ] [ACID vs BASE in Databases](https://medium.com/geekculture/acid-vs-base-in-databases-1bcad774da26)
- [ ] [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem): know its real limits, and why PACELC is the better framing
- [ ] [Database Replication](https://galeracluster.com/library/documentation/tech-desc-introduction.html#database-replication)
- [ ] [Database Sharding](https://planetscale.com/blog/database-sharding)
- [ ] **Build:** run PostgreSQL with a replica in the lab. Kill the primary,
  promote the replica, and measure how much data you lost and how long it took.
- [ ] [CloudNativePG](https://cloudnative-pg.io/documentation/current/)
- [ ] **Build: databases as a service.** A tenant asks for a PostgreSQL cluster
  from the golden path and gets one, with backups to your object store, metrics,
  and a restore drill you have timed.

**Go deeper**
- [ ] [7 Database Paradigms](https://youtu.be/W2Z7fbCLSTw)
- [ ] [SQL vs. NoSQL Database: When to Use, How to Choose](https://www.ml4devs.com/en/articles/datastore-choices-sql-vs-nosql-database/)
- [ ] [Understanding Database Sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)
- [ ] [Database Sharding Explained](https://architecturenotes.co/database-sharding-explained)
- [ ] [Redis Explained](https://architecturenotes.co/redis)
- [ ] [Kafka 101](https://highscalability.com/untitled-2)
- [ ] [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html): how schema changes ship without downtime

**Done when:** you can explain your failover's RPO and RTO with measured numbers,
and a tenant has created a database through the platform without your help.

### 5d. Reliability & performance depth

**Core**
- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808) by Brendan Gregg. **After the Google SRE book, the most important book in this repository.** Core: the methodology, CPU, memory, file systems, and network chapters. Treat the rest as reference.
- [ ] Chaos engineering with real hypotheses: a steady-state metric, a blast
  radius, and abort conditions. Not "randomly kill pods."
- [ ] Multi-AZ failover on AWS: write the runbook, then test it.

**Go deeper**
- [ ] Capacity planning with actual load tests and headroom modelling.
- [ ] Progressive delivery: automated canary analysis tied to your SLIs.
- [ ] Contribute to one CNCF project. Issues, reviews, and docs count; one real code change is the goal.
- [ ] [Systems Performance: Enterprise and the Cloud](https://www.amazon.com/Systems-Performance-Enterprise-Brendan-Gregg/dp/0133390098) (1st edition; only if you can't get the 2nd)

**Done when:** you've used the USE method on a real problem, at work or in the
lab, and written it up; and a chaos experiment and a multi-AZ failover have both
run against a stated hypothesis.

### 5e. Rust: the specialization

**Why Rust, and why here.** Rust keeps moving into the infrastructure layer:
proxies (Linkerd's data plane, Cloudflare's Pingora), observability pipelines
(Vector), VM and container runtimes (Firecracker, Bottlerocket), and eBPF
tooling. Go is still the main language for Platform and SRE work, so Rust
doesn't replace it. It's the differentiator: far fewer infrastructure engineers
know it, which means less competition and often better offers for the roles
that need it.

It comes after Go on purpose. Learning two new languages at once is a trap, and
Rust is much easier once you've already written production Go and done the
Back to Basics C and OS modules. Ownership and borrowing make sense when you
already know what the stack, the heap, and a data race are.

> **Honest trade-off:** this topic adds ~120 hours. If the pace check says you're
> behind the 3-year cap, Rust is the first topic to move to *after you're hired*.
> It's a specialization, not a foundation.

**Core**
- [ ] [The Rust Programming Language](https://doc.rust-lang.org/book/) ("the Book"): read it all, doing the exercises. Chapters 4 (ownership), 10 (generics, traits, lifetimes), and 16 (concurrency) are the ones to read twice.
- [ ] [Rustlings](https://github.com/rust-lang/rustlings): small exercises alongside the Book; this is where the borrow checker stops feeling hostile
- [ ] [Command Line Applications in Rust](https://rust-cli.github.io/book/)
- [ ] [Tokio tutorial](https://tokio.rs/tokio/tutorial): async Rust, which nearly every infrastructure project uses
- [ ] **Build 1:** rewrite your Phase 1 Go tool in Rust with `clap`, `serde`, and proper error handling. Compare the two versions in a post.
- [ ] **Build 2:** a Prometheus exporter in Rust (`tokio` + `axum`) for something in your lab or your on-prem object storage, deployed to your cluster via GitOps.

**Go deeper**
- [ ] [Rust by Example](https://doc.rust-lang.org/rust-by-example/): reference while you build
- [ ] [Comprehensive Rust](https://google.github.io/comprehensive-rust/): Google's internal course, a fast second pass
- [ ] [kube-rs](https://kube.rs): rewrite a small piece of your Go operator as a Rust controller. "The same operator in Go and Rust" is a strong post.
- [ ] [Aya](https://aya-rs.dev/book/): eBPF in Rust. Tracing syscalls or packets on your own nodes combines Phase 1 internals with Rust, and very few candidates can show it.
- [ ] [Zero To Production in Rust](https://www.zero2prod.com) (book): building and operating a production Rust service
- [ ] [Rust Atomics and Locks](https://marabos.nl/atomics/) (free online): low-level concurrency, for when you want real depth

**Done when:** the Rust exporter runs in your cluster with tests and a README,
and you can explain ownership, borrowing, and lifetimes to someone who knows Go.

### Gate to Phase 6
- [ ] Operator running.
- [ ] A tenant can get a database through the platform, with tested restores.
- [ ] Rust exporter running (or Rust formally moved to post-hire in a quarterly review).
- [ ] 12+ posts published.
- [ ] System design: SD5 done; 30+ designs in the journal.
- [ ] Back to Basics: NeetCode 150 done and modules B1–B6 core done.
- [ ] Go track: G6 done, with a profiling post published.
- [ ] Checklist F, M, and O ticked, and the rest of L. Every other domain ticked or consciously parked.
- [ ] You meet most of the senior rubric *in evidence*, even if not yet in title.

---

## Phase 6: Market Entry
**Effort budget: ~70 h of prep, then the campaign**

This phase is a **campaign**, not a curriculum. The engineering is done; now you
turn it into offers. Keep the weekly SadServers scenario and the monthly game day
going so you stay sharp, but move most of your hours to interviewing,
applications, and outreach.

### 6a. System design interview practice

Design is the highest-weight round for mid-to-senior SRE and Platform roles.
Practise **out loud, timed, on a whiteboard**. Reading solutions builds false
confidence: people fail these rounds on communication, not knowledge.

This is System Design level **SD6**. If the track ran every week, you arrive
here with 40+ designs in the journal; this topic turns them into interview
performance with mock interviews and the prompts below.

- [ ] [Crack the System Design Interview](https://tianpan.co/notes/2016-02-13-crack-the-system-design-interview)
- [ ] [System design interview for IT companies](https://github.com/checkcheckzz/system-design-interview)
- [ ] [Designing WhatsApp](http://highscalability.com/blog/2022/1/3/designing-whatsapp.html)
- [ ] [Designing Uber](http://highscalability.com/blog/2022/1/25/designing-uber.html)
- [ ] [Designing Tinder](http://highscalability.com/blog/2022/1/17/designing-tinder.html)
- [ ] [Designing Instagram](http://highscalability.com/blog/2022/1/11/designing-instagram.html)
- [ ] [Designing Netflix](http://highscalability.com/blog/2021/12/13/designing-netflix.html)
- [ ] **The platform twist:** platform loops ask their own design questions:
  "design a deployment platform for 200 engineers", "how would you move 80
  services onto Kubernetes?", "how do you know your platform is working?".
  Start from the users and their cognitive load, then the abstractions and the
  escape hatches, then adoption and its metrics.
- [ ] **The SRE twist:** you'll often be asked to design *and then operate* the
  system. Always volunteer the SLIs, the failure modes, the deployment strategy,
  and the on-call story. That, plus the platform twist, is what separates your
  answer from a generic backend answer.

### 6b. Coding & algorithms (final polish)

Back to Basics Saturday has done the groundwork, so this is polish, not
learning: timed mock interviews, talking while you code, and company-specific
question lists for the places you're applying to.

SRE coding rounds are usually gentler than SWE rounds. Expect practical
manipulation, parsing, and concurrency more often than dynamic programming. The
bar at large companies is still real, though, and Google-style SRE loops ask
proper algorithm questions.

- [ ] [Hacking a Google Interview – Handout 1](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_1.pdf)
- [ ] [Hacking a Google Interview – Handout 2](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf)
- [ ] [Hacking a Google Interview – Handout 3](http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_3.pdf)
- [ ] [AlgoExpert](https://www.algoexpert.io) or LeetCode company tags for your target list
- [ ] At least five timed mock interviews with another person, out loud, coding in Go
- [ ] Go track G7: keep it running during the campaign. A merged upstream Go PR is a strong line to bring to every interview.

### 6c. Domain interview prep

- [ ] [A collection of questions to practice with for SRE interviews](https://github.com/michael-kehoe/sre-interview)
- [ ] [SRE Interview Questions](https://syedali.net/engineer-interview-questions)
- [ ] [Questions I ask in SRE interviews](https://dev.to/logan/questions-i-ask-in-sre-interviews-a9j)
- [ ] [Kubernetes job interview questions](https://enterprisersproject.com/article/2019/2/kubernetes-job-interview-questions-how-prepare)
- [ ] [The Must-Know Terraform Interview Questions](https://devopsknowledge.hashnode.dev/the-must-know-terraform-interview-questions)
- [ ] [DevOps Guide](https://github.com/Tikam02/DevOps-Guide)
- [ ] [DevOps Roadmap: Learn to become a DevOps Engineer or SRE](https://roadmap.sh/devops): use only to check for gaps
- [ ] **The platform walkthrough.** A 10-minute tour of your platform: a golden
  path demo, the architecture, the metrics, and what you would change. Many
  platform loops include a "tell us about something you built" deep dive; this
  is your answer. Rehearse it out loud until it fits in 10 minutes.

### 6d. Process, positioning & narrative

- [ ] [SRE Complete Resume Writing Guide](https://rootly.com/blog/sre-complete-resume-writing-guide)
- [ ] [Preparing the SRE interview](https://blog.balthazar-rouberol.com/preparing-the-sre-interview)
- [ ] [How to Get Into SRE](https://blog.alicegoldfuss.com/how-to-get-into-sre)
- [ ] [How to Get an SRE Role](https://certomodo.substack.com/p/how-to-get-an-sre-role)
- [ ] [How to hire talent](https://syedali.net/2014/04/01/how-to-hire-talent): read it from the hiring side; it changes how you present yourself

*Go deeper:*
- [ ] [Recruitment process for a Google job (SRE, Site Reliability Engineer)](https://web.archive.org/web/20220328124724/http://lambda-startup.com/recruitment-process-for-a-google-job-sre-site-reliability-engineer)
- [ ] [SRE Interviews in Silicon Valley](http://blog.marc-seeger.de/2015/05/01/sre-interviews-in-silicon-valley)
- [ ] [My Job Interview at Google](https://catonmat.net/my-job-interview-at-google)
- [ ] [How I get a job at Google as SRE](https://fabrizio2210.medium.com/how-i-get-a-job-at-google-as-sre-83d44aef7859)
- [ ] [Becoming a Site Reliability Engineer](https://www.tik.dev/blog/becoming-an-sre)
- [ ] [Path to Site Reliability Management](https://danrl.com/srm)
- [ ] [Become A DevOps Engineer in 2023: Detailed Guide](https://devopscube.com/become-devops-engineer)
- [ ] [DevOps Career Path](https://www.scaler.com/blog/devops-career-path/)
- [ ] [Key DevOps Engineer Skills You Need in 2024](https://www.scaler.com/blog/devops-engineer-skills/)

### 6e. Campaign mechanics

- **Write 8–10 STAR stories** before applying, drawn from real incidents at work,
  your postmortems, your platform users, and the migrations you led. Every behavioural question is a remix
  of these. Rehearse them out loud.
- **Application funnel.** For an international relocation search, expect roughly
  100 applications → 20 screens → 8 loops → 2–3 offers. Track it in a sheet.
  Low conversion at any stage is a bug in that stage, not a verdict on you.
- **Never interview at your top choice first.** Order companies deliberately:
  three practice loops before the ones you care about.
- **Negotiate.** Always. For relocation roles, negotiate the whole package:
  relocation allowance, visa costs for dependants, temporary housing, and the
  start date.

---

## 6. Certification Track

Certifications won't make you a good engineer. They *will* get a CV past
non-technical screening, which matters a lot for international applications
where nobody knows your employer.

| Cert | When | Why |
|---|---|---|
| **CKA** | Phase 2 | Hands-on and respected. The single best cert for Platform and SRE hiring. |
| **AWS Solutions Architect Associate** | Phase 4 | Opens cloud roles and complements your on-prem background. Much easier after Phases 1–3. |
| CKS | Phase 3 (optional) | Kubernetes security, hands-on. Fits the platform security work in 3e. |
| Terraform Associate | Phase 4 (optional) | Cheap, quick, often listed in EU job ads. Only if a target role asks for it. |
| CNPA or Backstage (CBA) | Phase 3 (optional) | The Linux Foundation's platform engineering certs. New, so check that your target employers actually list them before paying. |

**Two required, the rest optional.** Pick at most one optional cert. Past a
handful of certs, each extra one signals *studying* rather than *building*, and
reviewers read it that way.

---

## 7. Portfolio: The Seven Artifacts

These carry your job search. Each lives in a public repo with a README that
explains the design decisions and tradeoffs. **The README is the artifact**,
because it's what a hiring manager actually reads.

| # | Artifact | Built in |
|---|---|---|
| 1 | **The lab**: VM/bare-metal Kubernetes, fully IaC-managed, rebuildable from zero | Phases 0–2 |
| 2 | **Observability as a service**: Prometheus, Grafana, Alertmanager, tracing, with dashboards, alerts, and an SLO given to every new service by default | Phases 2–3 |
| 3 | **The platform**: golden path, catalog, tenant onboarding by PR, policy as code, a signed supply chain, and a README written for its users, with the adoption and time-to-first-deploy numbers | Phase 3 |
| 4 | **The postmortem collection**: a dozen real write-ups from platform game days. Rare, cheap to produce, and instantly credible | Phase 3 onward |
| 5 | **The platform on AWS**: the same platform on EKS, Terraform CI with drift detection, Crossplane self-service, cost per tenant, and your own Terraform provider in Go | Phase 4 |
| 6 | **The operator & data service**: a Go controller solving a real problem, and databases as a self-service platform feature | Phase 5 |
| 7 | **The Rust tool**: the exporter (and optionally an eBPF or kube-rs project), with a README comparing it to the Go version | Phase 5 |

---

## 8. Public Visibility

You're competing against candidates with recognizable employers on their CVs.
Public work is how you close that gap, and for remote and relocation hiring it
often generates the inbound interest in the first place.

- **One post per completed topic**, from Phase 1 onward. That comes to roughly
  15–20 posts over the plan. Write about what you just learned while the
  confusion is still fresh; that's what makes a post useful to others and
  memorable to you.
- **The best posts are about specific failures.** "Why our page cache filled up
  and what I learned about `vm.dirty_ratio`" does far better than "Introduction
  to Kubernetes". Nobody needs another intro post.
- **One talk** at a local meetup, online, or an internal brown-bag, from Phase 3
  onward. It's worth more credibility than ten posts. Nice to have; it doesn't block a gate.
- **Open source** from Phase 5. Issues, reviews, and docs count, not only code.
  CNCF platform projects (Backstage, Crossplane, Argo, Kyverno) are welcoming
  places to start, and their maintainers hire.
- **LinkedIn**, in English, updated with each artifact. Recruiters for EU
  relocation roles search it directly, so it's the highest-return hour per month
  in the whole plan.

---

## 9. Growing Your DevOps Job Into Senior Experience

Your day job is the most valuable part of this plan. The lab teaches you how
things work; only a real job gives you *scope*: real users, real outages, real
organizational friction. Senior interviews are mostly about scope. And your
on-prem setup is an asset: cloud-only engineers never learn what a failure
domain physically *is*.

The shift to make, in parallel with whatever phase you're in, is from **doing
the tickets** to **building the thing that makes the tickets unnecessary**:

- **Find your users.** The developers at work are your platform's customers.
  Talk to them, keep the Phase 0 list of their top requests up to date, and
  notice which ones repeat.
- **Kill one ticket queue.** Pick the most common request (a namespace, a
  pipeline, a bucket, a DNS record) and turn it into self-service through git or
  a template. "Removed ~40 tickets a month" is a CV line. "Wrote Ansible
  playbooks" is not.
- **Measure one developer-experience number.** Lead time, pipeline duration, or
  time to first deploy. Measure it for a month, present it, then move it. You
  don't need permission to measure something.
- **Introduce one SLO**, for a platform component: the CI system, the
  registry, the cluster API. Same rule: measure first, then present the number.
- **Volunteer for on-call and for incident write-ups.** Nothing builds
  judgment faster. Then quietly raise the standard of the postmortems.
- **Own the object storage story.** You already run S3-compatible storage on
  bare metal: durability, replication, capacity, failure modes. Very few
  candidates can speak to that. Go deep, make it your specialty, and offer it
  to teams as a platform service with quotas and self-service buckets.
- **Own one thing end to end.** A cluster, the pipeline platform, or the storage
  service: its upgrades, its alerts, its capacity, its documentation, its
  users. "I owned X" is a much stronger interview story than "I worked on X".
- **Lead one migration.** Moving teams to a new pipeline template, a new
  cluster, or GitOps against real organizational friction is exactly the
  "influence without authority" story senior interviews probe for.
- **Bring each phase to work.** Every topic in this plan has an "at work"
  version: a Terraform module, a new alert, a golden-path template, a policy, a
  Go tool. Lab work proves you learned it; work proves you can apply it.
- **Keep an evidence log.** The Notion **Work Log** database, updated weekly: what broke,
  what you built, who used it, what it saved. You won't remember any of it two
  years from now, and this log is where your CV and STAR stories come from.
- **Write things others use.** A design doc, an onboarding guide, a platform
  README, a runbook the whole team follows. Written work that changes how others
  operate is one of the clearest senior signals.

---

## 10. Market Strategy: EU & Remote

> ⚠️ Immigration rules and salary thresholds change every year. Everything below
> is orientation, not legal advice. **Re-verify it against official government
> sources when you start Phase 5**, which is when it becomes actionable.

### What to search for
Lead with **Platform Engineer**, and also search for *Developer Platform*,
*Infrastructure Engineer*, *Cloud Platform Engineer*, and *Developer
Productivity / Developer Experience*. Go appears in most of these ads; your
public Go repos and upstream PRs are the evidence. SRE and senior DevOps roles are the second
door: the same plan qualifies you for them, so apply to the good ones. Read the
ad for the work, not the title. "Platform" sometimes means "the ops team,
renamed"; look for words like *self-service*, *golden path*, *internal
customers*, or *developer experience*.

### Germany: EU Blue Card
The most accessible EU route for experienced engineers. You need a job offer
above an annually set salary threshold, with a lower threshold for shortage
occupations (IT qualifies). Germany also has a route for **IT specialists
without a formal degree** who can show several years of relevant professional
experience; check it carefully against your own situation. It leads to
permanent residence in a few years, faster with German at B1.

### Netherlands: Highly Skilled Migrant
You need an offer from an **IND-recognized sponsor** (most large tech employers
are), above a monthly salary threshold that varies by age bracket. It's fast and
predictable when the employer is already a sponsor, so filter your applications
by sponsor status early. English-language workplaces are the norm.
*(The DAFT route you may have read about is only open to US nationals, so it
doesn't apply here.)*

### Ireland: Critical Skills Employment Permit
Platform, SRE, and DevOps roles fall under the ICT occupations on the critical skills list. The salary threshold is
lower for listed occupations and higher otherwise. It's English-speaking and has
a large cluster of US tech EMEA headquarters, which overlaps strongly with the
companies most likely to recognize your skill set.

### Using Rust in the search
Search for **Rust + infrastructure / platform / SRE** specifically, not just
"Rust developer": companies building proxies, CDNs and edge networks, databases,
observability pipelines, and cloud runtimes. These roles get fewer qualified
applicants, so a Rust exporter plus solid platform fundamentals stands out. Lead
with platform engineering in your CV and use Rust as the differentiator; most of
your offers will still come from Go and Kubernetes roles.

### Remote-first / US contract
Highest bar and highest ceiling. Realistically a **Phase 6 target**:
remote-first companies hire senior people almost exclusively because they can't
absorb the mentoring load. What actually gets you in is a strong public
portfolio, excellent written communication (async work is writing), overlapping
hours with the team, and a clean contractor/invoicing setup.

### What to do, and when (by phase, not by date)
- **Phases 0–2:** build skills and grow scope at your current job. Don't apply
  internationally. Applying while underqualified burns companies you'll want later.
- **After the Phase 2 gate (optional):** if your current job has stopped giving
  you room to grow, a *local or regional* move into a Platform or SRE-titled role
  is worth taking. Stronger teams and on-call ownership speed up everything
  after it and make the international campaign much stronger. Continue the plan
  from where you are.
- **Phases 3–4:** start a passive presence. LinkedIn in English, open to work
  *quietly*, and take recruiter calls purely to learn what the market asks for.
  It's free market research with zero risk.
- **Phase 5:** talk to engineers who have already made this move. Ask about
  the parts nobody writes down: tax, housing, banking, the first six months.
- **Phase 6:** run the campaign in Phase 6 (6e).

### Two things worth knowing early
- **English is a technical skill in this plan.** Interviews, design discussions,
  and async writing are all in English. If your speaking lags your reading, fix
  it deliberately: record yourself explaining a design for 10 minutes a week.
  It's cheap and it compounds.
- **Salary anchoring.** When an EU or US company asks for your expectations,
  answer with the *local market range for the role*, never with a conversion
  from your current salary. Research the range before the first call.

---

## 11. The Quarterly Review

90 minutes, last Sunday of each quarter. The review is a fixed cadence, not a
deadline. Write the answers into a new page in the Notion **Reviews** database, titled `YYYY-QN`.

1. Which artifacts actually shipped this quarter? (Reading doesn't count.)
2. Hours logged this quarter, and hours per week on average. If below 8, what
   changed structurally?
3. **Pace check:** hours used vs. budgeted for completed phases, and months
   elapsed vs. the 3-year cap. Is the cap still realistic at this rate?
4. Where am I against the §3 rubric, with evidence rather than vibes?
5. What did I learn that changed my mind about something?
6. What am I avoiding because it's hard? (Usually the highest-value item.)
7. What goes into **Parked** so I can move on?
8. **Back to Basics:** which module am I on, how many problems did I solve,
   and which patterns still trip me up? Did any Saturday get skipped for the build?
9. **Users:** who used something I built this quarter, at work or in the lab,
   and what did they say? Which platform number moved?
10. **Checklist:** how many items moved from Gap or Use to ticked?
11. **Go:** which level am I on, did every week have a Go evening, and what Go
    did I read this quarter that I couldn't have read a quarter ago?
12. **System design:** which level am I on, how many katas and design docs went
    into the journal, and which of the five questions do I keep skipping?

**Re-planning is expected.** A multi-year plan that survives contact with reality
unchanged wasn't a plan, it was a fantasy. Change scope deliberately at these
reviews, and only at these reviews, never mid-quarter when you're tired on a
Tuesday.

---

## 12. How This Plan Fails

The realistic failure modes, roughly in order of likelihood. Re-read this list
at every quarterly review and check honestly whether you're living one of them.

1. **Resource collecting.** Bookmarking, watching tutorials, and ticking boxes
   without building. The checkboxes in this file are a trap if the artifacts
   don't exist. **This is by far the most common outcome.**
2. **Drift without deadlines.** Self-paced plans don't fail loudly. They
   stretch: one topic takes three months "because it's interesting," and the
   2-year plan quietly becomes 5. The defences are the hours log, the stall
   rule, and the **Parked** database. Use them.
3. **Reading all of *Go deeper*.** It exists so you have somewhere to go when a
   topic hooks you, not as a to-do list. Core plus the build is enough to pass
   every gate.
4. **Tool chasing.** Every quarter brings a new CNCF project. The Phase 1
   fundamentals will still be true in ten years; most of today's tools won't.
5. **Burnout in the second year.** Prevented by deload weeks and by shipping
   things you can see. Slowing down beats stopping.
6. **Breadth without depth.** Three clouds and no ability to debug a stalled TCP
   connection. Depth is what gets hired at senior level.
7. **Silence.** Doing all the work and telling nobody. Without public evidence,
   an international employer has no way to judge what you're worth.
8. **Skipping what you think you know.** Using Kubernetes every day is not the
   same as understanding it. The **Prove it** tests exist so you skip only what
   you can actually explain. If you wave through a Prove it test, you'll find the
   gap in an interview instead.
9. **Dropping Saturdays.** When a phase gets exciting, Back to Basics is the
   first thing to go, because nothing breaks if you skip it for a month. Then
   you're two years in, rusty on algorithms, and cramming before interviews.
   Protect the Saturday.
10. **Portal first.** A Backstage instance with nothing behind it is the most
   common platform-engineering failure, in companies and in portfolios. Build the
   golden path and the self-service first; the UI comes last, if at all.
11. **Building for yourself.** A platform designed without talking to its users
   solves the platform team's problems, not theirs. If no one else has used a
   build, it doesn't count yet (rule 5).
12. **Go stuck at tutorial level.** Finishing courses while every real build
   quietly falls back to Bash or YAML. If a quarter passes without new Go in a
   repo, the Go evening has turned into reading. Rule 6 exists for this.
13. **Reading designs instead of doing them.** Watching walkthroughs and reading
   other people's answers feels like progress and builds nothing. If the
   journal didn't grow this month, the design evening has turned into reading.
   Do the kata first, then read the reference.
14. **Waiting to feel ready.** You won't feel ready. Mid-level candidates who
   apply beat senior-capable candidates who don't. **Start Phase 6 when its gate
   passes, or at month 30, whichever comes first**, whether or not every box is ticked.

---

## Appendix: Reference Library

Kept out of the phase flow because you consult these rather than read them through.

### Core books
- [ ] [UNIX and Linux System Administration Handbook (5th Edition)](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554): Phase 1
- [ ] [Linux Pocket Guide, 3rd Edition](http://shop.oreilly.com/product/0636920040927.do): desk reference
- [ ] [TCP/IP Illustrated, Volume 1](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313): Phase 1 reference
- [ ] [Linux Kernel Development (3rd Edition)](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468): Phase 1 stretch
- [ ] [The Go Programming Language](https://www.gopl.io): Go track G1–G3
- [ ] [Learning Go, 2nd Edition](https://www.oreilly.com/library/view/learning-go-2nd/9781098139285/): Go track G1
- [ ] [Concurrency in Go](https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/): Go track G3
- [ ] [100 Go Mistakes and How to Avoid Them](https://100go.co): Go track G6
- [ ] [Efficient Go](https://www.oreilly.com/library/view/efficient-go/9781098105709/): Go track G6
- [ ] [Team Topologies](https://teamtopologies.com/book): Phase 3
- [ ] [Platform Engineering](https://www.oreilly.com/library/view/platform-engineering/9781098153632/) (Fournier & Nowland): Phase 3
- [ ] [Accelerate](https://itrevolution.com/product/accelerate/): Phase 3
- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents): Phase 3
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents): Phase 3
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803): Phase 3
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems): Phase 3
- [ ] [Programming Kubernetes](https://www.oreilly.com/library/view/programming-kubernetes/9781492047094/): Phase 5
- [ ] [Designing Data-Intensive Applications](https://dataintensive.net): Back to Basics B6 and Phase 5
- [ ] [System Design Interview, Volume 1](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF): System Design SD1–SD2
- [ ] [Understanding Distributed Systems](https://understandingdistributed.systems): System Design SD5
- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808): Phase 5, slowly

### Standing drills
| Drill | Cadence | Phases |
|---|---|---|
| [SadServers](https://sadservers.com) scenario, timed | Weekly | 1 → 6 |
| [This Week in Rust](https://this-week-in-rust.org), skim | Weekly | 5 → forever |
| [PromQL](https://promlabs.com/promql-cheat-sheet) queries against live data | Weekly | 2 → 6 |
| Game day / deliberate breakage + postmortem | Monthly | 3 → 6 |
| Talk to a platform user (at work or a lab tester) | Monthly | 3 → forever |
| Post per completed topic | Per topic | 1 → 6 |
| Go evening: current Go level + reading real Go source | Weekly | 0 → forever |
| Design evening: SD reading (odd weeks) or a timed design kata (even weeks) | Weekly | 0 → forever |
| Back to Basics: CS module + 2–3 LeetCode (in Go) | Weekly (Saturday) | 0 → forever |
| Stay current: newsletters, talks, public postmortems | Monthly (last Saturday) | 0 → forever |
| Hours log | Every session | 0 → 6 |
| Quarterly review | Quarterly | 0 → 6 |

---

## Credits

The original resource collection in this repository comes from the
community-maintained SRE interview preparation lists. The platform focus,
checklist, phasing, cadence, rubric, and strategy are personal to this plan, which assumes a working DevOps
engineer as the starting point. If you fork it, re-derive the effort budgets for
your own starting point rather than adopting these.
