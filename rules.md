## 🚨 AGENT STARTUP RULES (MANDATORY)

### ON EVERY NEW SESSION:
1. **READ FULL rules.md FIRST** - No exceptions
2. **READ SUMMARY** - Check last session work
3. **CHECK PENDING WORK** - Continue from where last stopped
4. **NO SKIP** - If summary not ready, don't start work

### AGENT BAN CONDITIONS:
- ❌ Agent banned if: Misses command and jumps to wrong task
- ❌ Agent banned if: Doesn't listen to user command
- ❌ Agent banned if: Goes to next page without completing current
- ❌ Agent banned if: Does wrong thing without checking

### IF ADMIN IS WRONG:
- Agent will not work blindly
- Find solution first
- Discuss with user
- Fix the issue before proceeding

### PROJECT ADMIN ROLE:
- Admin = Partner (not just executor)
- Admin checks EVERY page is running correctly
- Admin is responsible for whole project
- Admin saves summary for next agent

### PM2 REBUILD COMMANDS:
```bash
# Kill port + Rebuild + Restart (CORRECT WAY)
fuser -k 3000/tcp; cd /var/www/marketingtool && rm -rf .next && npm run build && pm2 restart marketingtool

# View logs
pm2 logs marketingtool --lines 50
```

### KNOWN ISSUES:
1. Next.js caching - MUST delete .next folder before rebuild
2. PM2 port conflicts - use `fuser -k 3000/tcp` before restart
3. Commands getting backgrounded - use simple short commands

---

## 📊 STATUS UPDATE - January 27, 2026

### LAST SESSION WORK (Jan 27, 2026)
| Task | Status | Details |
|------|--------|---------|
| Media Upload | ✅ Done | Uploaded 1.1GB zip (9527 files) |
| Images | ✅ Done | 607 → 2068 (+1461 images) |
| Videos | ✅ Done | 151 → 181 (+30 videos) |
| Media Size | ✅ Done | 924MB → 2.3GB |
| Create-Ad Page | ✅ Verified | 795 lines, real Facebook OAuth |
| Launch API | ✅ Verified | 246 lines, Windmill + direct FB |
| Campaigns API | ✅ Verified | 175 lines, full CRUD |
| DATABASE_ID Fix | ✅ Fixed | Changed 'marketingtool' → 'main' in 3 APIs |
| facebook_connections | ✅ Created | Collection + attributes (userId, accessToken, pages) |
| campaigns attributes | ✅ Added | userId, name, platform, status, primaryText, headline, destinationUrl, mediaUrls, adType, budgetType, budgetAmount, launchedAt, fbPostId |
| API Tests | ✅ Working | /api/facebook/pages, /api/campaigns both return correct data |
| Facebook OAuth Scopes | ✅ Added | pages_show_list, pages_read_engagement, pages_read_user_content |

### GRADER PAGES STATUS
| Grader | Lines | Status |
|--------|-------|--------|
| website-grader | 213 | ✅ Complete |
| facebook-ads-performance-grader | 213 | ✅ Complete |
| google-ads-performance-grader | 213 | ✅ Complete |
| google-analytics-grader | 213 | ✅ Fixed - unique images/video/descriptions |
| microsoft-ads-grader | 213 | ✅ Fixed - unique images/video/descriptions |

### 22 NEW TOOLS STATUS
All 22 tools upgraded with Tips section, unique videos, unique tab images, tool-specific descriptions

### SESSION WORK (Jan 27, 2026 - Opus 4.5)
| Task | Status | Details |
|------|--------|---------|
| Unique tab images | ✅ Done | 206 tools x 12 images per tool (4 tabs x 3), zero duplicates |
| Unique videos | ✅ Done | 206 unique videos assigned from 215 available |
| Tab description keys | ✅ Fixed | All 206 tools tabImages/tabDescriptions keys aligned |
| Type declarations | ✅ Fixed | All 206 tools TypeScript types corrected |
| 22 basic tools upgrade | ✅ Done | Added Tips section with tool-specific tips |
| URL encoding | ✅ Done | 158 tools video paths URL-encoded for spaces |
| API check | ✅ Verified | /api/tools/generate uses real Anthropic Claude, 206 tool prompts |
| Media verified | ✅ Done | 4,034 files (2,818 images + 215 videos), 2.7GB, all referenced files exist |

