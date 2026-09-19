# From DevOps Engineer to Senior SRE / Platform Engineer

> **Owner:** Mohamed Abdelazem
> **Started:** September 2026 · **Target:** 2 years · **Hard cap:** 3 years
> **Goal:** Senior Site Reliability Engineer *or* Platform Engineer at a strong
> engineering organization, with a credible path to EU relocation (Germany /
> Netherlands / Ireland) or a remote-first international role.

This plan does not start from zero. You already work as a DevOps engineer: you
use Linux, Bash, Docker, CI/CD pipelines, and Kubernetes every day. What
separates you from a senior engineer isn't knowing *more tools*. It's knowing
**why** the tools behave the way they do, **designing** systems instead of
operating them, and **reasoning about reliability with numbers**. This plan is
built around closing that gap.

It is not a link dump, and it is not a calendar. It is a **sequenced plan**:
phases, topics inside each phase, a build artifact for every topic, and a clear
"done when" test. There are no dates. **You finish a topic, prove it, and move
to the next one.** For the things you already use at work, you prove it first
and only study what the proof exposes.

Each resource sits in the phase where you can actually use it, so you read
things when you can apply them and not before.

> **▶ Current focus:** Phase 0: Gap Audit & Instrumentation
> *(Update this line every time you pass a gate.)*

---

## 1. The Contract

Read this section at every quarterly review. It is what you agreed to.

| | |
|---|---|
| **Starting point** | Working DevOps engineer, early in the career. On-prem datacenters, S3-compatible object storage, real hardware. **Comfortable with:** Linux + Bash, Docker, CI/CD, Kubernetes (as a user). **Not yet:** Terraform/Ansible, Prometheus/Grafana, SLOs, Go, cloud. |
| **The gap to senior** | Depth (internals, not commands), design (systems, not tickets), reliability math (SLOs, error budgets, capacity), and influence (written work that changes how others build). |
| **Time budget** | 12–15 focused hours per week: the main track plus 3 h of **Back to Basics Saturday**. Non-negotiable floor: 12 hours (9 main + 3 Saturday). |
| **Horizon** | ~1,240 hours on the main track. At ~12 h/week on it, that takes about 2 years; at ~9 h/week, about 3. Back to Basics runs alongside and never ends. |
| **Standing track** | **Back to Basics Saturday:** computer science from the start, plus LeetCode, every week. It keeps you relevant when tools change and keeps you interview-ready at all times. |
| **Progression** | **Gates, not dates.** A topic is done when its "done when" check passes. A phase is done when its gate passes. Topics you already use at work start with a **Prove it** test. |
| **Order** | Fundamentals, then platform, then reliability, and **cloud last**. Cloud gets easier once you already know Linux, Kubernetes and Terraform. |
| **Languages** | Python for automation first, then **Go** as the production language, then **Rust** as the specialization that sets you apart (Phase 5). |
| **Target markets** | EU relocation (DE / NL / IE) and remote-first international roles. |
| **Definition of done** | You can walk into a systems-design interview and a production-debugging interview and be the one explaining, not the one guessing. |

### The four rules

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

---

## 2. How This Plan Works: Two Lanes, One Spine

SRE and Platform Engineering are not two careers. They are two *products* built
on the same foundations, so this plan builds both on one shared spine.

```
                 ┌──────────────────────────────────────────┐
                 │          THE SPINE  (Phase 1)            │
                 │   Linux internals · Networking · Python  │
                 └────────────────────┬─────────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            │                                                   │
  ╔═════════▼══════════╗                             ╔══════════▼═════════╗
  ║   PLATFORM LANE    ║                             ║  RELIABILITY LANE  ║
  ║     (Phase 2)      ║                             ║     (Phase 3)      ║
  ╠════════════════════╣                             ╠════════════════════╣
  ║ Containers & K8s   ║                             ║ SLI / SLO / budget ║
  ║ IaC & GitOps       ║◄────── shared muscle ──────►║ Incident command   ║
  ║ CI/CD & delivery   ║        (you need both)      ║ Data-layer ops     ║
  ║ Observability      ║                             ║ Performance · Go   ║
  ╚═════════╤══════════╝                             ╚══════════╤═════════╝
            │                                                   │
            └─────────────────────────┬─────────────────────────┘
                                      │
                 ┌────────────────────▼─────────────────────┐
                 │         CLOUD: AWS  (Phase 4)            │
                 │  Map everything you built onto AWS/EKS   │
                 └────────────────────┬─────────────────────┘
                                      │
                 ┌────────────────────▼─────────────────────┐
                 │   DEPTH & CONVERGENCE  (Phase 5)         │
                 │ Distributed systems · Platform-as-product│
                 │ Go operators · Rust · Multi-region       │
                 └────────────────────┬─────────────────────┘
                                      │
                 ┌────────────────────▼─────────────────────┐
                 │        MARKET ENTRY  (Phase 6)           │
                 └──────────────────────────────────────────┘
```

