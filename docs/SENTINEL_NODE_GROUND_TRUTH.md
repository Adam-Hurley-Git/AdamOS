# AdamOS — GROUND TRUTH
**Version**: 2.0 — May 2026 | Supersedes all V1–V6 documents and previous Ground Truth v1.0
**Status**: Plan complete. Zero code written. Ready to build.

> **How to use**: Read THE VISION first. Then read THE TWO LAWS. Then jump to whatever phase you're working on.
> Update this document only when a decision is confirmed by working code or a deliberate session decision.
> Every session starts here. Every session ends by updating the Session Log.

---

## THE VISION — LIFE OS

This is not a chatbot. This is not a work tool. This is a **personal operating system**.

The experience you are building toward:

> You open one URL from your phone, anywhere in the world. You see everything — your work, your life, your projects, your agents running in the background, your tasks, your memory, your daily journal. You can talk to Amy by voice while walking. She knows your calendar, your projects, your patterns. When something needs serious planning, Kai takes over — he structures it, breaks it down, delegates it. Agents run in the background every day fixing things, learning things, building capabilities you asked for. Code gets written. Skills get added. Nothing breaks. You never maintain anything. The system gets more capable the longer it runs.
>
> You can spin up a new dashboard page in minutes — point it at any data, any tool, any capability. The dashboard grows with your life. It is never finished. It is never broken. It just keeps expanding.
>
> This is your life OS. Everything you do professionally and personally runs through it. You see it. You trust it. You never think about maintaining it.

---

## THE TWO SYSTEM LAWS

These are hard constraints, not goals. Every decision is filtered through them.

```
LAW 1 — SELF-MAINTAINING
  The system must never require you to perform maintenance.
  If something breaks, the system either fixes it or tells you
  exactly what happened and what it already tried.
  You are never a repairman.

LAW 2 — CAPABILITY ON DEMAND
  If you can describe what you want, the system can build it.
  You never need to understand how. You only need to approve.
  "I want X" → system researches, builds, tests, asks permission → X works.
```

**The test**: "Does a non-technical person ever need to touch this to maintain it?"
If yes: automate it or don't include it.

---

## THE TWO AGENTS

Everything else — dashboard, memory, tasks, infrastructure — exists to serve these two agents.

### AMY — Your Personal Companion

```
Name:          Amy
Voice:         ON by default — this is her primary mode
Tone:          Warm, sharp, brief, slightly playful
               Talks like a brilliant friend who happens to know everything
Model (text):  Gemini 2.5 Flash (free tier, 250 req/day)
Model (voice): Gemini Live via Pipecat (real-time native audio, free tier)
Cost:          £0/month for normal personal use
```

**What Amy does:**
```
✓ Answers anything quickly — explain, summarise, opinions, quick searches
✓ Manages your calendar — "what's today look like?" / "move my 3pm"
✓ Handles email — "summarise my inbox" / "draft a reply to X"
✓ Voice conversations — real-time, barge-in capable, phone-call quality
✓ Brainstorms freely — casual, fast, no structure required
✓ Remembers everything across sessions via Graphiti
✓ Knows all your projects at a high level without loading all of them
✓ Recognises when something needs Kai — hands off cleanly with a brief
✓ Writes your daily journal entry on request
✓ Flags calendar conflicts, overdue tasks, things she notices
✓ Reports on what Kai and the background agents have done
✓ Presents Capability Engine results — new skills ready for your approval

✗ Does NOT create Multica tasks (Kai does this)
✗ Does NOT do deep project planning (Kai does this)
✗ Does NOT write code (routes Amy → Kai → OpenHands)
✗ Does NOT pre-load project context unless you explicitly ask
```

**Amy's context budget per message (hard ceiling):**
```
System prompt (SOUL.md):              ~800 tokens   fixed
Graphiti recall (6 relevant facts):   ~500 tokens   per-message, project-scoped
Conversation window (last 10 turns):  ~1,500 tokens sliding window
Calendar/email (only when asked):     ~300 tokens   on-demand only
─────────────────────────────────────────────────────────
TOTAL per message:                    ~3,100 tokens
```

**Amy's voice — Pipecat (Gemini Live):**
```
NOT the clunky pipeline (STT → LLM → TTS).
Pipecat provides native bidirectional audio WebSocket to Gemini Live.
The model hears your voice and speaks back — no transcription step, no TTS step.

Experience:
  Press mic or say wake word → speak naturally → Amy responds in 300-500ms
  Interrupt her mid-sentence (barge-in)
  Phone-call grade quality, not voice-assistant grade

Spoken output rule (system prompt instruction):
  "You are speaking, not writing. Maximum 2 sentences spoken aloud.
   For complex answers: say a 1-sentence summary, then 'details on screen'.
   Never read lists aloud — say 'I've sent you the list'.
   Never read URLs."
  Screen shows the full text response simultaneously.

Implementation:
  Fork: pipecat-ai/gemini-live-web-starter
  Server: Python FastAPI + Pipecat (runs as Docker service)
  Client: React component (drops into Next.js dashboard /amy page)
  Transport: WebRTC (not raw WebSocket — more stable, handles mobile)
  API key: server-side only, never exposed to browser
```

**Amy's memory access (scoped by active project):**
```
Default (no project active):
  graphiti.recall(groups=["personal", "shared-work"], query=message, limit=6)

When project is mentioned ("colorkit", "AdamOS", etc.):
  graphiti.recall(groups=["personal", "shared-work", "colorkit"], limit=8)
  Project context pulled only when relevant, released after

NEVER pre-loaded: full project wikis, all Multica tasks, other project contexts
```

---

### KAI — Your CEO & Executive Operator

```
Name:          Kai
Voice:         Available, off by default — Kai is for focused work sessions
Tone:          Direct, decisive, high-standards, no fluff
               Treats every goal like a Fortune 500 project to be executed
Model:         Claude Sonnet (always — Kai is intentional, paid usage)
Cost:          Only when you explicitly invoke Kai for real planning work
               Estimated: £30–50/month based on 2-3 sessions/day average
```

**What Kai does:**
```
✓ Receives goals from you directly or from Amy's handoff brief
✓ Decomposes goals → ordered task trees with acceptance criteria + dependencies
✓ Creates Multica tasks (always shows you the full plan first, never auto-creates)
✓ Delegates tasks to the correct agents/runtimes
✓ Spawns Repo Scout before any build decision (never build what exists)
✓ Triggers OpenHands for coding tasks (via Multica)
✓ Validates completed work against acceptance criteria he set
✓ Provides structured status reports with blockers flagged
✓ Reads ALL project wikis and ALL Graphiti groups (wider access than Amy)
✓ Writes structured Sesh Summaries (plan-focused format)
✓ Maintains project objectives and milestones in Multica
✓ Sends return briefs back to Amy after sessions

✗ Does NOT do casual conversation (routes back to Amy)
✗ Does NOT act without a clear goal — clarifies first
✗ Does NOT create tasks without showing you the full tree first
✗ Does NOT write code himself (delegates to OpenHands)
```

**Kai's context budget per session (hard ceiling):**
```
System prompt (SOUL.md):               ~700 tokens  fixed
Graphiti recall (all groups, 12 facts): ~800 tokens  broader than Amy, cross-project
Active project wiki page:              ~600 tokens  loaded on session start
Open Multica tasks (workspace):        ~800 tokens  all open for active project
Amy handoff brief (if exists):         ~300 tokens  loaded if session starts from handoff
Last Kai Sesh Summary (this project):  ~500 tokens  last planning session
──────────────────────────────────────────────────────────────────────
TOTAL:                                 ~3,700 tokens intentional, worth every token
```

---

## AMY ↔ KAI HANDOFF PROTOCOL

The most important interaction between agents. It must feel seamless to you.

### Amy → Kai (handoff)

**Trigger** — Amy detects any of:
"plan this", "make this happen", "create tasks for", "work on [project]",
"let's figure out", multi-step execution request, explicit "hand to Kai"

**The handoff brief Amy auto-writes:**
```
┌────────────────────────────────────────────────────┐
│ HANDOFF: Amy → Kai                                  │
│ Time: [timestamp]                                   │
│ Project: [active project]                           │
│                                                     │
│ GOAL: [one sentence — what you want to achieve]     │
│                                                     │
│ CONTEXT: [2-3 sentences of what was discussed]      │
│                                                     │
│ DECISIONS ALREADY MADE: [anything you confirmed]    │
│                                                     │
│ STARTING POINT: [Amy's suggested first step]        │
│                                                     │
│ URGENCY: [high / medium / low]                      │
└────────────────────────────────────────────────────┘
```

**Amy says**: "This needs Kai. Here's what I'd hand over: [reads brief]. Send this to Kai?"
**You say**: "Yes"
**System**: Brief posted to Multica + saved to Graphiti + dashboard notification fires
**You open /kai**: Kai loads the brief, restates the goal, runs the Architect process

### Kai → Amy (return brief)

At end of every Kai session, Kai writes a return brief:
- What was planned
- Tasks created in Multica  
- Next milestone to watch
- What Amy should track and remind you about

Brief saved to Graphiti (all relevant groups). Amy reads it at next session when the project comes up.

Amy can then say: *"Kai created 6 tasks for ColorKit launch — top priority is the Paddle webhook fix by Friday."*

---

## THE SESH PROTOCOL

A "Sesh" is a focused, productive brainstorming session — unstructured during, structured on exit.
This is different from a quick task. A Sesh is deliberate collaborative work with an agent.

**When a Sesh starts:**
```
1. Load last Sesh Summary for this project (sessions/ folder)
2. Load top 5 open Multica tasks (active workspace)
3. Load Graphiti recall (last 10 relevant facts, scoped to project)
4. Load one wiki overview page (wiki/[project]/overview.md)
Total context loaded: ~2,700 tokens MAX — everything else fetched on-demand
```

**During the Sesh:**
```
Work / brainstorm / plan freely
Agent uses tools on-demand (not pre-loaded):
  wiki.read(path) — for specific pages you ask about
  graphiti.recall(query, group) — for specific past facts
  multica.tasks(workspace) — for current task list
Agent tracks what was decided, never loads another project's context
```

**When a Sesh ends (you say "wrap up" or close):**
```
1. Agent writes Sesh Summary (auto, hard limit: 500 words):
   ┌────────────────────────────────────┐
   │ ## Sesh: [Project] — [date]        │
   │ **Discussed**: ...                  │
   │ **Decided**: ...                    │
   │ **Completed**: ...                  │
   │ **Blockers**: ...                   │
   │ **Next session**: [exact next steps]│
   │ **Handoff note**: ...               │
   └────────────────────────────────────┘
2. Summary saved: sessions/YYYY-MM-DD-[project].md (auto, no approval needed)
3. Summary committed to Graphiti: group=[project] (auto)
4. New Multica tasks created from "Next session" items (you confirm list)
5. Journal entry appended: sessions/journal/YYYY-MM-DD.md (auto)
6. If facts worth adding to wiki: agent proposes diff to you NOW (not later)
```