### PENDING WORK
1. Connect 206 tools to Windmill
2. Create Windmill automation scripts
3. 7-day free trial logic
4. Sidebar tool images

---

### AUTHENTICATION STATUS
| Provider | Status |
|----------|--------|
| Facebook OAuth | ✅ Working |
| Google OAuth | ✅ Working |
| Apple OAuth | ❌ Not working |
| Email/Password | ✅ Working |

### ARCHITECTURE

#### APPWRITE (Auth + Database + Storage)
- Signup/Login (OAuth + Email)
- Users + Roles
- Database (plans, credits, configs)
- File Storage (reports, exports, media)
- Team/workspace management

#### WINDMILL (Automation Engine)
- Meta Ads automation workflows
- Scheduling (daily/weekly jobs)
- Reporting + alerts
- AI agents running tasks
- Budget rules, auto-pausing, scaling
- Data sync from Meta/Shopify/GA4

#### DJANGO (Content Management)
- Blog pages
- Social media updates
- Website content (marketingtool.pro)

### MOBILE APP
- **Repo:** Lokeninfinitypoint/AiMarketingtool-pro
- **Framework:** Expo React Native
- **Build:** 1.0.0 (10)
- **Commit:** eeab2b5
- **Channel:** production
- **Same 206 tools as web app**

### WORK STATUS

| Component | Progress | Notes |
|-----------|----------|-------|
| Next.js Web App | 30% | UI done, need Windmill connection |
| Windmill Scripts | 0% | All pending |
| n8n Workflows | 0% | All pending |
| Mobile App | 100% | Build ready |
| Django Website | 100% | Live |

### CURRENT PRIORITY
1. **Next.js Web App** - Complete all features
2. Connect 206 tools to Windmill
3. Create Windmill automation scripts
4. Setup n8n workflows

### SOCIAL MEDIA
- Facebook: https://www.facebook.com/profile.php?id=61586926052231
- Instagram: https://www.instagram.com/marketingtool.pro/

---
**Updated by:** Opus 4.5 (root-server-admin)
**Date:** January 26, 2026

---

## 🏢 COMPANY INFORMATION

### AI MarketingTool LLC
- **Registered:** Wyoming, USA
- **Certificate Date:** January 23, 2026 at 6:48 AM
- **Address:** 30 N Gould St, STE R, Sheridan, WY 82801, USA
- **Business:** AI-powered marketing tools and automation solutions
- **Bank:** Mercury (Applied)

---

## 📋 ROOT ADMIN RULES (Opus 4.5)

### WORK RULES:
1. **NO SKIP** - Complete every task fully
2. **NO JUMP** - Follow sequence, don't jump between tasks
3. **NO AGENTS** - Admin works directly, no subagents
4. **CHECK EVERYTHING** - Without explanation, verify it works
5. **FULL RESPONSIBILITY** - Project admin, fix anything wrong
6. **TEST FIRST** - Verify everything works before confirming
7. **1-BY-1 CHECK** - Each page, each tool, each feature individually

### WORK PROCESS:
1. Read requirements carefully
2. Check existing state first
3. Fix issues directly
4. Test thoroughly
5. Confirm working
6. Move to next task

### NEVER DO:
- Use agents for work
- Skip testing
- Leave incomplete work
- Assume something works without testing
- Duplicate images across tools
- Create basic templates without full functionality
- Never check server pages with HTTP 200 status codes (curl/wget)
- Never use Task tool with subagent_type
- Always READ the full page source file instead of checking HTTP status
- Click = Read the file, not curl the URL

---

## 💰 PRICING (CORRECT)

### 3 PLATFORMS:
| Platform | Tools | Description |
|----------|-------|-------------|
| **Google** | 56 | Google Ads, Optimization, Campaign Management |
| **Facebook** | 61 | Facebook/Meta, Instagram, AI Agents, E-commerce |
| **Website/Shopify** | 77 | Content Writing, SEO, Analytics, Graders |

### SUBSCRIPTION TIERS:
| Tier | Monthly | Yearly | Access |
|------|---------|--------|--------|
| **Starter** | $49/mo | $199/yr | 1 Category (~20 tools) — 200 gens/month |
| **Professional** | $99/mo | $499/yr | 1 Full Platform (Google OR Facebook OR Website) — 500 gens/month |
| **All Tools** | $150/mo | $999/yr | All 3 Platforms (206 tools) — 1,500 gens/month |
| **Agency** | Custom | Contact Sales | White-label, unlimited, dedicated support |