**Why cloud comes late.** AWS learned before Linux and Kubernetes is a list of
service names to memorize. Learned after them, it is a translation exercise:
VPC is a network you've already built, EKS is a cluster you've already run, and
IAM is RBAC with more knobs. The same certification takes about half the effort,
and you understand the answers instead of recognizing them.

**The difference that matters in interviews:** an SRE is judged on whether the
system stays up, and on how quickly it is understood when it doesn't. A Platform
Engineer is judged on whether other engineers ship faster and more safely without
filing a ticket. The primitives are the same; the customer is different. Being
fluent in both is what makes you portable across companies.

---

## 3. The Competency Rubric

Track yourself against this honestly at each quarterly review. Titles are noise;
these behaviours are the real bar.

### Junior DevOps (where you are)
- Uses Docker, CI/CD, and Kubernetes fluently, mostly by following existing patterns.
- Resolves alerts and failures that have a known cause; escalates the unfamiliar ones.
- Writes Bash that automates tasks for themselves and the team.
- Debugs at the tool level (`kubectl describe`, pipeline logs) but not yet
  below it (syscalls, packets, kernel, cgroups).

### Mid-level (target: Phase 3 gate)
- **Owns** the SLOs of at least one service and defends the error budget.
- Leads an incident of moderate blast radius without escalating for direction.
- Writes and reviews production-quality code, not just scripts.
- Does capacity planning with numbers, not intuition.
- Reduces toil measurably and can state the hours saved.
- Debugs across layers: app → runtime → kernel → network → hardware.

### Senior (target: evidence by Phase 5 gate, title on the job)
- Sets reliability strategy across services they do not personally operate.
- Influences other teams' designs *before* those designs reach production.
- Designs for failure explicitly: blast radius, degradation modes, recovery time.
- Owns the postmortem culture: keeps it blameless and makes sure the actions land.
- Mentors, and their written work changes how the organization operates.
- On the platform side: defines the abstractions other engineers build on and
  treats the platform as a product with users, adoption metrics, and a roadmap.

> **Realistic expectation:** by the end of this plan you'll have your current
> DevOps experience plus 2–3 more years of deliberate work, which puts you at 4–5
> years of hands-on infrastructure. That is the normal range for a senior SRE or
> Platform title. The plan gives you the depth; your job has to give you the
> *scope* (owning services, leading incidents, influencing other teams), so push
> for that at work in parallel (§9).

---

## 4. The Weekly Operating System

Without deadlines, cadence is what keeps the plan moving. Target **~13–15 hours**.

| Slot | Duration | Purpose |
|---|---|---|
| **Two weekday evenings** | 1.5 h each | **Theory.** Core resources for the current topic. Notes go in `notes/`. |
| **One weekday evening** | 1.5 h | **Deliberate practice.** SadServers scenario, PromQL drills, Go exercises, `strace` on something real. Timed. No tutorials. |
| **Optional 4th evening** | 1.5 h | **Theory or build overflow.** Add it when you want the 2-year pace instead of the 3-year one. |
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
- **Saturday is not overflow.** When a build runs long, it eats a weekday
  evening, never Saturday. Back to Basics only works if it's every week.
- **Miss a day, not a week.** Missing one slot doesn't matter. If you miss a full
  week twice in a row, shrink the scope; don't try to "catch up". Catch-up
  debt never gets paid.
- **The stall rule.** Each phase lists an *effort budget* in hours. It is a
  sizing guide, not a deadline. If a phase runs past **1.5× its budget**, stop.
  Write what's left into `notes/parked.md` and move on. You can come back later.
  Perfectionism is how self-paced plans stretch from 2 years to 5.
- **Log your hours.** One line per session in `notes/hours.md`. That log is how
  you know whether the 3-year cap is still realistic, since there are no dates
  to tell you.
- **Notes are a build artifact.** Keep `notes/` in this repo. It becomes your
  blog backlog, your interview revision, and proof of the work.

---

## 5. Phase Map

| Phase | Theme | Effort budget | Exit artifact |
|---|---|---|---|
| **0** | Gap audit, lab, habits | ~30 h | Honest baseline + lab + hours log running |
| **1** | The spine: Linux & networking *internals*, Python | ~220 h | Below-the-abstraction debugging + a real Python tool |
| **2** | Platform lane: K8s internals, IaC, GitOps, observability | ~230 h | **CKA** + GitOps-managed lab platform |
| **3** | Reliability lane: SLOs, incidents, data, performance, Go | ~250 h | SLO-driven service + postmortem collection |
| **4** | Cloud: AWS, mapped onto everything above | ~120 h | **AWS SAA-C03** + lab platform running on AWS |
| **5** | Depth: distributed systems, platform-as-product, Go in prod, Rust | ~320 h | Operator + golden-path platform + Rust exporter |
| **6** | Market entry | ~70 h prep, then campaign | Offers |
| | **Total (main track)** | **~1,240 h** | |
| **∞** | **Back to Basics Saturday** (runs alongside every phase) | ~3 h/week | CS fundamentals + NeetCode 150 |

Phases 0–2 are shorter than they'd be for a beginner because you already use
Linux, Docker, CI/CD, and Kubernetes. The hours go into what you *don't* get from
daily use: internals, Terraform, and monitoring. Phase 6 is shorter than usual
because Back to Basics Saturday has already done most of the coding prep.