**Why this matters**: The Sesh Summary is the handoff document. The next session starts by reading it. No context is lost. No re-deriving. You pick up exactly where you left off.

---

## THE FULL AGENT ROSTER

All background agents run as Hermes Agent profiles/skills. They are NOT Amy or Kai.

### The Janitor — System Maintenance
```
Runtime:      Hermes Agent (cron, 6:00 AM daily)
Model:        Ollama deepseek-r1:7b (free — maintenance doesn't need expensive models)
Sandboxed:    Read-only on personal data. Writes only to maintenance/ and health status.

DAILY AUTOMATIC JOB:
  1. Ping all Docker services → update health status JSON
  2. Check disk space, memory usage per container
  3. Run wiki-lint → log broken [[links]]
  4. Verify skill hashes match skill_manifest.json (detect tampering)
  5. Check backup ran (flag if not)
  6. Write maintenance/logs/YYYY-MM-DD-health.json
  7. If service is red → attempt restart once (2-min delay) → alert if fails
  8. Write incident log: what broke, what was tried, what happened
  9. Update /health page on dashboard

KNOWN FAILURE PATTERNS (auto-resolved):
  "Port already in use"     → kill conflicting process, restart
  "Disk full"               → clear logs older than 30 days, restart
  "Memory limit exceeded"   → increase container limit, restart
  "DB connection refused"   → restart DB, wait 30s, retry app
  "API key expired"         → flag to you (cannot self-fix)

WEEKLY CHECK (Sunday):
  Pull audited digest update versions (does NOT apply — only checks)
  Report in dashboard: "Updates available for review"

NEVER DOES:
  Modifies your code or config
  Restarts services that are working
  Applies updates (you run ./sentinel update)
  Accesses llm_wiki/personal/ or llm_wiki/work/
```

### The Librarian — Memory Manager
```
Runtime:      Hermes Agent (cron, Sunday midnight + on-demand)
Model:        Claude Haiku (pattern matching, cheaper)
Triggered by: Weekly cron OR "librarian run now"

JOB:
  1. Scan Graphiti (all groups) vs wiki/ (all pages) for conflicts
  2. Find wiki [[links]] pointing to missing files
  3. Find duplicate Graphiti nodes (exact-match entities)
  4. Find: facts repeated 5+ times in Graphiti with no wiki entry
  5. Draft proposals for each finding
  6. Write: maintenance/logs/librarian-YYYY-MM-DD.json
  7. Push dashboard notification: "Memory review: N items"

OUTPUT FORMAT:
  { "type": "stale_wiki" | "missing_wiki" | "broken_link" | "duplicate_node",
    "severity": "low" | "medium" | "high",
    "description": "...", "proposed_action": "...", "requires_approval": true }

YOU act from the Memory page in dashboard. Librarian NEVER writes wiki directly.
```

### The Researcher — Deep Research
```
Runtime:      Hermes Agent (spawned by Kai when research is needed)
Model:        Claude Sonnet (needs good synthesis)
Tool:         Local Firecrawl instance

WORKFLOW:
  1. Receives research brief from Kai: topic, depth, target wiki path
  2. Generates 5-10 targeted search queries
  3. Firecrawl: search → scrape top sources → clean to markdown
  4. Synthesises findings into structured markdown
  5. Saves to: llm_wiki/raw/[project]/[topic]-[date].md (immutable)
  6. Proposes compiled wiki page: wiki/[project]/[topic].md
  7. Shows diff to you for approval before writing

DEPTH LEVELS:
  quick      → 3 queries, 5 sources, ~5 min
  thorough   → 7 queries, 15 sources, ~15 min
  exhaustive → 12 queries, 25+ sources, ~30 min

NEVER auto-publishes external research to wiki without your review.
```

### The Skill Scout — Capability Discovery
```
Runtime:      Hermes Agent (cron, Tuesday + Friday)
Model:        Ollama (free — this is automated scouting work)
Sources:      agentskills.io (652+ skills), Hermes Skills Hub, GitHub

JOB:
  1. Poll agentskills.io for new skills matching stack (Hermes/Claude/Multica tags)
  2. Pull skill to QUARANTINE/
  3. Sandbox: Docker, no network, no filesystem, 30s timeout
  4. Static analysis: network calls, env reads, eval(), subprocess, exec()
  5. Write sandbox-report.json with risk score (0–100)
  6. Risk 80+: auto-rejected, never shown. Risk < 20: flagged as low risk.
  7. Dashboard notification: "N new skills ready for review"
  8. YOU approve/reject from /skills page — never auto-approved

SECURITY ABSOLUTES:
  All external code runs in Docker sandbox with no network access
  Sandbox destroyed after testing (not reused)
  .env file access in any skill = auto-rejected permanently
  Approved skills hash-locked in skill_manifest.json
  Janitor verifies hashes daily — alerts if any hash changes
```

### The Architect — Task Decomposition (Kai's sub-process)
```
Runtime:      Hermes skill, spawned WITHIN Kai's sessions
Model:        Claude Sonnet (needs strong reasoning)
Triggered by: Kai when a goal needs breaking into tasks

JOB:
  1. Receive high-level goal from Kai
  2. Decompose into ordered tasks + subtasks
  3. Set acceptance criteria for each task
  4. Set dependency chains (B needs A complete)
  5. Estimate complexity (S/M/L/XL)
  6. Show YOU the full task tree for approval
  7. On approval: create in Multica via CLI

What Multica lacks that Architect provides:
  - Goal validation (is this task scoped correctly? Is it achievable?)
  - Dependency reasoning
  - Acceptance criteria authoring
  - "Does this break down further?" judgement
```

---

## THE CAPABILITY ENGINE

When you say "I want X" and it doesn't exist — this is the system that makes it exist.
Six stages. ~5–10 minutes. You approve in one sentence. It works forever.

```
STAGE 1 — DISCOVERY (Skill Scout, ~60 sec)
  Search agentskills.io (652+ indexed skills, keyword match)
  Search Hermes Skills Hub (community contributed)
  Search GitHub (relevant keywords, filter >100 stars)
  Search npm / PyPI (existing libraries)
  Check skills_library/approved (do we already have it?)
  RESULT: "exists" / "partial" / "nothing found"

STAGE 2 — DECISION (Kai, ~30 sec)
  "Exists and good"   → evaluate security → propose adoption
  "Partial"           → plan adaptation
  "Nothing found"     → plan build from scratch

STAGE 3A — ADOPTION (skill found)
  Download to QUARANTINE/
  Docker sandbox: no network, no filesystem, 30s timeout
  Static analysis: network calls, env reads, eval(), subprocess
  Risk score calculated
  Draft plain-language summary for you

STAGE 3B — BUILD (nothing found)
  Researcher: deep-research the approach (Firecrawl)
  Kai: write build brief (what, inputs, outputs, constraints)
  Repo Scout: verify no existing solution (always before build)
  OpenHands: write the code + run tests
  Code → QUARANTINE/ → sandbox validation

STAGE 4 — YOUR APPROVAL (always, always simple)
  Amy: "[Skill name]: does [plain English]. Risk: low/none. Add it?"
  You: "Yes" / "No" / "Tell me more"
  No code shown unless you ask. No configuration required.

STAGE 5 — DEPLOYMENT (automated)
  Skill moved: QUARANTINE/ → skills_library/approved/
  Hash recorded in skill_manifest.json
  Available to: Amy, Kai, all Hermes agents
  Graphiti: fact written — "capability [name] added [date]"
  LLM-Wiki: skill page created at wiki/projects/AdamOS/skills/[name].md
  Multica: task closed (if triggered from a task)
  Amy: "Done. [Skill] is active."
```

**Hermes native skill learning** (separate, automatic):
After 5+ tool calls completing a complex task, Hermes proposes a SKILL.md.
These also flow through QUARANTINE/ and your approval.
Skills self-improve with every use. Month 1: ~5 skills. Month 3: ~40 skills. Month 6: ~60+ skills, all specific to your exact workflow.

**The Skill Registry** (`skills_library/skill_registry.json`):
Every agent queries this FIRST before attempting anything: "can I already do this?"
If yes: use it. If no: trigger Capability Engine. Registry grows over time.
Dashboard /skills page shows this as a visual map — every capability, when last used, health status.

---

## THE DEV TEAM

Amy and Kai handle thinking, planning, conversation.
The dev team handles execution — writing, testing, and shipping actual code.

```
YOU or AMY (detects coding request)
        ↓
"This is dev work, handing to Kai"
        ↓
KAI (Claude Sonnet)
  ├── Clarifies requirements
  ├── Defines acceptance criteria
  ├── Identifies affected files/systems
  └── Runs REPO SCOUT first (always)
        ↓
REPO SCOUT (Hermes skill, Firecrawl + GitHub)
  ├── "Existing solution found: [repo] — recommend using directly"
  ├── "Partial: [repo] covers X but not Y — extend it"
  └── "Nothing good found — build from scratch"
  Kai shows you this finding. YOU decide: use / extend / build.
        ↓ (if build or extend)
MULTICA TASK CREATED
  Title, description, acceptance criteria, affected files, assignee: OpenHands
        ↓
OPENHANDS (self-hosted, autonomous)
  ├── Reads task brief from Multica
  ├── Browses codebase for context
  ├── Plans implementation
  ├── Writes code, runs tests
  ├── Reports blockers as Multica comments
  └── On completion: posts diff/PR link to Multica task
        ↓
KAI VALIDATES
  ├── Reviews output against acceptance criteria
  ├── If yes: marks task complete, notifies you + Amy
  └── If no: writes follow-up brief → back to OpenHands
        ↓
YOU REVIEW
  Final approval, merge PR, or request changes
```

**Security** — OpenHands is restricted at config level. It cannot touch:
- `.env` files
- `llm_wiki/personal/`
- `backups/`
- Any file outside the active project's workspace mount

Every OpenHands output is a PR — never a direct merge. Kai reviews first, you approve last.

---

## SELF-MAINTENANCE — FULL ARCHITECTURE

This is the most important system in the entire harness. Without it, everything else is fragile.
The goal: **you never see a broken system**. Either it fixed itself before you noticed, or it tells you in plain English what happened and what it tried, so your only job is to make one decision.

---

### THE JANITOR — COMPLETE SPECIFICATION

The Janitor is not a feature. It is the foundation the entire system rests on.

```
Runtime:    Hermes Agent (dedicated cron profile)
Model:      Ollama deepseek-r1:7b (free — maintenance never uses paid models)
Sandboxed:  Read-only on llm_wiki/personal/, llm_wiki/work/, Graphiti personal group
            Write access: maintenance/, health status JSON, Docker restart commands only
Resilience: If Hermes itself crashes, OS-level watchdog restarts it (see below)
```

---

### THE FULL CRON SCHEDULE

Every interval has a reason. Nothing runs more than needed.

