# Skill: Manage Proactive Event Queue
**File Path**: `skills_library/approved/Manage_Event_Queue.md`
**Target Agent**: The Forge (for creation), Kai (for logic delegation)

> [!NOTE]
> This is a **Markdown Skill Document**. It is not executable code. When an agent is asked to "manage notifications" or "build a new webhook for Amy," they will retrieve this document to understand the strict architectural rules they must follow.

## User Review Required

> [!IMPORTANT]
> Please review this skill logic. Does the database schema (id, type, message, trigger_time, status) capture everything Amy would need to alert you properly?

---

## 1. System Architecture Overview
The AdamOS proactive notification system is entirely driven by a single SQLite database table located at `data/events.db`. 

**The Schema:**
```sql
CREATE TABLE event_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,         -- e.g., 'amy_chat', 'github_webhook', 'calendar_api'
    type TEXT NOT NULL,           -- e.g., 'reminder', 'task_complete', 'email_alert'
    message TEXT NOT NULL,        -- The exact string Amy will speak aloud or send to Telegram
    trigger_time DATETIME,        -- When this should trigger (can be NULL if immediate)
    telegram_fallback BOOLEAN DEFAULT FALSE, -- If TRUE, send to Telegram if user is away
    status TEXT DEFAULT 'pending' -- 'pending', 'processing', 'completed', 'failed'
);
```

**The Rule of Decoupling & Routing:**
No agent or external API is allowed to trigger Amy's voice or send a Telegram message directly. Everything MUST write a row to the `event_queue` table. 

A separate, untouchable background daemon reads this table. When an event is due, it simply executes the notification:
- It ALWAYS triggers Amy's Text-To-Speech (TTS) on the dashboard.
- If `telegram_fallback` is TRUE: It ALSO routes the `message` to the configured Telegram bot API simultaneously.

---

## 2. Standard Operations (Agent Workflow)

When the user asks you to interact with the notification system, follow these operational paths:

### Path A: Basic Reminder or Timer
If the user says: *"Remind me in 30 minutes to call Sarah. Send to telegram if I'm not here."*
1. Do not write a new script.
2. Execute the existing Python tool: `add_event_trigger.py`
3. Pass the parameters: `source="amy_chat"`, `message="Reminder: Call Sarah"`, `trigger_time=[current time + 30m]`, `telegram_fallback=true`.

### Path B: Building a New External Integration (Webhook)
If the user says: *"Set up a way for me to get a notification when my Stripe account gets a payment."*
You (The Forge) must build a new integration. You must strictly follow this pattern:
1. **Do not** modify the core background daemon.
2. **Do** write a lightweight, standalone Python FastAPI script (e.g., `stripe_webhook.py`).
3. This script must have exactly one endpoint (e.g., `POST /webhooks/stripe`).
4. The endpoint's ONLY job is to parse the incoming JSON from Stripe, format a user-friendly message, and execute an `INSERT INTO event_queue` SQL command.
5. Save the new script to `skills_library/testing/` and run the `scan_for_malware` tool on it.
6. Await user approval to deploy.

### Path C: Task Dependency Notifications
If the user says: *"Tell me when Kai finishes researching the market."*
1. Identify the Multica Task ID for the research task.
2. The Multica system already has an internal hook that fires when a task status changes to "done".
3. You do not need to build a new script. Inform the user that Multica will automatically write a `task_complete` event to the `events.db` when Kai marks it finished.

---

## 3. Maintenance & Debugging
If the user says: *"Why isn't Amy reminding me about things?"*
1. Execute a SQL query on `data/events.db` to check for rows stuck in the `pending` or `processing` status.
2. If rows are stuck, the background polling daemon has crashed. 
3. Hand off the issue to **The Janitor** to trigger the L1 restart sequence on the `proactive_daemon` Docker container.