Progress:

- [ ] Phase 0: Gap Audit & Instrumentation
- [ ] Phase 1: The Spine
- [ ] Phase 2: Platform Lane
- [ ] Phase 3: Reliability Lane
- [ ] Phase 4: Cloud (AWS)
- [ ] Phase 5: Depth & Convergence (incl. Rust)
- [ ] Phase 6: Market Entry

> **Pace check (the only numbers that matter):** hours logged ÷ hours budgeted
> for the phases you've completed. If you've used much more than the budget, the
> stall rule is not being applied. If you're under 8 h/week for a whole quarter,
> something structural changed and the plan needs to be re-scoped, not pushed through.

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
| **CS fundamentals** | 1.5 h | The next chunk of the current module below. Notes go in `notes/cs/`. |
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
scratch in Python, and can state the complexity of each operation.

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

**B5. Databases** *(pairs with Phase 3d)*
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
- **Language:** Python first. Once you're in Phase 3, solve every third problem
  in Go as well. Once you start Rust in Phase 5, solve every third problem in
  Rust instead: LeetCode is a good way to fight the borrow checker on small problems.
- **The 30-minute rule:** try for 30 minutes before looking at a solution. If you
  looked, re-solve it from scratch the next Saturday without looking.
- **Log every problem** in `notes/leetcode.md`: problem, pattern, what tripped
  you up. Review the "tripped" column on deload weeks.
- **Mix in ops-flavoured problems**, because SRE coding rounds favour them: log
  parsing, rate limiters, LRU cache, top-K, merging intervals, and simple
  concurrency (a worker pool, a bounded queue).
- **Milestone, not deadline:** NeetCode 150 done before Phase 6. After that, keep
  doing 1–2 problems a week to stay warm, forever.

### Stay current (last Saturday of the month)

Spend the CS block catching up with the field, then write one paragraph in
`notes/current.md`: what changed, and does it matter for me? **Note tools; don't
chase them** (see failure mode 4 in §12).