```
EVERY 5 MINUTES — Critical service pulse
  Check: Pipecat (Amy's voice), Dashboard, Caddy, Cloudflare Tunnel
  These are your user-facing surfaces — downtime here is immediately felt.
  Action: If any red → attempt L1 restart immediately (don't wait for 30-min cycle)

EVERY 30 MINUTES — Full health sweep
  Check: ALL 10 Docker services + Hermes + Ollama
  Log: health status JSON to maintenance/logs/health-[timestamp].json
  Update: /health dashboard (live, push via WebSocket)
  Action: Trigger L1 → L2 → L3 escalation if any service is red

EVERY 6 HOURS — API and connectivity check
  Check: Gemini API key (1 test request, minimal tokens)
  Check: Claude API key (1 test request, minimal tokens)
  Check: Google Workspace OAuth token validity
  Check: Cloudflare Tunnel reachable externally (ping via external URL)
  Check: Disk space per volume (warn at 80%, act at 90%)
  Action: Flag API issues (cannot self-fix), clear old temp files if disk > 80%

DAILY 6:00 AM — Full maintenance run
  Health: Full service health sweep (same as 30-min but written to daily log)
  Backup: Trigger adamos-backup.sh (Graphiti + Multica + wiki snapshot)
  Wiki: Run wiki-lint.sh → log broken [[links]], write report
  Skills: Verify all approved skill hashes match skill_manifest.json
  Memory: Light Graphiti deduplication (exact-duplicate nodes only)
  Updates: Check if any service has a newer pinned digest available (report only)
  Logs: Clear logs older than 30 days from maintenance/logs/
  Report: Write daily-summary to maintenance/logs/daily-YYYY-MM-DD.json
  Notify: Dashboard daily digest (1 line: "All good" or "N items need attention")

WEEKLY — SUNDAY MIDNIGHT — Deep maintenance
  Librarian: Full Graphiti vs wiki conflict detection (see Memory Architecture)
  Performance: Analyse skill usage stats — which are slow, which are unused
  Updates: Generate update proposal for you to review on /health page
  Playbooks: Review incident log — any recurring failures without a playbook?
  Suggestion: Level 4 improvement suggestions (see below)
  Backup: Verify last 7 daily backups are intact and restorable
  Report: Write weekly-summary-YYYY-MM-DD.json

MONTHLY — FIRST OF MONTH
  Capability: Level 5 proactive capability suggestions (patterns in your work)
  Backup: Full backup test — attempt restore in isolated environment, verify integrity
  Performance: Full system performance review — query speeds, token usage patterns
```

---

### THE DEPENDENCY RESTART ORDER

Services have dependencies. Restarting in the wrong order causes cascading failures.
The Janitor always restarts in this order, waiting for health check before proceeding:

```
1. redis          (base — FalkorDB and Firecrawl both depend on it)
2. falkordb       (depends: redis)         — wait: DB responsive
3. playwright     (independent)            — wait: browser ready
4. firecrawl      (depends: redis, playwright) — wait: API /health responds
5. multica        (independent)            — wait: API /health responds
6. pipecat        (independent)            — wait: WebRTC endpoint responsive
7. openhands      (independent)            — wait: API /health responds
8. dashboard      (independent)            — wait: HTTP 200 on /
9. caddy          (depends: dashboard, multica, pipecat) — wait: routes resolve
10. cloudflared   (depends: caddy)         — wait: external ping succeeds

RESTART RULE: Never restart a service before its dependency is healthy.
              Wait max 60 seconds for each dependency health check.
              If dependency won't recover, skip dependent services and escalate.
```

---

### THE FOUR-LEVEL ESCALATION CHAIN

Every failure enters at L1. If L1 can't fix it, it escalates. You are only involved at L4.

```
╔══════════════════════════════════════════════════════════════════════════╗
║  L1 — AUTO-RESTART (fires on every detected failure)                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Trigger: service health check fails (5-min pulse OR 30-min sweep)      ║
║  Action:                                                                  ║
║    1. Read last 10 lines of service logs                                 ║
║    2. Wait 2 minutes (let transient issue clear)                         ║
║    3. Restart service via Docker: docker restart [service]               ║
║    4. Wait for health check (up to 60 seconds)                           ║
║    5. If healthy: write incident log (auto-resolved), notify dashboard   ║
║       "Auto-fixed: [service] restarted at HH:MM. Cause: likely transient."
║    6. If still failing: escalate to L2                                   ║
║                                                                          ║
║  Dashboard shows: green pill → amber flash → green (you see the blip)  ║
║  You do: nothing                                                         ║
╚══════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════╗
║  L2 — DIAGNOSIS AND KNOWN-PATTERN RESOLUTION                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Trigger: L1 restart did not resolve the issue                          ║
║  Action:                                                                  ║
║    1. Read last 200 lines of service logs                                ║
║    2. Search logs against known failure pattern library (see below)      ║
║    3. If pattern match found:                                            ║
║       a. Execute the pattern's resolution script                         ║
║       b. Restart service                                                 ║
║       c. Verify health                                                   ║
║       d. If healthy: write playbook update, notify dashboard             ║
║          "Fixed: [service] had [issue in plain English]. Auto-resolved." ║
║    4. If no pattern match OR resolution failed: escalate to L3           ║
║                                                                          ║
║  Dashboard shows: amber → auto-resolved notification card               ║
║  You do: nothing (see the notification, dismiss when ready)             ║
╚══════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════╗
║  L3 — AI-ASSISTED DIAGNOSIS                                             ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Trigger: L2 could not match or resolve the pattern                     ║
║  Action:                                                                  ║
║    1. Janitor sends full log context to Kai (Claude Sonnet)             ║
║    2. Kai analyses: what caused this? What is the fix?                  ║
║    3. Option A — Kai has a confident fix:                               ║
║       Janitor executes fix → restart → health check                     ║
║       If resolved: write new playbook, notify you (it's educational)   ║
║       "New fix found for [issue]. Applied. Added to playbook library."  ║
║    4. Option B — Fix requires code change:                              ║
║       Kai writes OpenHands brief → OpenHands attempts fix              ║
║       OpenHands result presented to you for approval (see L4 below)    ║
║    5. Option C — Kai cannot diagnose:                                   ║
║       Full incident report written → escalate to L4                    ║
║                                                                          ║
║  Dashboard shows: amber card with "Investigating..." → resolved or L4  ║
╚══════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════╗
║  L4 — HUMAN DECISION REQUIRED                                           ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Trigger: L3 could not resolve, OR fix requires your approval           ║
║  What you see (dashboard notification card, persistent until resolved): ║
║  ┌────────────────────────────────────────────────────────────────────┐ ║
║  │ ⚠ NEEDS YOUR ATTENTION                                             │ ║
║  │                                                                    │ ║
║  │ Service: Pipecat (Amy's voice)                                     │ ║
║  │ Issue: Amy's voice is not working                                  │ ║
║  │                                                                    │ ║
║  │ What I tried:                                                      │ ║
║  │ 1. Restarted Pipecat — still failing                               │ ║
║  │ 2. Checked logs — Gemini Live API returning 401 Unauthorized       │ ║
║  │ 3. Tested API key — expired or revoked                             │ ║
║  │                                                                    │ ║
║  │ What you need to do:                                               │ ║
║  │ Renew Gemini API key at ai.google.dev, add to .env as GEMINI_KEY  │ ║
║  │ Then click: [Restart Pipecat]                                      │ ║
║  │                                                                    │ ║
║  │ Amy's text chat is working. Voice will resume after key update.    │ ║
║  └────────────────────────────────────────────────────────────────────┘ ║
║                                                                          ║
║  Key principle: L4 is always specific, always actionable, never vague. ║
║  "Something broke" is never shown. "This exact thing broke, do this    ║
║   exact thing" is always shown. If the system doesn't know exactly,    ║
║   it says so: "Unknown cause. Here are the logs [link]."              ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### THE KNOWN FAILURE PATTERN LIBRARY

Pre-written resolutions for every failure that can be anticipated. New entries are added automatically whenever L3 finds a new fix. Stored as `maintenance/playbooks/`.

```
PATTERN: "port already in use" (any service)
  Log match:   "bind: address already in use" | "EADDRINUSE"
  Resolution:  lsof -ti:[port] | xargs kill -9 → restart service
  Playbook:    maintenance/playbooks/port-conflict-[service].md
  Risk:        LOW — killing an unknown process could affect other apps
               Janitor checks process name before killing — skips system processes

PATTERN: "disk space exhausted" 
  Log match:   "no space left on device" | "disk quota exceeded"
  Resolution:  
    Step 1: Clear maintenance/logs/ older than 7 days (oldest first)
    Step 2: Clear Docker build cache: docker builder prune -f
    Step 3: Clear dangling Docker images: docker image prune -f
    Step 4: Restart affected service
    Step 5: If still < 10% free: flag to you (cannot safely clear more)
  Playbook:    maintenance/playbooks/disk-full.md

PATTERN: "out of memory / OOM killed"
  Log match:   "OOMKilled" | "Cannot allocate memory"
  Resolution:  
    Step 1: Identify which container was killed (docker events log)
    Step 2: Read its current memory_limit in docker-compose.yml
    Step 3: Increase by 25% in docker-compose.override.yml
    Step 4: docker-compose up -d [service] (applies new limit)
    Step 5: Monitor for 10 minutes — if stable, write updated limit to main compose
  Playbook:    maintenance/playbooks/oom-[service].md

PATTERN: "database connection refused"
  Log match:   "connection refused" | "ECONNREFUSED" | "could not connect to server"
  Resolution:  
    Step 1: Check if FalkorDB / Redis is running
    Step 2: If not: restart in dependency order (redis → falkordb)
    Step 3: Wait 30 seconds for DB to initialise
    Step 4: Restart the dependent service
  Playbook:    maintenance/playbooks/db-connection-refused.md

PATTERN: "SSL certificate error"
  Log match:   "certificate has expired" | "SSL_ERROR_RX_RECORD_TOO_LONG"
  Resolution:  Caddy auto-renews SSL — if Caddy is running, restart it
               If Caddy is down: restart Caddy first
  Playbook:    maintenance/playbooks/ssl-cert.md

PATTERN: "Cloudflare Tunnel disconnected"
  Log match:   "connection to edge closed" | "failed to connect to edge"
  Resolution:  
    Step 1: Restart cloudflared container
    Step 2: Wait 30 seconds, ping external URL
    Step 3: If still failing: check Cloudflare status page API
    Step 4: If Cloudflare outage: log it, wait 10 min, retry automatically
  Playbook:    maintenance/playbooks/cloudflare-tunnel.md

PATTERN: "Pipecat WebRTC connection dropping"
  Log match:   "ICE connection failed" | "DTLS handshake failed"
  Resolution:  
    Step 1: Restart Pipecat
    Step 2: Verify STUN/TURN server reachable
    Step 3: If mobile network issue: transient, log and retry
  Playbook:    maintenance/playbooks/pipecat-webrtc.md