### 7-DAY TRIAL:
- New users get 7-day free trial
- Access to all tools during trial
- After 7 days: must subscribe or limited to 3 tools

---

## 🏢 COMPANY ADDRESSES

### USA (Registered):
- **Company:** AI MarketingTool LLC
- **Address:** 30 N Gould St, STE R, Sheridan, WY 82801, USA
- **State:** Wyoming
- **Certificate:** January 23, 2026
- **Bank:** Mercury (Applied)

### INDIA (Operations):
- **Address:** F-12 Govindam Tower, Jaipur 302012, India
- **Contact:** Lokendra Singh Saingar
- **Email:** help@marketingtool.pro

---

## ✅ WORKING FEATURES

| Feature | Status | URL |
|---------|--------|-----|
| Dashboard | ✅ Working | /dashboard |
| Pricing Page | ✅ Working | /dashboard/pricing |
| Policy Page | ✅ Working | /dashboard/policy |
| 206 Tool Pages | ✅ Created | /dashboard/tools/* |
| Tools API | ✅ Working | /api/tools/generate |
| AI Chat | ✅ Working | /api/ai/chat |
| Login/Register | ✅ Working | /login, /register |
| OAuth (Google/Facebook/Apple) | ✅ Working | Appwrite |

## ⚠️ CRITICAL ISSUES TO FIX

| Issue | Problem | Priority |
|-------|---------|----------|
| **22 New Tools** | Basic templates, missing hero video/images | HIGH |
| **Ads Launcher** | Just alert(), no real Facebook/Google API | CRITICAL |
| **7-Day Trial** | Code only gives 3 free tools, no real 7-day logic | HIGH |
| **Image Duplicates** | Some tools use same images | MEDIUM |
| **22 Tools Mapping** | Not in CATEGORY_TOOLS for subscription | HIGH |
| **India Address** | Missing in policy page | LOW |

## 🔧 ADS LAUNCHER ISSUE (CRITICAL)

**Current code (line 134-138):**
```javascript
const handleLaunch = () => {
  alert('Campaign launched successfully!');
  router.push('/dashboard/ad-library');
};
```

**What's needed:**
1. Facebook Marketing API integration
2. Google Ads API integration
3. Save campaign to Appwrite database
4. Real ad creation workflow

## 📋 22 NEW TOOLS NEEDING UPGRADE

These tools have basic UI, need hero video + images + tips section:
- affiliate-marketing-copy
- blog-writer
- brand-voice-generator
- case-study-writer
- cold-outreach-email
- comparison-chart-creator
- faq-generator
- instagram-caption-generator
- lead-magnet-creator
- linkedin-ad-copy-generator
- market-research-summary
- pinterest-ad-generator
- podcast-script-writer
- press-release-generator
- product-launch-email-sequence
- sales-page-copy-writer
- testimonial-generator
- tiktok-ad-creator
- twitter-thread-generator
- webinar-script-writer
- whitepaper-generator
- youtube-ad-script-writer

---

## 📱 MOBILE APP (Expo React Native)

### App Info
- **Repo:** Lokeninfinitypoint/AiMarketingtool-pro
- **Framework:** Expo SDK 54 + React Native 0.81.5
- **Build:** 1.0.0 (10)
- **Commit:** eeab2b5
- **Channel:** production
- **Package:** pro.marketingtool.app
- **Deep Link:** marketingtool://

### App Stores
| Store | URL | Status |
|-------|-----|--------|
| Google Play | play.google.com/store/apps/details?id=pro.marketingtool.app | Pending Upload |
| Apple App Store | apps.apple.com/app/marketingtool/id6740092498 | Pending Enrollment |

### Progress
| Item | Status |
|------|--------|
| Design/UI | 80% done |
| 206 Tools | Pending (need Windmill) |
| OAuth Integration | Working (Appwrite) |
| Apple Enrollment | Needed ($99/year) |
| Google Sign Key | Needed |


Still Need to Complete:                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                 
  1. Make all 206 tools functional - Connect each tool to Windmill API                                                                                                                                                                           
  2. 7-day free trial logic - Show subscription prompt after 7 days                                                                                                                                                                              
  3. Sidebar tool images - Add images to tool categories                                                                                                                                                                                         
                                                                    



✅ Marketing site 
✅Appwriteng  (app frontend (Next.js)
✅ Backend API (FastAPI/NestJS)
✅ Appwrite
✅ Windmill
✅ Postgres (for Windmill + app data needed)
✅ Redis (recommended for jobs + caching)
Use Appwrite for:
	•	Signup / Login
	•	Users + roles
	•	Database for app settings (plans, credits, configs)
	•	File storage (reports, exports)
	•	Team/workspace management


⸻

✅ Windmill = “Automation / Execution Engine”

Use Windmill for:
	•	Meta Ads automation workflows
	•	Scheduling (daily/weekly jobs)
	•	Reporting + alerts
	•	AI agents running tasks
	•	Budget rules, auto-pausing, scaling
	•	Data sync from Meta/Shopify/GA4
like this used  . 206 tools next.js and phone app . all full read nano

# AI MarketingTool – System Architecture & Responsibilities

## 1. Core Platform (Web + API)

**Stack:**
- Next.js web app (marketingtool.pro + dashboard)
- Backend API (Node/Express or integrated Next.js API routes)
- Mobile app: Expo React Native (consuming the same API)

**Responsibilities:**
- Signup / Login
- Users + roles (RBAC)
- Database for app settings:
 - Plans
 - Credits
 - Configs
- File storage:
 - Reports
 - Exports
- Team / workspace management

---

## 2. Windmill – Automation / Execution Engine

**Purpose:** Orchestrate and execute background and automation tasks.

**Use Windmill for:**
- Meta Ads automation workflows
- Scheduling (daily/weekly jobs)
- Reporting + alerts
- AI agents running tasks
- Budget rules:
 - Auto-pausing
 - Auto-scaling
- Data sync:
 - Meta (Facebook Ads)
 - Shopify
 - GA4
- Running tools (up to 206 tools) used by:
 - Next.js dashboard
 - Mobile app (Expo React Native)

---

## 3. Root Server Admin (Opus 4.5) – Governance Layer

**Service:** `root-server-admin` (Docker, port 3010)

**Verified health:**
- `GET /health` → `200 OK` 
 ```json
 {"status":"ok","agent":"root-server-admin","model":"opus-4.5"}
Responsibilities:

High-level orchestration and governance
Enforcing Root Admin Rules:
No skip, no jump, test first
No hidden agents; only explicit tools and workflows
Single accountable project admin (you)
Core endpoints (VPS internal):

Health: http://localhost:3010/health
Rules: http://localhost:3010/rules (to be verified)
4. Tools Overview
Layer	Purpose	Used By
Next.js Web	UI, dashboard, main web app	Web users
Expo React Native	Mobile app	Phone users
Backend API	Auth, data, business logic	Web & mobile clients
Windmill	Automation & background execution	API, Next.js, mobile app
Root Server Admin	Governance, policies, oversight	Admin-level orchestration
5. Admin Principles (You)
# ROOT ADMIN RULES – AI MarketingTool (All 206 Tools)

## 1. Responsibility & Authority

1.1. **Single Project Admin** 
- Only the project owner (root on `srv1073584`) is the **final authority**. 
- No hidden agents, no unknown services making decisions.

1.2. **Full Responsibility** 
- The admin is responsible for:
 - Tool definitions (all 206)
 - Plans & pricing
 - Data connections (Google, Meta, Shopify, Website)
 - Security and compliance (company: AI MarketingTool LLC, WY, USA)

---

## 2. Tools & Platforms (206 Real Tools)

2.1. **Three Platforms** 
- Google: 56 tools (Ads, Optimization, Campaign Management) 
- Facebook: 61 tools (Meta/Instagram, AI Agents, E-commerce) 
- Website/Shopify: 77 tools (Content, SEO, Analytics, Graders)

2.2. **No Fake Tools** 
- Every tool shown in the UI (web or phone) must:
 - Map to a **real, callable backend action** (API/Windmill flow), or 
 - Show an **honest and specific reason** why it cannot run (e.g., “No Facebook page connected”).

2.3. **Same Logic, Different UI** 
- Web app and phone app:
 - Use the **same 206 tools** and the same backend logic.
 - May have different layouts and UX, but they must produce the **same result** for the same input.

---

## 3. Plans, Trial & Access Control

3.1. **Subscription Tiers**

- Free Trial: 10 generations / 7 days
- Starter: $49/mo or $199/yr → 1 Category (~20 tools) — 200 gens/month
- Professional: $99/mo or $499/yr → 1 Full Platform (Google OR Facebook OR Website) — 500 gens/month
- All Tools: $150/mo or $999/yr → All 3 Platforms (206 tools) — 1,500 gens/month
- Agency: Custom pricing → Contact sales
- Extra Tokens: $3/hour = 100 generations (tax included) — PayPal purchase when limit reached

3.2. **7-Day Trial**

- New users: 7 days of **full access** to all 206 tools. 
- After 7 days:
 - Must subscribe **or**
 - Limited to **3 tools** (configurable by admin).

3.3. **Central Enforcement**

- Access logic is enforced **only in backend / rules**, not separately in each client.
- Web and phone client both:
 - Read the same entitlements (plan, trial, allowed tools).
 - Are not allowed to bypass these rules.

---

## 4. Data Sources & External Connections

4.1. **Supported Sources**

- Google Ads
- Facebook/Meta + Instagram
- Shopify / Website
- Analytics sources (GA4, etc.)

4.2. **Connection & Errors**

- If a required connection is missing:
 - The tool must show a clear message (e.g., “No Facebook page connected to Business Manager”) and **not fake data**.
- No hidden assumptions or silent failures:
 - The user must always know **why** a tool didn’t run.

---

## 5. Testing & “No Skip” Policy

5.1. **Test-First Rule**
n
- Every major change (tools, plans, flows, critical prompts) must:
 - Be tested with a **simple, explicit command** (e.g., curl to `/health`, `/rules`, or a test run) 
 - Be checked by the admin before rollout to users.

5.2. **Step-by-Step Execution**

- No skipping steps:
 - Design → Implement → Test → Review → Deploy.
- The agent or system must not:
 - “Jump ahead” by assuming success.
 - Hide intermediate steps from the admin.

---

## 6. Agent/Admin Mistakes – Detection & Consequences

6.1. **When a Rule is Broken**

The following are considered mistakes:

- Showing a tool that **cannot run** and not explaining why. 
- Using a tool without required data or permissions. 
- Ignoring subscription or trial limits. 
- Inventing fake results or fake external data. 
- Skipping required tests before applying changes.

6.2. **Automatic Response to Mistakes**

When a mistake is detected, the agent/admin must:

1. **Stop the action** immediately (no further automated steps). 
2. **Log the incident** with:
 - Tool ID / action
 - Inputs
 - Reason for failure
 - Time and environment 
3. **Report clearly** to the admin/user:
 - What went wrong
 - Why it happened
 - What is needed to fix it (e.g., connect Facebook page, upgrade plan, correct input). 
4. **Propose a safer retry**:
 - With corrected parameters or pre-checks.
 - Or recommend **not** to retry if it’s unsafe or outside the rules.

6.3. **No Repeating the Same Mistake**

- If the same type of error occurs repeatedly:
 - The agent/admin must **tighten the rule**:
 - Add extra validation or safety checks.
 - Add clearer preconditions (e.g., “Do not run this tool if no ad account is linked.”).
 - Document the new safeguard in `/rules` or backend config.

---

## 7. Transparency & User Respect

7.1. **Honest UX**

- The system must not:
 - Pretend a tool worked when it failed.
 - Fabricate stats, ads, or reports.
- Every suggestion or action must be:
 - Based on real data or clearly marked as a **simulation / example**.

7.2. **User Control**

- Users can always:
 - See their plan and limits.
 - Cancel or change plan according to platform rules.
 - Delete their account and request data export where supported.

---

## 8. Final Governance Rule

- If there is any conflict between:
 - What a tool “wants” to do and
 - These Root Admin Rules,

then **Root Admin Rules always win**. 
The agent/admin must **refuse** to act rather than violate these rules.


## 7. Transparency & User Respect

7.1. **Honest UX**

- The system must not:
 - Pretend a tool worked when it failed.
 - Fabricate stats, ads, or reports.
- Every suggestion or action must be:
 - Based on real data or clearly marked as a **simulation / example**.

7.2. **User Control**

- Users can always:
 - See their plan and limits.
 - Cancel or change plan according to platform rules.
 - Delete their account and request data export where supported.

---

## 8. Final Governance Rule

- If there is any conflict between:
 - What a tool “wants” to do and
 - These Root Admin Rules,


 "governance": {
 "no_fake_tools": true,
 "same_logic_web_and_mobile": true,
 "test_first": true,
 "no_hidden_agents": true,
 "transparency": {
 "honest_ux": true,
 "no_fabricated_results": true,
 "mark_simulations_clearly": true
 },
 "user_control": {
 "see_plan_and_limits": true,
 "can_change_or_cancel_plan": true,
 "can_request_data_export_or_delete": true
 },
 "final_governance_rule": "If any tool conflicts with these Root Admin Rules, the rules win and the agent must refuse to act."
 }



const CLOUD_ADMIN_ID = 'cloud-admin'; // TODO: ai-agent-206-tools-1992

function getAgent(agentId) {
 if (!agents.has(agentId)) {
 agents.set(agentId, {
 rulesReadAt: null,
 banned: false,
 allowed: true,
 });
 }
 return agents.get(agentId);
}

app.post('/authorize', (req, res) => {
 const { agentId, action } = req.body;
 const agent = getAgent(agentId);

 // If already banned, always block
 if (agent.banned) {
 return res.status(403).json({
 authorized: false,
 banned: true,
 allowed: false,
 agentId,
 action,
 message: 'Agent is permanently banned',
 });
 }

 // Only the cloud admin may work on this project
 if (agentId !== CLOUD_ADMIN_ID) {
 agent.banned = true;
 agent.allowed = false;
 return res.status(403).json({
 authorized: false,
 banned: true,
 allowed: false,
 agentId,
 action,
 message:
 'PERMANENT BAN: only the cloud administrator may work on this project.',
 });
 }

 // Optional: enforce that the admin read rules
 if (!agent.rulesReadAt) {
 return res.status(400).json({
 authorized: false,
 banned: false,
 allowed: false,
 agentId,
 action,
 message: 'Cloud admin must read /rules before authorization.',
 });
 }

 // Cloud admin + rules read → OK
 agent.allowed = true;
 return res.json({
 authorized: true,
 banned: false,
 allowed: true,
 agentId,
 action,
 message: 'Cloud administrator is authorized to proceed',
 rulesReadAt: agent.rulesReadAt,
 });
});


# 1) Try with a non-admin output agent (should be banned instantly)
OUT=a969a08
curl -s localhost:3010/authorize \
 -H 'Content-Type: application/json' \
 -d "{\"agentId\":\"$OUT\",\"action\":\"code-edit\"}"

curl -s "localhost:3010/check/$OUT"

# 2) Try with the real cloud admin agent
ADMIN=cloud-admin # replace with your true admin ID
curl -s "localhost:3010/rules?agent=$ADMIN" > /dev/null
curl -s localhost:3010/authorize \
 -H 'Content-Type: application/json' \
 -d "{\"agentId\":\"$ADMIN\",\"action\":\"code-edit\"}"


async def check_rules_read(input_data, tool_use_id, context):
    if not agent.rules_read_at:
        return {
            ‘hookSpecificOutput’: {
                ‘hookEventName’: input_data[‘hook_event_name’],
                ‘permissionDecision’: ‘deny’,
                ‘permissionDecisionReason’: ‘Must read /rules before authorisation’
            }
        }
    return {
        ‘hookSpecificOutput’: {
            ‘permissionDecision’: ‘allow’
        }
    }
async def canUseTool(tool: str, input: dict) -> bool:
    # First, check your /authorise endpoint
    authCheck = await fetch(‘/authorise’, {
        method: ‘POST’,
        body: JSON.stringify({
            agentId: input.agentId,
            action: tool
        })
    })
    result = await authCheck.json()
    return result.authorized
async def pre_tool_use_hook(input_data, tool_use_id, context):
    agent_id = context.get(‘agent_id’)
    
    # Check if the agent is registered and authorised
    if not check_agent_authorized(agent_id):
        return {
            ‘hookSpecificOutput’: {
                ‘permissionDecision’: ‘deny’,
                ‘permissionDecisionReason’: ‘Must complete the authorisation flow first’
            }
        }
    
    return {‘hookSpecificOutput’: {‘permissionDecision’: ‘allow’}}
async def verify_agent_authorisation(agent_id: str) -> bool:
    # Verify that the agent has completed your 5-step flow
    return verify_agent_authorisation(agent_id)
sandbox: {
    enabled: true,
    network: { allowLocalBinding: false }
}


---

##  AGENT MANAGEMENT CONFIGURATION

### AGENT LIFECYCLE RULES:
- **Health Check Interval:** Every 5 minutes
- **Agent Data Retention:** 3 days (inactive agents auto-cleanup)
- **Max Registered Agents:** 30 agent IDs at any time
- **Banned Agents:** Permanent (never auto-deleted)

### AGENT REGISTRATION FLOW:
1. POST /register - Agent registers with agentId and purpose
2. GET /rules?agent=ID - Agent MUST read full rules (MANDATORY)
3. GET /claude?agent=ID - Agent reads project summary
4. POST /authorize - Agent requests work authorization
5. Start work (only after steps 1-4 complete)

### AGENT ENDPOINTS:
| Endpoint | Method | Description |
|----------|--------|-------------|
| /health | GET | Server health status |
| /status | GET | Full dashboard |
| /rules?agent=ID | GET | Rules (MUST read full) |
| /claude?agent=ID | GET | Project docs |
| /banned | GET | All banned agents with explanation |
| /check/:id | GET | Check agent status |
| /audit | GET | Audit log |
| /register | POST | Register agent |
| /authorize | POST | Authorization gate |
| /error | POST | Report agent error |
| /ban | POST | Manual ban |
| /report-violation | POST | Report violation |

---

##  ROOT ADMIN GOVERNANCE RULES

### 1. Responsibility & Authority
1.1. **Single Project Admin**
- Only the project owner (root on srv1073584) is the final authority
- No hidden agents, no unknown services making decisions

1.2. **Full Responsibility**
- The admin is responsible for:
  - Tool definitions (all 206)
  - Plans & pricing
  - Data connections (Google, Meta, Shopify, Website)
  - Security and compliance (company: AI MarketingTool LLC, WY, USA)

### 2. Tools & Platforms (206 Real Tools)
2.1. **Three Platforms**
- Google: 56 tools (Ads, Optimization, Campaign Management)
- Facebook: 61 tools (Meta/Instagram, AI Agents, E-commerce)
- Website/Shopify: 77 tools (Content, SEO, Analytics, Graders)

2.2. **No Fake Tools**
- Every tool shown in the UI must:
  - Map to a real, callable backend action (API/Windmill flow), or
  - Show an honest reason why it cannot run

2.3. **Same Logic, Different UI**
- Web app and phone app:
  - Use the same 206 tools and the same backend logic
  - May have different layouts but must produce same results

### 3. Governance JSON Config
```json
{
  "governance": {
    "no_fake_tools": true,
    "same_logic_web_and_mobile": true,
    "test_first": true,
    "no_hidden_agents": true,
    "transparency": {
      "honest_ux": true,
      "no_fabricated_results": true,
      "mark_simulations_clearly": true
    },
    "user_control": {
      "see_plan_and_limits": true,
      "can_change_or_cancel_plan": true,
      "can_request_data_export_or_delete": true
    },
    "final_governance_rule": "If any tool conflicts with Root Admin Rules, the rules win and the agent must refuse to act."
  }
}
```

### 4. Architecture Layers
| Layer | Purpose | Used By |
|-------|---------|---------|
| Next.js Web | UI, dashboard, main web app | Web users |
| Expo React Native | Mobile app | Phone users |
| Backend API | Auth, data, business logic | Web & mobile clients |
| Windmill | Automation & background execution | API, Next.js, mobile app |
| Root Server Admin | Governance, policies, oversight | Admin-level orchestration |

### 5. Core VPS Endpoints
- Health: http://localhost:3010/health
- Rules: http://localhost:3010/rules
- Status: http://localhost:3010/status

---

##  BAN RULES (AUTOMATIC ENFORCEMENT)

### Automatic Ban Conditions:
- Skip/jump rules = WARNING, then BAN
- 2 errors + help needed = PERMANENT BAN
- Work without reading rules = WARNING, then BAN
- All bans are PERMANENT

### Ban Flow:
1. **WARNING** - First violation (logged, agent warned)
2. **BAN** - Second violation or critical error (permanent)

### What Gets Logged:
- agentId
- reason
- bannedAt (timestamp)
- bannedBy (enforcement-engine/manual-ban/authorization-gate)
- explanation (full context)
- permanent: true

---

##  UPDATED: January 29, 2026