- [ ] [SRE Weekly](https://sreweekly.com): the best weekly roundup of incidents and reliability writing
- [ ] [CNCF on YouTube](https://www.youtube.com/@cncf): KubeCon talks; watch one, skip the vendor pitches
- [ ] [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar): twice a year, a sober view of what's rising and falling
- [ ] [A collection of public postmortems](https://github.com/danluu/post-mortems): read one real outage a month and ask how you'd have caught it

---

## Phase 0: Gap Audit & Instrumentation
**Effort budget: ~30 h**

You already know a lot, but "I use it every day" hides gaps. Phase 0 finds out
exactly where your knowledge stops, and sets up the tooling for the rest of the
plan. It's short, but don't skip it: the audit decides how much of Phases 1–2
you can test out of.

### Build
1. **The gap audit.** Work through the SRE Checklist and the sysadmin question
   set below *cold*, before studying anything. Score each area as **Explain**
   (I can teach it), **Use** (I do it at work but couldn't explain why it works),
   or **Gap** (I don't know it). Commit the result to `notes/baseline.md`.
   Expect a lot of **Use** on Linux, Docker, and Kubernetes. Those are exactly
   the areas this plan turns into **Explain**.
2. **The lab.** Three Linux VMs (Proxmox, or libvirt/KVM on a spare box; one
   32 GB machine is enough). Rules: no clicking, everything reproducible. Start
   with the Bash you already write; Terraform and Ansible replace it in Phase 2.
   Anything you can safely do on non-production systems at work counts too.
3. **The notes repo.** Markdown in git, in this repository under `notes/`. One
   file per topic. Add an Anki deck (or `.md` flashcards) for facts you must
   recall under interview pressure: syscalls, signals, exit codes, TCP states,
   PromQL functions.
4. **The hours log.** `notes/hours.md`, one line per session. This replaces the
   calendar.
5. **The work log.** Start `notes/work-log.md` now (see §9). What you do at work
   over the next two years is half your evidence.

### Core
- [ ] [SRE Checklist](https://github.com/bregman-arie/sre-checklist): the audit instrument
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
- [ ] Gap audit committed, with every area scored Explain / Use / Gap.
- [ ] Lab rebuilds from scratch with one command.
- [ ] Four consecutive weeks of cadence in the hours log.

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

Work 1a and 1c together (theory evenings on Linux, Sunday builds in Python
that automate your Linux work), then move to 1b.

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

### 1c. Python for operations

You already automate with Bash. Python is where you go when a script outgrows
Bash: structured data, APIs, error handling, tests. It's also the usual language
for SRE coding interviews. Go comes in Phase 3. If you already write Python,
skip the courses and do the build. Otherwise **pick one** course; don't do all three.

- [ ] [Python For Everyone](https://www.py4e.com/)
- [ ] [Python Basics](https://pythonbasics.org/)
- [ ] [Complete Python Tutorial](https://www.scaler.com/topics/python/)
- [ ] **Build:** a real CLI tool *for your job*, e.g. a log parser, a
  health-checker for your object storage, or a report on your Kubernetes
  resources through its API. Ideally, replace one of your team's Bash scripts
  that has become painful. It needs
  argument parsing, error handling, tests, and a README.

**Done when:** someone else could clone the tool, run it, and understand the
code without asking you.

### Books for this phase
- [ ] [UNIX and Linux System Administration Handbook (5th Edition)](https://www.amazon.com/UNIX-Linux-System-Administration-Handbook/dp/0134277554): desk reference for the whole phase
- [ ] [Linux Pocket Guide, 3rd Edition](http://shop.oreilly.com/product/0636920040927.do)
- [ ] [TCP/IP Illustrated, Volume 1](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313): reference; read the TCP chapters properly
- [ ] [Linux Kernel Development (3rd Edition)](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468): optional stretch goal

### Gate to Phase 2
- [ ] 20+ SadServers scenarios solved.
- [ ] The packet-tracing and OOM-kill explanations written up in `notes/`.
- [ ] Python tool published with tests.
- [ ] Three posts published.

---

## Phase 2: The Platform Lane
**Effort budget: ~230 h**

You already *use* containers, pipelines, and Kubernetes. This phase takes you
from user to **builder and operator**: you'll know how they work inside, you'll
provision them from code, and you'll be able to see what they're doing. That's
where the "Platform Engineer" half of your title comes from.

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

> **Optional job move.** Once you pass this gate, you are a credible candidate
> for Platform Engineer or SRE-titled roles (not only DevOps) in your *local or
> regional* market. If your current job doesn't give you room to grow into SRE
> work (on-call, SLOs, owning services, IaC), a move here speeds up every later
> phase more than any amount of lab time. See §10. If you move, keep the plan
> and continue from Phase 3.

---

## Phase 3: The Reliability Lane
**Effort budget: ~250 h**

Phase 2 made you a strong DevOps engineer. **Phase 3 makes you an SRE.** The
difference isn't tooling. It's that you now reason about reliability with
numbers and treat it as an engineering constraint with a budget, not as a feeling.

By the end of this phase you should meet the mid-level bar in §3.

### 3a. SLIs, SLOs and error budgets

The intellectual core of SRE. "How do you set an SLO?" comes up in almost every
SRE interview.

**Core**
- [ ] [Implementing SLOs](https://sre.google/workbook/implementing-slos/): read it three times
- [ ] [Why bother with SLI and SLO?](https://blog.alexewerlof.com/p/why-bother-with-sli-and-slo)
- [ ] [How NOT to Measure Latency](https://youtu.be/lJ8ydIuPFeU): percentiles and coordinated omission; watch it twice
- [ ] **Build:** a service in your lab with real SLIs, a defined SLO, and
  multi-window burn-rate alerts.

**Go deeper**
- [ ] [Practical Guide to SRE: Using SLOs to Increase Reliability](https://rootly.io/blog/practical-guide-to-sre-using-slos-to-increase-reliability)
- [ ] [Setting up Service Monitoring: The Why's and What's](https://amitosh.medium.com/the-whys-and-what-s-of-setting-up-service-monitoring-cc1c165ee088)
- [ ] [Site Reliability Engineering: Measuring and Managing Reliability](https://www.coursera.org/learn/site-reliability-engineering-slos) (Coursera)
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803) (book)

**Done when:** a burn-rate alert has fired for real, and you can defend your SLO
target to a skeptical product manager.

### 3b. Incident response & postmortems

**Core**
- [ ] [Incident Response](https://response.pagerduty.com): the industry reference
- [ ] [Postmortems](https://postmortems.pagerduty.com)
- [ ] [The practical guide to incident management](https://incident.io/guide)
- [ ] [Runbooks](https://web.archive.org/web/20231005015754/https://www.transposit.com/devops-blog/itsm/what-makes-a-good-runbook)
- [ ] **Build: the game-day habit.** From here until you're hired, break your lab
  on purpose once a month: fill a disk, blackhole DNS, OOM a pod, partition the
  network, corrupt etcd. Run it as a real incident with a timeline, comms, and
  mitigation, then write the postmortem. **A dozen real postmortems is a
  portfolio almost no junior has.**

**Go deeper**
- [ ] [An Incident Command Training Handbook](https://blog.danslimmon.com/2019/06/24/an-incident-command-training-handbook)
- [ ] [Howie guide to post-incident investigations](https://www.jeli.io/howie/welcome)
- [ ] [Incident Management vs. Incident Response - What's the Difference?](https://rootly.io/blog/incident-management-vs-incident-response-what-s-the-difference)
- [ ] [Practical Guide to SRE: Automating On-Call](https://rootly.io/blog/practical-guide-to-sre-automating-on-call)

**Done when:** three game days run, three postmortems written, and runbooks
exist for the alerts that fired.

### 3c. SRE as an organizational practice

Senior interviews probe how SRE *works inside a company*, not just its tools.
This topic is what lets you answer "how would you introduce SLOs to a team that
doesn't want them?"

**Core**
- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents) (the book): read the core chapters (Part II "Principles" and the incident/postmortem chapters) and skim the rest
- [ ] [Identifying and tracking toil using SRE principles](https://cloud.google.com/blog/products/management-tools/identifying-and-tracking-toil-using-sre-principles)
- [ ] [How SRE teams are organized, and how to get started](https://cloud.google.com/blog/products/devops-sre/how-sre-teams-are-organized-and-how-to-get-started)
- [ ] [SRE Engagement Models](https://certomodo.substack.com/p/sre-engagement-models)
- [ ] [SRE at Google: Our complete list of CRE life lessons](https://cloud.google.com/blog/products/devops-sre/sre-at-google-our-complete-list-of-cre-life-lessons)

**Go deeper**
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents)
- [ ] [Building SRE from Scratch](https://medium.com/ibm-garage/building-sre-from-scratch-485e23985bbd)
- [ ] [Starting SRE at startups and smaller organizations](https://www.srepath.com/starting-sre-at-startups-and-smaller-organizations)
- [ ] [Going from Zero to SRE](https://www.squadcast.com/blog/going-from-zero-to-sre)
- [ ] [SRE in the Real World](https://blog.relyabilit.ie/sre-in-the-real-world)
- [ ] [Rundown of LinkedIn's SRE practices](https://www.srepath.com/rundown-of-linkedins-sre-practices)
- [ ] [Rundown of Uber's SRE practice](https://www.srepath.com/rundown-of-uber-sre-practice)
- [ ] [The System Resiliency Pyramid](https://www.codereliant.io/the-system-resiliency-pyramid)
- [ ] [10 Tips for Onboarding New SRE Hires](https://www.srepath.com/10-tips-for-onboarding-new-sre-hires)
- [ ] [Seeking SRE](https://books.google.ru/books?id=tmhqDwAAQBAJ) (book; essay collection, dip in)

**Done when:** you've introduced one SLO or one toil measurement *at work*
(see §9) and written up how it went.

### 3d. Data layer reliability

Stateful systems are where reliability gets genuinely hard, and where most
candidates are weakest. Being the SRE who is comfortable with databases is a
big advantage.

**Core**
- [ ] [Things You Should Know About Databases](https://architecturenotes.co/things-you-should-know-about-databases)
- [ ] [How do database indexes work?](https://planetscale.com/blog/how-do-database-indexes-work)
- [ ] [ACID vs BASE in Databases](https://medium.com/geekculture/acid-vs-base-in-databases-1bcad774da26)
- [ ] [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem): know its real limits, and why PACELC is the better framing
- [ ] [Database Replication](https://galeracluster.com/library/documentation/tech-desc-introduction.html#database-replication)
- [ ] [Database Sharding](https://planetscale.com/blog/database-sharding)
- [ ] **Build:** run PostgreSQL with a replica in the lab. Kill the primary,
  promote the replica, and measure how much data you lost and how long it took.

**Go deeper**
- [ ] [7 Database Paradigms](https://youtu.be/W2Z7fbCLSTw)
- [ ] [SQL vs. NoSQL Database: When to Use, How to Choose](https://www.ml4devs.com/en/articles/datastore-choices-sql-vs-nosql-database/)
- [ ] [Understanding Database Sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)
- [ ] [Database Sharding Explained](https://architecturenotes.co/database-sharding-explained)
- [ ] [Redis Explained](https://architecturenotes.co/redis)
- [ ] [Kafka 101](https://highscalability.com/untitled-2)
- [ ] [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html): how schema changes ship without downtime

**Done when:** you can explain your failover's RPO and RTO with measured numbers.

### 3e. Performance engineering

- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808) by Brendan Gregg. **After the Google SRE book, the most important book in this repository.** Core: the methodology, CPU, memory, file systems, and network chapters. Treat the rest as reference.
- [ ] *Go deeper:* [Systems Performance: Enterprise and the Cloud](https://www.amazon.com/Systems-Performance-Enterprise-Brendan-Gregg/dp/0133390098) (1st edition; only if you can't get the 2nd)

**Done when:** you've used the USE method on a real problem, at work or in the
lab, and written it up.

### 3f. Go

Go is the language of the infrastructure world: Kubernetes, Terraform,
Prometheus, Docker, etcd. Reading it is required to debug your stack; writing it
is what separates a mid-level SRE from a senior one.

**Core**
- [ ] [A tour of Go](https://tour.golang.org)
- [ ] [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/): the best way in; test-first suits infra work
- [ ] [Go by Example](https://gobyexample.com): reference while you build
- [ ] [Effective Go](https://golang.org/doc/effective_go.html)
- [ ] **Build:** rewrite your Phase 1 Python tool, or a small HTTP service, in Go
  with tests and Prometheus metrics.

**Go deeper**
- [ ] [Go Tutorials & Examples](https://gosamples.dev)
- [ ] [Getting up and running with Go](http://www.golangprograms.com)
- [ ] [Style Guide](https://google.github.io/styleguide/go/guide)
- [ ] [Style Decisions](https://google.github.io/styleguide/go/decisions)
- [ ] [Best Practices](https://google.github.io/styleguide/go/best-practices)
- [ ] [Go Design Patterns](https://github.com/tmrts/go-patterns)
- [ ] [Go Memory Management](https://povilasv.me/go-memory-management)
- [ ] [50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs](https://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang)

**Done when:** the Go service runs in your cluster, deployed via GitOps, with
metrics you use in an SLO.

### Gate to Phase 4
- [ ] A service with a published SLO and a burn-rate alert that has fired for real.
- [ ] At least three postmortems written (and the monthly game day is now a habit).
- [ ] Go service running in the lab.
- [ ] You meet most of the mid-level rubric in §3, with evidence.

---

## Phase 4: Cloud (AWS)
**Effort budget: ~120 h**

By now you have run a Kubernetes platform, written Terraform, built GitOps, and
operated SLOs. This phase **maps all of that onto AWS**. It is deliberately
short because you're translating what you know, not learning it from scratch.

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
- [ ] **Map AWS onto your on-prem world.** Write `notes/onprem-vs-aws.md`: your
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

### Gate to Phase 5
- [ ] SAA-C03 passed.
- [ ] Platform running on EKS from the same GitOps repo.
- [ ] Terraform CI with drift detection working.
- [ ] Cost model written.

---

## Phase 5: Depth & Convergence
**Effort budget: ~320 h** (~200 h for 5a–5d, ~120 h for Rust in 5e)

This is the phase that makes you look senior. Phases 1–4 gave you a stack you
can operate on-prem and in the cloud. Phase 5 is about **designing systems**,
building the platform as a product, and producing evidence that you operate
above your years of experience.

Keep Back to Basics Saturday going. By now it should be in module B6
(distributed systems), which pairs directly with 5a.

### 5a. Distributed systems & architecture

**Core**
- [ ] [Distributed systems](http://book.mixu.net/distsys/single-page.html): start here; short and dense
- [ ] [The System Design Primer](https://github.com/donnemartin/system-design-primer): the canonical reference
- [ ] [Load Balancing](https://samwho.dev/load-balancing): interactive and genuinely excellent
- [ ] [Caching](https://planetscale.com/blog/caching)
- [ ] [Failover](https://blog.alexewerlof.com/p/failover)
- [ ] [The principles of extreme fault tolerance](https://planetscale.com/blog/the-principles-of-extreme-fault-tolerance)

**Go deeper**
- [ ] [System Design 101](https://github.com/ByteByteGoHq/system-design-101)
- [ ] [Web Architecture 101](https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947)
- [ ] [What's in a Production Web Application?](https://web.archive.org/web/20210106095747/http://stephenmann.io/post/whats-in-a-production-web-application)
- [ ] [Monoliths, Service Architecture, and Microservices](https://architecturenotes.co/granularity-of-systems)
- [ ] [Scale From Zero To Millions Of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems): where security meets reliability; asked about more and more at senior level

*Structured courses (pick at most one; they overlap heavily and don't replace the reading above):*
- [ ] [SystemsExpert course from AlgoExpert](https://www.algoexpert.io/systems/product)
- [ ] [Grokking the System Design Interview](https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers)

**Done when:** you can run a 45-minute design session out loud (URL shortener,
metrics pipeline, object store) and volunteer the SLIs, failure modes, and
deployment plan without being asked.

### 5b. Go in production: the operator

- [ ] Build a Kubernetes **operator** with kubebuilder / controller-runtime that
  solves a real problem in your lab. Reconciliation loops are the deepest idea in
  the ecosystem, and understanding them properly changes how you see the whole platform.
- [ ] Instrument it with OpenTelemetry: metrics, logs, traces.
- [ ] *Go deeper:* write a Prometheus exporter for something in your lab (or your
  on-prem object storage) that doesn't have one.

**Done when:** the operator runs in your cluster, has tests, and has a README
that explains the reconcile design and its failure modes.

### 5c. Platform engineering as a product

There isn't much canonical written material here yet, so this topic is mostly
build work. That's also why the skill is scarce and well paid.

**Core**
- [ ] **Golden path.** A template repo that takes an application from `git init`
  to production with SLOs, dashboards, alerts, and a pipeline attached, with no
  tickets and no platform-team involvement.
- [ ] **Multi-tenancy.** Namespaces, quotas, network policies, RBAC, and a
  documented isolation model you can defend.
- [ ] **Policy as code.** OPA/Gatekeeper or Kyverno. Guardrails, not gates.
- [ ] **Treat it as a product.** Write a one-page platform README aimed at your
  users, define adoption metrics, and get feedback from at least one real person
  who isn't you. This mindset *is* the seniority signal.

**Go deeper**
- [ ] **Self-service portal.** Backstage, a Crossplane control plane, or your own
  thin API. The test is whether a developer can provision without you.
- [ ] **Cost attribution.** Attribute AWS spend to a workload. FinOps literacy
  stands out in senior platform interviews.

**Done when:** someone other than you has deployed an app through your golden path.

### 5d. Deepening the reliability lane

**Core**
- [ ] Chaos engineering with real hypotheses: a steady-state metric, a blast
  radius, and abort conditions. Not "randomly kill pods."
- [ ] Multi-AZ failover on AWS: write the runbook, then test it.

**Go deeper**
- [ ] Capacity planning with actual load tests and headroom modelling.
- [ ] Progressive delivery: automated canary analysis tied to your SLIs.
- [ ] Contribute to one CNCF project. Issues, reviews, and docs count; one real code change is the goal.

### 5e. Rust: the specialization

**Why Rust, and why here.** Rust keeps moving into the infrastructure layer:
proxies (Linkerd's data plane, Cloudflare's Pingora), observability pipelines
(Vector), VM and container runtimes (Firecracker, Bottlerocket), and eBPF
tooling. Go is still the main language for SRE and Platform work, so Rust
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
- [ ] **Build 1:** rewrite your Phase 1 Python tool in Rust with `clap`, `serde`, and proper error handling. Compare the three versions in a post.
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
- [ ] Rust exporter running (or Rust formally moved to post-hire in a quarterly review).
- [ ] Golden path used by someone other than you.
- [ ] 12+ posts published.
- [ ] Design sessions practised out loud at least five times.
- [ ] Back to Basics: NeetCode 150 done and modules B1–B6 core done.
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

- [ ] [Crack the System Design Interview](https://tianpan.co/notes/2016-02-13-crack-the-system-design-interview)
- [ ] [System design interview for IT companies](https://github.com/checkcheckzz/system-design-interview)
- [ ] [Designing WhatsApp](http://highscalability.com/blog/2022/1/3/designing-whatsapp.html)
- [ ] [Designing Uber](http://highscalability.com/blog/2022/1/25/designing-uber.html)
- [ ] [Designing Tinder](http://highscalability.com/blog/2022/1/17/designing-tinder.html)
- [ ] [Designing Instagram](http://highscalability.com/blog/2022/1/11/designing-instagram.html)
- [ ] [Designing Netflix](http://highscalability.com/blog/2021/12/13/designing-netflix.html)
- [ ] **The SRE twist:** you'll usually be asked to design *and then operate*
  the system. Always volunteer the SLIs, the failure modes, the deployment
  strategy, and the on-call story. That is what separates an SRE answer from a
  generic backend answer, and most candidates never make that shift.

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
- [ ] At least five timed mock interviews with another person, out loud

### 6c. Domain interview prep

- [ ] [A collection of questions to practice with for SRE interviews](https://github.com/michael-kehoe/sre-interview)
- [ ] [SRE Interview Questions](https://syedali.net/engineer-interview-questions)
- [ ] [Questions I ask in SRE interviews](https://dev.to/logan/questions-i-ask-in-sre-interviews-a9j)
- [ ] [Kubernetes job interview questions](https://enterprisersproject.com/article/2019/2/kubernetes-job-interview-questions-how-prepare)
- [ ] [The Must-Know Terraform Interview Questions](https://devopsknowledge.hashnode.dev/the-must-know-terraform-interview-questions)
- [ ] [DevOps Guide](https://github.com/Tikam02/DevOps-Guide)
- [ ] [DevOps Roadmap: Learn to become a DevOps Engineer or SRE](https://roadmap.sh/devops): use only to check for gaps

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
  your postmortems, and the platform work. Every behavioural question is a remix
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
| **CKA** | Phase 2 | Hands-on and respected. The single best cert for SRE/Platform hiring. |
| **AWS Solutions Architect Associate** | Phase 4 | Opens cloud roles and complements your on-prem background. Much easier after Phases 1–3. |
| Terraform Associate | Phase 4 (optional) | Cheap, quick, often listed in EU job ads. Only if a target role asks for it. |
| Prometheus Certified Associate | Phase 3 (optional) | Aimed squarely at SRE work. Skip if short on hours. |

**Two required, two optional. That's the whole list.** CKS or AWS DevOps Pro are
for *after* you're hired. Past a handful of certs, each extra one signals
*studying* rather than *building*, and reviewers read it that way.

---

## 7. Portfolio: The Seven Artifacts

These carry your job search. Each lives in a public repo with a README that
explains the design decisions and tradeoffs. **The README is the artifact**,
because it's what a hiring manager actually reads.

| # | Artifact | Built in |
|---|---|---|
| 1 | **The lab**: VM/bare-metal Kubernetes, fully IaC-managed, rebuildable from zero | Phases 0–2 |
| 2 | **The observability stack**: Prometheus, Grafana, Alertmanager, tracing, with documented SLOs and burn-rate alerting on real workloads | Phases 2–3 |
| 3 | **The postmortem collection**: a dozen real write-ups from your game days. Rare, cheap to produce, and instantly credible | Phase 3 onward |
| 4 | **The AWS environment**: the same platform on EKS, multi-environment Terraform with CI, remote state, drift detection, and a written cost model | Phase 4 |
| 5 | **The operator**: a Go controller solving an actual problem in your lab | Phase 5 |
| 6 | **The platform**: golden path, policy as code, multi-tenancy, written for its users | Phase 5 |
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
the tickets** to **owning the outcomes**:

- **Volunteer for on-call and for incident write-ups.** Nothing builds SRE
  judgment faster. Then quietly raise the standard of the postmortems.
- **Introduce one SLO.** Pick a service, define an SLI, measure it for a month,
  and present the number. You don't need permission to measure something.
- **Automate a toil source and quantify it.** "Cut 6 engineer-hours/week" is a
  CV line. "Wrote Ansible playbooks" is not.
- **Own the object storage story.** You already run S3-compatible storage on
  bare metal: durability, replication, capacity, failure modes. Very few
  candidates can speak to that. Go deep and make it your specialty.
- **Own one thing end to end.** A cluster, a pipeline platform, or the storage
  service: its upgrades, its alerts, its capacity, its documentation. "I owned
  X" is a much stronger interview story than "I worked on X".
- **Bring each phase to work.** Every topic in this plan has a "at work" version:
  a Terraform module, a new alert, an SLO, a runbook, a Go tool. Lab work proves
  you learned it; work proves you can apply it.
- **Push for IaC and GitOps adoption internally.** Doing this against real
  organizational friction is exactly the "influence without authority" story
  senior interviews probe for.
- **Keep an evidence log.** `notes/work-log.md`, updated weekly: what broke,
  what you did, what it saved. You won't remember any of it two years from now,
  and this file is where your CV and STAR stories come from.
- **Write things others use.** A design doc, an onboarding guide, a runbook the
  whole team follows. Written work that changes how others operate is one of
  the clearest senior signals.

---

## 10. Market Strategy: EU & Remote

> ⚠️ Immigration rules and salary thresholds change every year. Everything below
> is orientation, not legal advice. **Re-verify it against official government
> sources when you start Phase 5**, which is when it becomes actionable.

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
SRE and DevOps roles appear on the critical skills list. The salary threshold is
lower for listed occupations and higher otherwise. It's English-speaking and has
a large cluster of US tech EMEA headquarters, which overlaps strongly with the
companies most likely to recognize your skill set.

### Using Rust in the search
Search for **Rust + infrastructure / SRE / platform** specifically, not just
"Rust developer": companies building proxies, CDNs and edge networks, databases,
observability pipelines, and cloud runtimes. These roles get fewer qualified
applicants, so a Rust exporter plus solid SRE fundamentals stands out. Lead with
SRE in your CV and use Rust as the differentiator; most of your offers will
still come from Go and Kubernetes roles.

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
deadline. Write the answers into `notes/reviews/YYYY-QN.md`.

1. Which artifacts actually shipped this quarter? (Reading doesn't count.)
2. Hours logged this quarter, and hours per week on average. If below 8, what
   changed structurally?
3. **Pace check:** hours used vs. budgeted for completed phases, and months
   elapsed vs. the 3-year cap. Is the cap still realistic at this rate?
4. Where am I against the §3 rubric, with evidence rather than vibes?
5. What did I learn that changed my mind about something?
6. What am I avoiding because it's hard? (Usually the highest-value item.)
7. What goes into `notes/parked.md` so I can move on?
8. **Back to Basics:** which module am I on, how many problems did I solve,
   and which patterns still trip me up? Did any Saturday get skipped for the build?

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
   rule, and `notes/parked.md`. Use them.
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
10. **Waiting to feel ready.** You won't feel ready. Mid-level candidates who
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
- [ ] [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents): Phase 3
- [ ] [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents): Phase 3
- [ ] [Seeking SRE](https://books.google.ru/books?id=tmhqDwAAQBAJ): Phase 3
- [ ] [Implementing Service Level Objectives](https://learning.oreilly.com/library/view/implementing-service-level/9781492076803): Phase 3
- [ ] [Systems Performance, 2nd Edition](https://www.informit.com/store/systems-performance-9780136820154?ranMID=24808): Phase 3, slowly
- [ ] [Building Secure and Reliable Systems](https://sre.google/books/building-secure-reliable-systems): Phase 5

### Standing drills
| Drill | Cadence | Phases |
|---|---|---|
| [SadServers](https://sadservers.com) scenario, timed | Weekly | 1 → 6 |
| [This Week in Rust](https://this-week-in-rust.org), skim | Weekly | 5 → forever |
| [PromQL](https://promlabs.com/promql-cheat-sheet) queries against live data | Weekly | 2 → 6 |
| Game day / deliberate breakage + postmortem | Monthly | 3 → 6 |
| Post per completed topic | Per topic | 1 → 6 |
| Back to Basics: CS module + 2–3 LeetCode | Weekly (Saturday) | 0 → forever |
| Stay current: newsletters, talks, public postmortems | Monthly (last Saturday) | 0 → forever |
| Hours log | Every session | 0 → 6 |
| Quarterly review | Quarterly | 0 → 6 |

---

## Credits

The original resource collection in this repository comes from the
community-maintained SRE interview preparation lists. The phasing, cadence,
rubric, and strategy are personal to this plan, which assumes a working DevOps
engineer as the starting point. If you fork it, re-derive the effort budgets for
your own starting point rather than adopting these.