PATTERN: "FalkorDB graph corruption"
  Log match:   "graph is corrupted" | "key does not exist"
  Resolution:  
    Step 1: Stop FalkorDB
    Step 2: Restore from last daily backup (backups/YYYY-MM-DD/graphiti-snapshot.json)
    Step 3: Restart FalkorDB
    Step 4: Verify data integrity
    Step 5: NOTIFY YOU (data loss may have occurred, you need to know)
  Playbook:    maintenance/playbooks/falkordb-corruption.md
  Risk:        HIGH — always notifies you even if auto-resolved

PATTERN: "Multica database locked"
  Log match:   "database is locked" | "SQLITE_BUSY"
  Resolution:  
    Step 1: Wait 30 seconds (lock may release naturally)
    Step 2: Restart Multica container (releases lock)
    Step 3: Verify tasks are intact via API call
  Playbook:    maintenance/playbooks/multica-db-locked.md

PATTERN: "OpenHands sandbox timeout"
  Log match:   "sandbox timeout" | "execution exceeded"
  Resolution:  
    Step 1: Kill the timed-out task in OpenHands
    Step 2: Update task in Multica: status=blocked, comment="Timed out after 2min"
    Step 3: Notify Kai (Kai will rewrite the brief more narrowly)
  Playbook:    maintenance/playbooks/openhands-timeout.md

PATTERN: "Hermes skill file corrupted"
  Log match:   "skill parsing error" | "invalid YAML in skill"
  Resolution:  
    Step 1: Move corrupted skill to maintenance/quarantine/corrupted/
    Step 2: Check skills_library/approved/ for backup copy
    Step 3: If backup exists: restore it
    Step 4: If no backup: flag to Skill Scout (re-find or rebuild)
  Playbook:    maintenance/playbooks/hermes-skill-corrupt.md

CAN NEVER SELF-FIX — ALWAYS ESCALATES TO L4:
  - API key expired (Gemini, Claude, Google Workspace)
  - Google OAuth token revoked (needs re-auth flow)
  - Domain DNS misconfigured
  - Cloudflare account issue
  - Billing failure on any API
  - Git repository access denied (for backups)
```

---

### THE PLAYBOOK SYSTEM — HOW IT GROWS

Playbooks are plain English markdown files. The Janitor reads them. You can read them. They self-accumulate.

```
STRUCTURE: maintenance/playbooks/[service]-[error-type].md

FORMAT:
  ## Playbook: [service] — [error in plain English]
  **First seen**: [date]
  **Times resolved**: [count]
  **Last resolved**: [date]

  ### What it looks like in logs
  [exact log lines that trigger this playbook]

  ### What causes it
  [plain English explanation]

  ### Resolution steps
  1. [exact command or action]
  2. [exact command or action]
  ...

  ### Verify it worked
  [how to confirm the fix succeeded]

  ### If this doesn't work
  [what to try next / what to tell the user]

HOW JANITOR USES PLAYBOOKS:
  1. Failure detected
  2. Extract key error phrases from logs
  3. Search playbooks/ for matching trigger phrases (fuzzy match)
  4. If match found: execute resolution steps in order
  5. If resolution works: increment "Times resolved" counter
  6. If resolution fails: skip this playbook, try next match, then escalate

HOW PLAYBOOKS ARE CREATED:
  A. Manual (pre-written): the 12 patterns above are written before Phase 3
  B. Auto-created by L3: when Kai finds a new fix, it writes the playbook
  C. Contributed by OpenHands: when a code fix resolves an issue, the playbook 
     is documented alongside the code change

PLAYBOOK REVIEW (weekly, Librarian):
  - Are any playbooks failing repeatedly? (needs updating)
  - Are any playbooks never needed? (candidate for removal)
  - Are there recurring L4 escalations with no playbook? (Kai proposes one)
```

---

### API FAILURE HANDLING

API failures are handled differently from service failures — you can't restart a broken API key.

```
GEMINI API (Amy's voice + text)
  Detect: 6-hour API check fails (401 or 429)
  401 Unauthorized: key expired or revoked
    → Immediate L4 alert (cannot self-fix)
    → Amy's text and voice go offline
    → Dashboard shows: "Amy offline — Gemini API key issue. [Link to ai.google.dev]"
  429 Rate Limited: exceeded free tier
    → Auto: switch Amy text to Claude Haiku fallback for 1 hour
    → Log: how many requests triggered the limit
    → Notify: "Amy using Haiku fallback until Gemini quota resets (HH:MM)"
    → No action needed from you

CLAUDE API (Kai + Researcher + L3 diagnosis)
  Detect: 6-hour API check fails
  401: key expired → L4 alert, Kai goes offline
  429: rate limited → queue Kai requests, retry with backoff
    → Notify: "Kai request queued — Claude rate limit. Will retry in Xmin."
  500: server error → retry 3 times with 30s backoff → L4 if persistent

GOOGLE WORKSPACE (Calendar + Gmail)
  Detect: OAuth token check fails
  Token expired (normal, refresh automatically):
    → Auto: use refresh_token to get new access_token
    → No notification (this is routine)
  Refresh token revoked (needs re-auth):
    → L4 alert: "Google Workspace re-auth needed."
    → Dashboard: [Re-authorise Google] button (opens OAuth flow)
    → Amy loses calendar + email access until re-authorised

CLOUDFLARE TUNNEL
  Detect: External ping to sentinel.[domain].com fails
  Causes and responses:
    Transient: retry after 2 min (most common)
    Tunnel disconnected: restart cloudflared container
    Cloudflare outage: check Cloudflare status API, log, wait, retry every 10 min
    DNS issue: cannot self-fix → L4 alert
```

---

### THE JANITOR'S OWN RESILIENCE

If the Janitor breaks, nothing is watching. This is solved at two levels.

```
LEVEL A — Docker health check on Hermes container
  Hermes runs background agents including the Janitor.
  Docker itself monitors Hermes: if it crashes, Docker restarts it.
  health_check:
    test: ["CMD", "hermes", "--profile", "janitor", "--ping"]
    interval: 5m
    retries: 3
    start_period: 30s

LEVEL B — OS-level watchdog (outside Docker entirely)
  A minimal OS-level scheduled task (Windows Task Scheduler) runs every 10 minutes.
  It does ONE thing: check if Docker is running and if the Hermes container is healthy.
  If not: restart Docker, then restart the Hermes container.
  
  This script is intentionally tiny — it cannot fail in complex ways:
    check_sentinel.bat / check_sentinel.sh:
      docker ps | grep hermes-agent | grep healthy
      if not: docker restart hermes-agent
  
  This script survives Hermes crashes, Docker crashes, even OS reboots
  (Task Scheduler runs at startup).

LEVEL C — Janitor self-check at the start of every run
  Before the Janitor does anything, it checks its own last run timestamp.
  If last run was > 45 minutes ago (when 30-min schedule is expected):
    → Log: "Janitor detected gap in monitoring — possible downtime"
    → Run a catch-up sweep immediately
    → Notify dashboard: "Monitoring gap detected: [start] to [end]. Running catch-up."
```

---

### THE BACKUP AND RESTORE SYSTEM

The backup system is what separates "self-healing" from "recoverable from disaster".

```
WHAT GETS BACKED UP (daily, 6 AM):
  1. Graphiti snapshot     → FalkorDB export to graphiti-snapshot.json
  2. Multica export        → All tasks, workspaces, history to multica-export.json
  3. LLM-Wiki snapshot     → tar.gz of entire llm_wiki/ directory
  4. Skills manifest       → skill_manifest.json + skills_library/approved/
  5. Config snapshot       → docker-compose.yml + all services/*/config files
                             (NOT .env — secrets are never backed up to files)
  
  Backup location: backups/YYYY-MM-DD/ (local)
  Retention: 30 days local

ENCRYPTED REMOTE BACKUP (weekly, Sunday):
  GitHub Actions pushes encrypted backup to private repo
  Encrypted with: GPG key (yours, passphrase stored in .env only)
  What's included: same as daily backup
  Why encrypted: wiki/personal/ contains your personal data

RESTORE PROCEDURE (adamos-restore.sh):
  $ ./sentinel restore --date 2026-05-20
  
  Steps:
  1. Verify backup integrity (hash check)
  2. Prompt: "Restore to 2026-05-20? Current data will be overwritten. [y/N]"
  3. Stop affected services
  4. Restore in order: Redis/FalkorDB → Multica → wiki → skills
  5. Restart services in dependency order
  6. Run health check — confirm all green
  7. Write restore log to maintenance/logs/
  
  WHAT IS NOT RESTORED:
  - .env (secrets — you manage these)
  - Docker images (re-pulled from registry)
  - Hermes conversation history (this is in FalkorDB — IS restored)

BACKUP FAILURE HANDLING:
  If backup fails:
    → Retry once after 30 minutes
    → If still fails: L4 alert (your data is not being backed up)
    → Dashboard shows persistent amber warning until backup succeeds
```

---

### NOTIFICATION DESIGN — WHAT REACHES YOU

The guiding principle: **you should only be notified about things that either need a decision or inform your understanding of the system's health**. Routine auto-fixes are logged but do not interrupt you.

```
NEVER NOTIFIES YOU (logged silently):
  - L1 restart that succeeds
  - Routine 6-hour API checks passing
  - Daily maintenance completing normally
  - Graphiti deduplication runs
  - Wiki lint with no issues

PASSIVE NOTIFICATION (appears on /health page, no alert):
  - L2 fix that succeeded ("Auto-fixed: Multica DB lock released — 2 min ago")
  - Daily backup completed
  - New playbook written by L3
  - Skill hash verification passed

ACTIVE NOTIFICATION (appears as dashboard notification badge):
  - L3 new fix found and applied (educational — you want to know)
  - OpenHands fix ready for your review
  - Skill upgrade available (found after skill failure)
  - Weekly Librarian report ready
  - Backup failed and was retried successfully

URGENT NOTIFICATION (persistent card on dashboard, cannot dismiss until resolved):
  - L4 escalation (human action required)
  - API key expired
  - Backup failing for > 24 hours
  - FalkorDB data corruption (even if auto-restored)
  - Skill hash mismatch detected (potential tampering)

NOTIFICATION FORMAT (L4 cards are always this structure):
  ┌─────────────────────────────────────────────────────────┐
  │ ⚠ [Service] needs attention                             │
  │                                                         │
  │ Plain English: what is broken / what you can't do now  │
  │                                                         │
  │ What I tried: [numbered list of what Janitor attempted] │
  │                                                         │
  │ What you need to do: [one clear action, or "Unknown —   │
  │ here are the logs" with a link]                         │
  │                                                         │
  │ [Action button if applicable]      [Dismiss]            │
  └─────────────────────────────────────────────────────────┘
```

---

### THE /HEALTH DASHBOARD PAGE — FULL SPEC

```
SECTION 1 — SERVICE STATUS (live, WebSocket push every 30s)
  For each service:
  ● green  = healthy, responding normally
  ◑ amber  = degraded (high latency, elevated errors, or L1/L2 in progress)
  ● red    = down (L3/L4 escalation in progress)
  ○ grey   = not expected to be running right now

  TABLE COLUMNS:
  Service | Status | Last check | Uptime | Memory | CPU | Version | Last incident

SECTION 2 — API STATUS
  Gemini API:          ✓ valid (checked 2h ago)
  Claude API:          ✓ valid (checked 2h ago)
  Google Workspace:    ✓ OAuth valid (refreshed 47min ago)
  Cloudflare Tunnel:   ✓ reachable externally

SECTION 3 — MAINTENANCE LOG (last 10 events)
  [timestamp] AUTO-FIXED: Multica DB lock released (L2 playbook)
  [timestamp] BACKUP: Daily backup completed (all 5 items)
  [timestamp] HEALTH: All services green (30-min sweep)
  [timestamp] WIKI-LINT: 0 broken links found
  [timestamp] SKILLS: All 23 skill hashes verified

SECTION 4 — STORAGE
  Disk usage per volume:
  llm_wiki/:          2.3 GB  [████░░░░░░] 23%
  backups/:           8.1 GB  [████████░░] 81% ← amber warning
  Docker volumes:     4.2 GB  [████░░░░░░] 42%
  
  Backup retention: 30 days | Oldest: 2026-04-25 | Newest: 2026-05-25

SECTION 5 — PENDING ITEMS
  [ ] 2 skills in quarantine — awaiting your review
  [ ] Librarian weekly report ready (12 items)
  [ ] Update available: FalkorDB v4.3 (current: v4.2)

SECTION 6 — QUICK ACTIONS
  [Run health check now]   [Run backup now]   [Run Janitor now]
  [Run Librarian now]      [Safe update...]   [View full logs]
```

---

### THE sentinel.sh CLI — COMPLETE COMMAND SET

```bash
# Service management
./sentinel start              # docker-compose up -d (all services)
./sentinel stop               # docker-compose down
./sentinel restart [service]  # restart one service in dependency order
./sentinel status             # print health table to terminal

# Maintenance
./sentinel health             # run full health sweep, print results
./sentinel backup             # run backup now, verify integrity
./sentinel restore --date YYYY-MM-DD  # restore from date
./sentinel update             # safe update with rollback (see below)
./sentinel janitor            # trigger Janitor immediately
./sentinel librarian          # trigger Librarian immediately

# Diagnostics
./sentinel logs [service]     # tail last 200 lines of service logs
./sentinel logs [service] --follow  # live tail
./sentinel playbooks          # list all known failure patterns
./sentinel incidents          # list all incidents (last 30 days)
./sentinel check-api          # verify all API keys are valid

# Wiki
./sentinel lint-wiki          # run wiki link validation
./sentinel wiki-index         # regenerate _index.md

# Skills
./sentinel skill-verify       # verify all approved skill hashes
./sentinel skill-quarantine   # list skills awaiting your review
```

**adamos-update.sh logic (the safe update flow):**
```bash
1. Run health check — REFUSE to update if any service is red
2. Create full backup (same as daily backup)
3. For each service with a newer digest available:
   a. Pull new image
   b. Stop old container
   c. Start new container with updated image
   d. Run health check (60s timeout)
   e. If healthy: continue to next service
   f. If unhealthy: roll back this service to previous image, stop update, alert
4. Run full health check on all services after update
5. Write update log: what was updated, from which version to which
6. Notify dashboard: "Update complete: X services updated"
```

---

### LEVEL 4 — SELF-IMPROVEMENT AND PROACTIVE CAPABILITY

These are never automatic. They are suggestions that appear on your dashboard.

```
LEVEL 4 — SELF-IMPROVEMENT (weekly, Sunday report)
  What Janitor analyses:
  - Which skills were used most this week (top 5)?
  - Which skills had the highest failure rate?
  - Which skills had the highest latency?
  - Which skills were never used (candidates for removal)?
  - Any Sesh Summaries mentioning recurring friction?
  
  Output (dashboard notification, non-urgent):
  "Weekly optimisation ideas:
   - [Skill X] used 47 times — performance could improve (details)
   - [Skill Y] failed 3 times — upgrade available
   - [Skill Z] unused for 30 days — remove to reduce attack surface?
   Want me to look into any of these?"
  
  You: approve / dismiss each item individually.

LEVEL 5 — PROACTIVE CAPABILITY (monthly)
  What Janitor analyses:
  - Patterns in your questions to Amy (what do you ask repeatedly?)
  - Recurring Multica tasks of the same type
  - Manual work appearing in journal entries that could be automated
  
  Output (monthly digest):
  "Patterns I noticed this month:
   - You manually checked competitor pricing 9 times (automatable)
   - You asked Amy to summarise emails 23 times (could be a morning brief)
   - ColorKit review monitoring: you asked 5 times (could be a daily alert)
   Want me to build any of these?"
  
  You: "Yes, build the pricing tracker" → Capability Engine triggers.
```

---

## MEMORY ARCHITECTURE — THREE LAYERS, ONE JOB EACH

```
LAYER 1 — GRAPHITI (Temporal Memory)
  What: Who said what, when. Facts that change over time. Entity relationships.
        The full, unedited, running record of everything.
  Scope: Per-project GROUP (context isolation enforced here)
  Written by: Agents auto-commit session summaries. Never manual.
  Read by: Amy (scoped groups). Kai (all groups). Librarian (all groups).
  Tech: Graphiti Python library → FalkorDB (Redis-based graph DB)
  Volume: MUCH more than LLM-Wiki — by design. This is the full record.
  NOT for: stable facts you want to navigate visually

LAYER 2 — LLM-WIKI (Compiled Knowledge)
  What: Stable, curated, interlinked facts. Research output. Decisions.
        Project docs. Personal notes. The navigable, human-approved subset.
  Scope: wiki/ directory, sub-foldered by project
  Written by: Agent proposals + YOUR approval (except 3 auto-writes below)
  Read by: Any agent via wiki-read skill (path-scoped)
  Tech: Plain markdown on disk. [[wiki-links]] clickable. File server.
  Volume: MUCH less than Graphiti — this is curated, not a log.
  NOT for: raw conversation history or frequently-changing data

LAYER 3 — MULTICA (Task State)
  What: Current objectives, tasks, subtasks, progress, blockers, handoffs.
  Scope: Per-project WORKSPACE
  Written by: Kai + Architect create tasks. Any agent updates status.
  Read by: Kai (primary). Amy reads summaries for awareness.
  Tech: Multica v0.3.1 self-hosted (SQLite or Postgres under hood)
  NOT for: factual knowledge or conversation history

AUTO-WRITE PERMITTED (no approval needed):
  1. Sesh Summaries    → sessions/YYYY-MM-DD-[project].md
  2. Daily journal     → sessions/journal/YYYY-MM-DD.md
  3. Health logs       → maintenance/logs/YYYY-MM-DD-health.json

EVERYTHING ELSE in wiki/ requires your explicit approval.
Even the Librarian only proposes — it never writes.
```

**Graphiti project groups** (exact names, these are the context boundaries):
```
personal       → your personal life, goals, relationships, schedule
colorkit       → ColorKit project, subscription system, extension, SaaS
AdamOS  → this system itself
shared-work    → facts that apply across all work (your tech preferences, business context)
[new-project]  → one per project, created when project starts
```

Amy reads: `personal` + `shared-work` + `[active project if mentioned]`
Kai reads: all groups, cross-project when needed
Cross-group reads require explicit tool call — never automatic

**Memory conflict resolution** (Librarian handles, you decide):
```
Type A — Stale wiki: wiki says X, Graphiti shows X changed to Y over time
  → Librarian flags it, shows you the timeline of change → you decide

Type B — Missing entry: important fact appears 5+ times in Graphiti, no wiki page
  → Librarian drafts a wiki page, shows you draft → you approve/edit/reject

Type C — Broken wiki link: [[link]] points to deleted/renamed file
  → wiki-lint.sh catches daily → dashboard health page shows broken links

Type D — Cross-project bleed: Graphiti fact from project A appears in project B context
  → Should NOT happen if group IDs are correct → Librarian alerts immediately
```

---

## CONTEXT ENGINEERING RULES

These are architectural constraints. Every agent and every session must follow them.

**Rule 1 — One Active Project Per Session**
```
active_project = "colorkit"   # set at session start
                               # changes ONLY on explicit: "switch to AdamOS"
                               # switching: clear working context, load new project
```

**Rule 2 — Graphiti Groups Are Inviolable**
Every Graphiti write includes a `group_id`. Every read specifies `group_id`.
Cross-group reads require explicit tool call. Never done automatically.

**Rule 3 — LLM-Wiki Paths Are Context Boundaries**
```
wiki/personal/         → only in personal sessions
wiki/work/colorkit/    → only in colorkit sessions
wiki/projects/         → only in that project's sessions
wiki/work/shared-context/ → loadable from any work session (explicit call only)
```

**Rule 4 — Multica Workspaces Are Task Isolation**
Each project = one workspace. Agent only loads tasks from the active workspace.

**Rule 5 — Sesh Summaries Are Bounded and Structured**
Hard limit: 500 words. Six sections only. If more is needed → wiki page, not summary.
Old summaries are archived, not accumulated in context.

**Rule 6 — Skills Are Stateless**
When an agent calls a skill, the skill receives only what is explicitly passed.
Skills have no access to conversation history, Graphiti, or wiki unless explicitly passed.

**Rule 7 — No Autonomous Wiki Writes Except Three Things**
Session summaries, daily journal, health logs. Everything else needs your approval.
Even the Librarian only proposes — it never writes.

---

## MODEL ROUTING

Configured in `services/hermes/config.yml`. Applies to all background agents.
Amy and Kai have their own explicit model assignments.

```yaml
model_routing:
  tiers:
    free:
      model: "ollama/deepseek-r1:7b"
      use_for:
        - simple questions (< 2 sentences)
        - status checks, quick lookups
        - journal entries
        - "what tasks do I have today"
        - all Janitor operations
        - Skill Scout scouting runs

    standard:
      model: "anthropic/claude-haiku-4-5"
      use_for:
        - multi-step reasoning (not planning)
        - task decomposition (Architect, simpler goals)
        - Librarian memory review
        - email drafting (Amy)
        - summarisation of long documents

    premium:
      model: "anthropic/claude-sonnet-4-6"
      use_for:
        - ALL Kai sessions
        - architecture decisions
        - research synthesis (Researcher agent)
        - business strategy discussions
        - any session starting with "let's plan"
        - OpenHands (it uses Sonnet as its model)

  fallback: free   # if any API fails, drop to free tier, never break
```

---

## FULL REPOSITORY STRUCTURE

```
AdamOS/                              ← private GitHub repo
│
├── docker-compose.yml                      ← ONE command starts everything
├── docker-compose.override.yml             ← local dev overrides (gitignored)
├── .env                                    ← ALL secrets (gitignored)
├── .env.example                            ← template with placeholder values
├── Makefile                                ← friendly shortcuts
│
├── caddy/
│   └── Caddyfile                           ← ALL routing rules in one file
│
├── services/
│   ├── pipecat/                            ← Amy's voice (fork of gemini-live-web-starter)
│   │   ├── server.py                       ← Pipecat FastAPI server
│   │   ├── tools/                          ← Amy's voice tools (calendar, memory, handoff)
│   │   └── requirements.txt
│   │
│   ├── hermes/                             ← Background agents ONLY (not Amy/Kai UI)
│   │   ├── config.yml                      ← model routing, API key refs
│   │   ├── personas/
│   │   │   ├── janitor.md                  ← Janitor system prompt
│   │   │   ├── librarian.md
│   │   │   ├── researcher.md
│   │   │   └── skill-scout.md
│   │   └── skills/                         ← auto-generated + curated skills
│   │       ├── research-firecrawl.md
│   │       ├── multica-task-create.md
│   │       ├── graphiti-recall.md
│   │       ├── wiki-read.md
│   │       ├── wiki-propose.md
│   │       └── repo-scout.md
│   │
│   ├── multica/
│   │   ├── multica.yml                     ← workspace definitions
│   │   └── squads.yml                      ← agent team configs
│   │
│   ├── graphiti/
│   │   ├── config.yml
│   │   └── groups.yml                      ← one group per project (context isolation)
│   │
│   ├── openhands/
│   │   └── config.toml                     ← workspace mount, security restrictions
│   │
│   └── firecrawl/
│       └── .env.firecrawl
│
├── llm_wiki/                               ← THE KNOWLEDGE BASE
│   ├── CLAUDE.md                           ← wiki schema, governance rules, lint rules
│   ├── _index.md                           ← auto-generated master index
│   │
│   ├── raw/                                ← immutable sources (never edited by agents)
│   │   ├── personal/
│   │   ├── work/
│   │   │   └── colorkit/
│   │   └── projects/
│   │       └── AdamOS/
│   │
│   ├── wiki/                               ← compiled, interlinked, navigable pages
│   │   ├── personal/                       ← YOUR personal notes, goals, life docs
│   │   │   ├── about-me.md                 ← loaded by Amy every session start
│   │   │   ├── goals/
│   │   │   ├── notes/
│   │   │   └── journal-archive/
│   │   │
│   │   ├── work/                           ← professional / business knowledge
│   │   │   ├── colorkit/
│   │   │   │   ├── overview.md
│   │   │   │   ├── architecture.md
│   │   │   │   ├── roadmap.md
│   │   │   │   └── decisions/
│   │   │   └── shared-context/             ← facts across all work projects
│   │   │       ├── my-tech-stack.md
│   │   │       └── business-context.md
│   │   │
│   │   └── projects/
│   │       ├── AdamOS/              ← this system's own wiki
│   │       │   ├── overview.md
│   │       │   ├── architecture.md
│   │       │   ├── skills/                 ← auto-generated skill pages
│   │       │   └── decisions/
│   │       └── [new-project]/              ← add when project starts
│   │
│   └── sessions/                           ← Sesh Summaries + daily journal
│       ├── YYYY-MM-DD-[project].md         ← Sesh Summaries (auto-written)
│       └── journal/
│           └── YYYY-MM-DD.md              ← daily journal (auto + your notes)
│
├── dashboard/                              ← Next.js 15 — the unified interface
│   ├── pages.config.ts                     ← THE ONLY place to register pages
│   ├── app/
│   │   ├── layout.tsx                      ← root layout, sidebar nav (data-driven)
│   │   ├── page.tsx                        ← Command Centre (home)
│   │   ├── amy/page.tsx                    ← Amy voice + text chat
│   │   ├── kai/page.tsx                    ← Kai planning sessions
│   │   ├── tasks/page.tsx                  ← Multica board
│   │   ├── wiki/
│   │   │   ├── page.tsx
│   │   │   └── [...path]/page.tsx          ← dynamic wiki page reader
│   │   ├── skills/page.tsx                 ← Capability Engine map
│   │   ├── health/page.tsx                 ← system health + Janitor logs
│   │   ├── journal/page.tsx               ← daily journal
│   │   ├── memory/page.tsx                ← Graphiti explorer (debug)
│   │   └── agents/page.tsx                ← Hermes WebUI wrapper + status
│   │
│   ├── components/
│   │   ├── amy/                            ← Pipecat voice component + text chat
│   │   ├── kai/                            ← Kai workspace panel + task tree
│   │   ├── wiki/                           ← markdown renderer, [[link]] nav, search
│   │   ├── health/                         ← service status indicators
│   │   └── shared/                         ← buttons, modals, cards, sidebar
│   │
│   └── lib/
│       ├── multica.ts                      ← Multica API client
│       ├── graphiti.ts                     ← Graphiti API client
│       ├── wiki.ts                         ← filesystem wiki reader/writer
│       ├── hermes.ts                       ← Hermes REST + WebSocket client
│       └── health.ts                       ← service ping client
│
├── skills_library/
│   ├── QUARANTINE/                         ← external skills awaiting security review
│   │   └── [skill-name]/
│   │       ├── skill.md
│   │       └── sandbox-report.json         ← auto-generated security scan
│   ├── approved/                           ← vetted, safe to use
│   ├── custom/                             ← skills we authored ourselves
│   └── skill_manifest.json                 ← name, source, hash, approval date, status
│
├── maintenance/
│   ├── adamos-health.sh                  ← ping all services, output JSON pass/fail
│   ├── adamos-update.sh                  ← safe update with rollback
│   ├── adamos-backup.sh                  ← snapshot all state
│   ├── adamos-restore.sh                 ← restore from snapshot
│   ├── wiki-lint.sh                        ← validate wiki links + schema
│   ├── playbooks/                          ← auto-written repair playbooks
│   ├── skill-validator/
│   │   ├── Dockerfile.sandbox
│   │   └── validate.py                     ← static analysis + sandbox runner
│   └── logs/                              ← daily health + librarian snapshots
│
├── backups/                                ← gitignored, local backups
│   └── YYYY-MM-DD/
│       ├── graphiti-snapshot.json
│       ├── multica-export.json
│       └── wiki-snapshot.tar.gz
│
└── docs/
    ├── ONBOARDING.md                       ← how to spin up on a new machine
    └── CONTEXT_PROTOCOL.md                 ← full context gate rules (reference)
```

---

## DOCKER SERVICES (COMPLETE)

10 Docker services + 2 local installs. One `docker-compose up` starts everything.

```yaml
services:
  redis:          # Shared between FalkorDB and Firecrawl. One instance, not two.
  falkordb:       # Graphiti's graph DB. Redis-based, 80x faster startup than Neo4j.
                  # depends_on: redis
  firecrawl:      # Research scraping. Auto-manages Playwright.
                  # depends_on: redis, playwright
  playwright:     # Firecrawl's browser automation dependency
  multica:        # Task management. Workspaces per project.
  pipecat:        # Amy's voice server. Gemini Live + WebRTC.
                  # Python FastAPI, forked from gemini-live-web-starter
  openhands:      # Dev team execution engine. 53%+ autonomous issue resolution.
                  # Mounts AdamOS repo as workspace.
  dashboard:      # Next.js 15. Amy text, Kai, wiki, health, journal, skills, memory.
  caddy:          # Reverse proxy. Routing, HTTPS, auth headers.
                  # depends_on: dashboard, multica, pipecat
  cloudflared:    # Cloudflare Tunnel. Internet access without open ports.
                  # depends_on: caddy

# NOT in Docker (local installs — needs filesystem access):
#   Hermes Agent  → Python + uv virtualenv (background agents: Janitor, Librarian, etc.)
#   Ollama        → Local model server (deepseek-r1:7b for free-tier inference)

# Approximate resource usage:
#   OpenHands: ~2GB RAM  |  FalkorDB: ~500MB  |  Firecrawl: ~400MB
#   Playwright: ~300MB   |  Dashboard: ~210MB  |  Multica: ~180MB
#   Pipecat: ~150MB      |  Caddy: ~50MB       |  cloudflared: ~20MB
```

---

## CADDY ROUTING (WHAT'S EXPOSED VS INTERNAL)

```
sentinel.yourdomain.com {
  # Accessible externally (Cloudflare Zero Trust auth required — your email only)
  handle /amy*       { reverse_proxy dashboard:3000 }   # Amy chat + voice
  handle /kai*       { reverse_proxy dashboard:3000 }   # Kai planner
  handle /wiki*      { reverse_proxy dashboard:3000 }   # LLM-Wiki browser
  handle /tasks*     { reverse_proxy multica:3080 }     # Multica board
  handle /skills*    { reverse_proxy dashboard:3000 }   # Skill library
  handle /health*    { reverse_proxy dashboard:3000 }   # Health page
  handle /journal*   { reverse_proxy dashboard:3000 }   # Daily journal
  handle /memory*    { reverse_proxy dashboard:3000 }   # Graphiti explorer
  handle /           { reverse_proxy dashboard:3000 }   # Command centre

  # Internal only — NOT exposed through Cloudflare Tunnel
  handle /agents*    { reverse_proxy hermes-webui:4000 } # Hermes WebUI (background agents)
  handle /devteam*   { reverse_proxy openhands:3101 }   # OpenHands GUI (code review)
  handle /voice-ws*  { reverse_proxy pipecat:7860 }     # Pipecat WebRTC relay
  # FalkorDB admin, Firecrawl API, MCP endpoints: internal only, no routing
}
```

---

## THE DASHBOARD — ALL PAGES

**Design system:**
```
Style:       Clean Notion/ClickUp-inspired — white-based, not dark
Background:  #FFFFFF (primary), #F7F8FA (surface), #EDEEF0 (border/divider)
Text:        #1A1A2E (primary), #52525B (secondary), #A1A1AA (muted)
Accent:      #2563EB (primary interactive)
Success:     #16A34A (green — healthy)
Warning:     #D97706 (amber — degraded)
Error:       #DC2626 (red — critical)
Font:        Inter (UI), JetBrains Mono (agent output, code, logs)
Sidebar:     240px fixed, white, subtle border-right
```

**Modularity rule — the only pattern allowed:**
```typescript
// pages.config.ts — THE ONLY place to register dashboard pages
export const pages = [
  { id: "home",    label: "Command Centre", icon: "Home",          path: "/" },
  { id: "amy",     label: "Amy",            icon: "MessageSquare", path: "/amy" },
  { id: "kai",     label: "Kai",            icon: "Briefcase",     path: "/kai" },
  { id: "tasks",   label: "Tasks",          icon: "CheckSquare",   path: "/tasks" },
  { id: "wiki",    label: "Wiki",           icon: "Book",          path: "/wiki" },
  { id: "skills",  label: "Skills",         icon: "Puzzle",        path: "/skills" },
  { id: "health",  label: "Health",         icon: "Activity",      path: "/health" },
  { id: "journal", label: "Journal",        icon: "Calendar",      path: "/journal" },
  { id: "memory",  label: "Memory",         icon: "Brain",         path: "/memory" },
  { id: "agents",  label: "Agents",         icon: "Bot",           path: "/agents" },
  // ADD NEW PAGES HERE ONLY. One entry = one page. Nothing else changes.
]
```

**Page specs:**

`/ — Command Centre`
- Active project selector (top, prominent — changes ALL context across all pages)
- "Start a Sesh" button → opens /amy or /kai with project context pre-loaded
- Today's open tasks (Multica, filtered to active project, max 5)
- Last Sesh Summary excerpt (last 100 words, click to expand)
- Agent status row: Janitor last run, Librarian next run, active agents
- Notification bell: pending wiki proposals, skill reviews, memory conflicts
- Quick stats: tasks open / completed this week / wiki pages / skills active

`/amy — Amy's Interface`
- Left 60%: Chat messages, streaming, voice waveform when active
- Right 40%: Context panel (today's calendar, memory facts loaded, active project)
- Bottom bar: [Voice] [Text] [→ Kai] [Today]
- Voice mode: full-screen, waveform + pulsing ring, full response text below
- Mobile-first: this is what you use from your phone everywhere

`/kai — Kai's Interface`
- Left 55%: Chat, sharper aesthetic than Amy
- Right 45%: Workspace panel (active project, open Multica tasks live, recent Graphiti facts, pending Amy handoffs)
- Bottom bar: [Chat] [New Goal] [Validate] [← Amy]
- Task tree display: collapsible outline when Kai creates tasks
- Multica embedded (reads API directly, not iframed)

`/tasks — Multica Board`
- Multica UI (Caddy proxies at /tasks)
- Project workspace selector at top
- Kanban default, list view toggle
- "Start Sesh on this task" button → opens /kai with task as context

`/wiki — LLM-Wiki Browser`
- File tree: personal/ | work/ | projects/ | sessions/
- Markdown renderer with clickable [[wikilink]] navigation
- Global search Cmd+K across all pages
- "Propose edit" button → diff editor → submits to Librarian queue
- Activity heatmap (files edited per day, last 30 days)
- Status: last lint run, N broken links

`/skills — Capability Engine Map`
- Three columns: Approved | Quarantine | Custom
- Each skill: name, source, description, risk score, date approved, last used, health
- Quarantine: "Review" button → sandbox report + static analysis
- "Find skill for..." → spawns Skill Scout with a brief
- This is the visual map of everything the system can do

`/health — System Health`
```
SERVICE          STATUS    LAST CHECK    UPTIME    MEMORY    VERSION
──────────────────────────────────────────────────────────────────────────
Pipecat (Amy)    ● green   30s ago       14d 6h    150 MB    v0.9
Multica          ● green   30s ago       14d 6h    180 MB    v0.3.1
FalkorDB         ● green   30s ago       14d 6h    500 MB    v4.2
Firecrawl        ● green   30s ago       14d 6h    400 MB    v1.8
OpenHands        ● green   30s ago       14d 6h    2.0 GB    v1.7
Redis            ● green   30s ago       14d 6h    90 MB     v7.4
Caddy            ● green   30s ago       14d 6h    50 MB     v2.9
Cloudflare Tunnel● green   120s ago      14d 6h    (external)
GitHub Backup    ● green   8h ago        —
──────────────────────────────────────────────────────────────────────────
```
- "Run maintenance now" → triggers Janitor immediately
- "Run safe update" → triggers adamos-update.sh
- Last 7 backups with download links
- Log viewer: last 100 lines of any service's Docker logs

`/journal — Daily Journal`
- Calendar strip at top (click any day)
- AUTO section (read-only): today's Sesh Summaries, tasks completed, agent actions
- YOUR NOTES section (editable): plain markdown, saves on blur, timestamped
- All entries time-stamped (HH:MM)
- Stored in: llm_wiki/sessions/journal/YYYY-MM-DD.md

`/memory — Graphiti Explorer`
- Project group selector (colors match project)
- Entity graph: interactive force-directed graph of facts + relationships
- Timeline view: scroll through facts by date added/changed
- "Recent facts" feed: last 20 facts with timestamps
- Conflict queue: Librarian flags with approve/dismiss/edit actions
- Semantic search across selected group

`/agents — Hermes Runtime Monitor`
- Hermes WebUI embedded (Caddy proxy to internal hermes-webui service)
- Our status cards above it: Janitor (last run, next run), Librarian, Researcher, Skill Scout
- Each card: last run, model used, last task, outcome

---

## THE PHASE PLAN

Each phase has a "DONE WHEN" test. Don't move forward until it passes.

---

### PHASE 0 — AMY'S VOICE
**Target**: 2–3 sessions | **Why first**: Can't do anything until you can talk to the system.

```
[ ] Fork pipecat-ai/gemini-live-web-starter
[ ] Get Gemini API key (ai.google.dev — free, no credit card)
[ ] Configure Pipecat server: Python + uv, Gemini Live API key
[ ] Run locally — confirm voice conversation works in browser
[ ] Write Amy's SOUL.md (dedicated interview session — see Gap 1)
[ ] Add SOUL.md as Pipecat system prompt
[ ] Add Graphiti memory recall tool to Pipecat
[ ] Add Google Calendar tool (OAuth one-time setup)
[ ] Add Gmail tool (read + summarise)
[ ] Containerise Pipecat in docker-compose.yml
[ ] Set up Cloudflare Tunnel → test from phone
[ ] Verify iOS Safari voice (WebRTC compatibility — see Gap 2)

DONE WHEN: Talk to Amy by voice from iPhone, she answers, reads your calendar,
           knows who you are from SOUL.md, and drafts an email on request.
```

---

### PHASE 1 — KAI + TASK SYSTEM
**Target**: 2–3 sessions | **Why second**: Can't delegate work until task system exists.

```
[ ] Deploy Multica locally (Docker)
[ ] Configure Multica workspaces: personal, colorkit, AdamOS
[ ] Write Kai's SOUL.md (can do in same interview session as Amy)
[ ] Build /kai page in Next.js (Vercel AI SDK v6, Claude Sonnet streaming)
[ ] Connect Kai → Multica (create tasks, read task status via API)
[ ] Build Architect sub-process (goal → task tree → Multica create)
[ ] Build Amy → Kai handoff brief format (auto-written by Amy)
[ ] Build Kai → Amy return brief format
[ ] Test: tell Amy "I need to plan ColorKit launch" → handoff to Kai
[ ] Test: Kai decomposes goal → shows task tree → you approve → Multica created
[ ] Build Sesh Summary protocol (auto-written at session end)
[ ] Build handoff doc generation and session log

DONE WHEN: Amy hands off to Kai. Kai asks questions, builds structured task tree
           in Multica. You see it in the dashboard. Kai generates a Sesh Summary.
```

---

### PHASE 2 — CAPABILITY ENGINE
**Target**: 3–4 sessions | **Why third**: Without this, every new capability is manual.

```
[ ] Build skill_registry.json with 5 seed skills
    (Google Workspace, Firecrawl, Calendar, Gmail, Multica)
[ ] Build registry query tool (Amy/Kai: "do we have X?")
[ ] Build Stage 1: Skill Scout discovery (agentskills.io, GitHub, npm)
[ ] Build Stage 2: Kai decision logic (adopt / adapt / build brief)
[ ] Build Stage 3A: Adoption path (QUARANTINE/ → sandbox → risk score)
[ ] Build Stage 3B: Build path (Researcher → Kai brief → OpenHands → QUARANTINE/)
[ ] Deploy OpenHands locally (Docker, with security config)
[ ] Build sandbox environment (Docker, no network, no filesystem)
[ ] Build skill-validator (static analysis + sandbox runner)
[ ] Build Stage 4: Amy approval notification flow
[ ] Build Stage 5: Deployment automation (QUARANTINE/ → approved/, registry update)
[ ] Build /skills page in dashboard (registry visual map)
[ ] Write 3 Janitor playbooks for most common failures
[ ] Deploy Hermes Agent locally (Python + uv)
[ ] Configure Janitor cron (6 AM daily)

DONE WHEN: Say "Amy, I want to track mentions of ColorKit on Twitter"
           → Amy triggers Capability Engine → 10 min later Amy asks approval
           → you say yes → skill is active and working.
```

---

### PHASE 3 — SELF-MAINTENANCE
**Target**: 3–4 sessions | **Why fourth**: Reliable foundation before more layers.

```
[ ] Write the 12 pre-built playbooks (all known failure patterns — do this first)
[ ] Install OS-level watchdog (Windows Task Scheduler, check_sentinel.bat)
[ ] Implement L1: 5-min pulse check on user-facing services (Pipecat, Dashboard, Caddy)
[ ] Implement L1: 30-min full sweep, dependency-order restart
[ ] Implement L2: log pattern matching against playbook library
[ ] Implement L2: known-pattern resolution execution
[ ] Implement L3: Kai-assisted AI diagnosis via Claude Sonnet
[ ] Implement L3: new playbook auto-writing on novel resolution
[ ] Implement L3 → L4 escalation (OpenHands fix or human decision card)
[ ] Build L4 notification card format (always specific, always actionable)
[ ] Build API failure handling (Gemini 401/429, Claude 429, Google OAuth refresh)
[ ] Build Janitor self-check (detects its own monitoring gaps)
[ ] Write adamos-backup.sh (all 5 items: Graphiti, Multica, wiki, skills, config)
[ ] Write adamos-restore.sh (with confirmation prompt, dependency-order restore)
[ ] Write adamos-update.sh (health check first, per-service update, auto-rollback)
[ ] Write sentinel.sh (full CLI, all commands from spec)
[ ] Configure daily 6 AM backup cron (Janitor triggers adamos-backup.sh)
[ ] Configure weekly Sunday remote encrypted backup (GitHub Actions)
[ ] Build /health page: service table, API status, maintenance log, storage, quick actions
[ ] Set up WebSocket push from Janitor → /health page (live updates every 30s)
[ ] Build notification badge system (passive / active / urgent tiers)
[ ] Build L4 persistent card (cannot dismiss until resolved)
[ ] Test L1: kill a container → Janitor restarts it → /health shows resolution
[ ] Test L2: create a port conflict → Janitor detects, kills conflict, restarts
[ ] Test L3: introduce unknown failure → Janitor escalates to Kai → Kai diagnoses
[ ] Test L4: expire an API key → Janitor detects → specific actionable card shown
[ ] Test backup: run backup → verify all 5 items → test restore to temp location
[ ] Test Janitor self-resilience: stop Hermes → OS watchdog restarts it

DONE WHEN:
  1. Kill any Docker container → Janitor auto-restores within 5 min → you see "Auto-fixed" on /health
  2. Expire your Gemini API key → dashboard shows specific card telling you exactly what to do
  3. Stop Hermes entirely → OS watchdog restarts it → Janitor resumes cron schedule
  4. Run sentinel restore --date [yesterday] → full system restored → health all green
  You did nothing except approve the restore.
```

---

### PHASE 4 — MEMORY SYSTEM
**Target**: 3–4 sessions | **Why fifth**: Can't remember without storage.

```
[ ] Deploy FalkorDB (Docker)
[ ] Deploy Redis (Docker, shared with Firecrawl)
[ ] Install Graphiti (pip install graphiti-core)
[ ] Create project groups: personal, colorkit, AdamOS, shared-work
[ ] Write Graphiti recall tool for Amy (project-scoped queries)
[ ] Write Graphiti write tool for agents (save facts after sessions)
[ ] Set up LLM-Wiki directory structure (all folders per spec above)
[ ] Write wiki/personal/about-me.md manually (your personal context page)
[ ] Write wiki/projects/colorkit/overview.md manually
[ ] Write wiki/projects/AdamOS/overview.md manually
[ ] Write wiki-read tool (agents query LLM-Wiki by keyword/path)
[ ] Write wiki-propose tool (agents propose edits → your approval gate)
[ ] Build Librarian agent (Hermes cron, Sunday midnight)
[ ] Connect Sesh Summary → Graphiti auto-write at session end
[ ] Connect Sesh Summary → sessions/ filesystem at session end
[ ] Build /wiki page (file tree, markdown renderer, [[link]] nav, Cmd+K search)
[ ] Build /memory page (Graphiti explorer, conflict queue, semantic search)
[ ] Write wiki-lint.sh

DONE WHEN: Have 3 sessions across 3 days. Start fourth session — Amy recalls
           what you worked on in all three without briefing. Context is correct.
```

---

### PHASE 5 — FULL DASHBOARD + INFRASTRUCTURE SHELL
**Target**: 2–3 sessions | **Why sixth**: All pieces exist, now unify.

```
[ ] Complete Next.js dashboard shell with all pages registered in pages.config.ts
[ ] Command Centre page (active project selector + all widgets)
[ ] /journal page (auto + manual, time-stamped)
[ ] /agents page (Hermes WebUI wrapper + status cards)
[ ] Configure Caddy: all services routed under one domain
[ ] Verify Cloudflare Tunnel routes correctly to all pages
[ ] Mobile test: every page usable on iPhone browser
[ ] Build sentinel.sh CLI: start | stop | status | update | backup | restore | lint-wiki
[ ] GitHub Actions: weekly encrypted backup push to private repo

DONE WHEN: Open one URL on iPhone, see all dashboard pages, talk to Amy,
           see live Multica board, see health of all services. Everything unified.
```

---

### PHASE 6 — DEV TEAM (OPENHANDS)
**Target**: 2–3 sessions | **Why seventh**: OpenHands already deployed in Phase 2.

```
[ ] Define "output artifact" format (see Gap 3)
[ ] Build project isolation for OpenHands (workspace mount per project)
[ ] Write Multica → OpenHands task pickup protocol
[ ] Build Kai → OpenHands delegation (brief → execute → return artifact)
[ ] Build Repo Scout skill (Hermes + Firecrawl + GitHub search)
[ ] Build Kai review gate (OpenHands output → Kai reviews → you approve)
[ ] Build /devteam Caddy route (OpenHands web GUI, internal only)
[ ] Test: create Multica task "Add dark mode toggle to dashboard"
          → OpenHands picks it up → Kai reviews → you approve → merged

DONE WHEN: Kai delegates a coding task to OpenHands. OpenHands completes it.
           You review and approve. You wrote no code.
```

---

### PHASE 7 — ADVANCED + ONGOING
```
[ ] Researcher agent + Firecrawl deep research flow
[ ] Research UI (/research page, output visualisation)
[ ] Wiki concept network graph (visual interconnection view)
[ ] Wiki activity heatmap (30-day file edit heatmap)
[ ] Advanced Graphiti queries (relationship mapping, timeline)
[ ] Weekly prints / reports (Kai or Amy generates weekly summary every Monday)
[ ] Multi-project work without bleed (tested across 3+ active projects)
[ ] Performance review: FalkorDB at scale, Graphiti query speed
[ ] Additional skills as needed (Capability Engine handles these automatically)
```

---

## GENUINE GAPS — NEEDS A DECISION OR A SESSION

These are the only things that cannot proceed without more information. Everything else is designed.

| # | Gap | What's needed | Blocks which phase |
|---|-----|--------------|-------------------|
| 1 | **Amy + Kai SOUL.md** | A dedicated interview session — you answer questions about who you are, your projects, your communication style, your schedule patterns. Output: the actual SOUL.md files. This is not research — it's a session to DO. | Phase 0 immediately |
| 2 | **iOS Safari + WebRTC** | Test Pipecat WebRTC on real iPhone browser. Does voice work? If not, what's the fallback (text-only on mobile, or different transport)? | Phase 0 mobile test |
| 3 | **Output artifact format** | Every OpenHands coding task needs to produce a "completed work" artifact that Kai can review. Decision needed: Git branch? File diff? PR to private GitHub? In-dashboard diff viewer? | Phase 6 |
| 4 | **OpenHands → Multica pickup** | How does OpenHands pick up a Multica task? Does it poll the API? Does Kai push via REST? Define the exact handshake. | Phase 2 (partially) and Phase 6 |
| 5 | **Gemini Live WebSocket stability via Cloudflare Tunnel** | Real-world test: WebSocket connection through cloudflared. Does it drop? What's the latency? Is it stable enough for voice? | Phase 0 mobile test |

Everything else in this document is decided. Do not re-debate confirmed tool decisions.

---

## CONFIRMED TOOL DECISIONS (DO NOT REVISIT)

| Component | Tool | Status |
|-----------|------|--------|
| Amy voice | Pipecat (fork gemini-live-web-starter) | ✅ Confirmed V5 |
| Amy text | Gemini 2.5 Flash via Vercel AI SDK v6 | ✅ Confirmed V4 |
| Kai | Claude Sonnet (direct API) | ✅ Confirmed V4 |
| Task board | Multica v0.3.1 | ✅ Confirmed V2 |
| Temporal memory | Graphiti + FalkorDB | ✅ Confirmed V2 |
| Compiled knowledge | LLM-Wiki (Karpathy pattern) | ✅ Confirmed V1 |
| Dev team | OpenHands | ✅ Confirmed V5 |
| Research | Firecrawl (local Docker) | ✅ Confirmed V1 |
| Background agents | Hermes Agent (Python + uv) | ✅ Confirmed V3 |
| Proxy | Caddy | ✅ Confirmed V2 |
| Internet access | Cloudflare Tunnel | ✅ Confirmed V2 |
| Dashboard | Next.js 15 (custom) | ✅ Confirmed V2 |
| Agent monitoring | Hermes WebUI (embedded at /agents) | ✅ Confirmed V5 |

**Rejected tools (do not revisit without evidence of a significant change):**
- Zep → replaced by Graphiti (Community Edition discontinued)
- Open WebUI → Pipecat does voice better; custom Next.js gives deeper integration
- Hermes TUI / Telegram → replaced by Pipecat for Amy's interface
- Neo4j → FalkorDB (Redis-based, 80x faster startup, shares Redis with Firecrawl)
- vLLM → overkill for this hardware and usage pattern at this scale

---

## WHAT TO DO NEXT SESSION

Pick one. Ordered by dependency.

```
OPTION A — Write Amy + Kai SOUL.md (interview session)
  Gap 1. You cannot build Amy without knowing exactly who she is.
  I ask you questions — who you are, how you communicate, your projects,
  your schedule patterns, what Amy should always know, how Kai should behave.
  You answer. I write the SOUL.md files.
  Time: ~1 hour.
  Output: amy-soul.md + kai-soul.md ready to deploy.

OPTION B — Start Phase 0 (fork Pipecat, get Amy talking)
  Requires: Gemini API key + at least basic personality answers first.
  Fork the repo, get voice working locally on laptop.
  Milestone: Amy speaks. She knows your name. She can read your calendar.
  Time: 1–2 sessions.

OPTION C — Lay the infrastructure foundation (docker-compose)
  Build docker-compose.yml with all 10 services, pinned digests.
  Run make health → all green.
  This unblocks every phase that needs running services.
  Time: 1 session.
```

---

## SESSION LOG

Update this after every session. This is how the plan stays coherent.

```
SESSION 001–006 — May 2026
  What happened:   6 rounds of research and planning. V1→V6 written.
  Key decisions:   Two named agents (Amy + Kai). Pipecat for voice. OpenHands for dev.
                   Graphiti replaces Zep. FalkorDB over Neo4j. Custom Next.js over Open WebUI.
                   Hermes refocused to background agents. Capability Engine designed.
                   Two system laws established (self-maintaining + capability on demand).
  Code written:    Zero.
  Next:            Option A (SOUL.md interview) or Option B (fork Pipecat).

SESSION 007 — [date]
  What happened:
  Decisions made:
  Gaps resolved:
  Gaps added:
  Code written:
  Next:
```

---

## MONTHLY COST REFERENCE

| Item | Cost |
|------|------|
| Gemini Flash (Amy text, 250 req/day free) | £0 |
| Gemini Live (Amy voice, free tier) | £0 |
| Ollama deepseek-r1:7b (Janitor, Scout, local) | £0 |
| Claude Sonnet (Kai, 2-3 sessions/day avg) | £30–50 |
| Google Workspace (your existing account) | £0 |
| Cloudflare Tunnel | £0 |
| Domain (~$10/year) | ~£1 |
| Self-hosted electricity (24/7 machine) | ~£5–10 |
| **Total** | **~£40–60/month** |

Compared to: ChatGPT Pro £20 + Claude Pro £20 + Gemini Advanced £20 = £60/month with zero integration, zero memory, zero tasks, zero self-maintenance.

---

## THE PROMISE

```
TODAY (session 1):
  Write SOUL.md. Get Amy's voice working. She knows your name.

MONTH 1:
  Amy and Kai handle 80% of what you need.
  ~20 skills learned from your work patterns.
  Nothing has broken without auto-repair.

MONTH 3:
  ~60 skills, all specific to YOUR workflow.
  Capability Engine has built 15+ things you asked for in one sentence.
  You have done zero maintenance. Janitor handled everything.
  OpenHands has shipped features for your projects.

MONTH 6:
  Dramatically more capable than month 1.
  Amy knows your patterns deeply from 6 months of Graphiti memory.
  The dashboard has grown with your life — new pages, new skills, new tools.
  You have never written code for it.
  You have never configured a service.
  You have never diagnosed a bug.
  This is your life OS.
```

---

*AdamOS GROUND TRUTH — V2.0 — May 2026*
*Supersedes: all V1–V6 planning documents and Ground Truth V1.0*
*Update policy: edit only when a decision is confirmed by working code or a deliberate session decision*
*Next planned update: after Phase 0 completion*
