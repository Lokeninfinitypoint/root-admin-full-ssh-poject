# 🛡️ Root Admin Agent - AI Governance System

**Production-grade AI agent governance and enforcement server for MarketingTool.pro**

![Status](https://img.shields.io/badge/status-active-success)
![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License](https://img.shields.io/badge/license-PROPRIETARY-red)

---

## 🚀 Overview

Root Admin Agent is the **security guard and governance layer** for AI agents working on the MarketingTool.pro platform. It enforces strict rules, automatically bans misbehaving agents, and provides real-time monitoring through a beautiful dashboard.

**Key Features:**
- ✅ AI Agent authorization and access control
- 🚫 Automatic ban system with permanent enforcement
- 📊 Real-time monitoring dashboard
- 📈 Prometheus-compatible metrics
- 🔌 Plugin system for extensibility
- 📝 Complete audit logging
- 🐳 Docker-ready deployment

---

## 📊 Architecture

```
┌─────────────────────────────────────────────┐
│         Root Admin Server (Port 3010)       │
├─────────────────────────────────────────────┤
│  🛡️  Enforcement Engine                     │
│  📋  Rules System (rules.md)                │
│  🚫  Ban Manager (permanent bans)           │
│  📊  Activity Tracker                       │
│  🔌  Plugin System (AI-based extensions)    │
│  📈  Metrics & Monitoring                   │
└─────────────────────────────────────────────┘
```

---

## 🎯 What It Does

| Component | Function | Auto-Action |
|-----------|----------|-------------|
| **Authorization Gate** | Only "Ai-tool7890" allowed | Other agents = instant ban |
| **Rules Enforcement** | Agents must read full rules.md | Skip rules = warning then ban |
| **Error Tracking** | Monitors agent errors | 2 errors + help = permanent ban |
| **Activity Logging** | Records every action | Audit trail in data/audit.log |
| **Dashboard** | Visual monitoring | Auto-refresh every 30 seconds |
| **Plugins** | AI-based extensions | Custom hooks and endpoints |

---

## 🚦 Quick Start

### **Option 1: Docker (Recommended)**

```bash
# Clone repository
git clone https://github.com/Lokeninfinitypoint/root-admin-full-ssh-poject.git
cd root-admin-full-ssh-poject

# Create .env file
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env

# Start with Docker
docker compose up -d

# Check logs
docker logs root-server-admin --tail 50 -f
```

### **Option 2: Node.js**

```bash
# Install Node.js 22+
npm install

# Create .env file
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env

# Start server
npm start
```

---

## 🌐 API Endpoints

### **Core Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/dashboard` | GET | 🖥️ HTML monitoring dashboard |
| `/metrics` | GET | 📊 Prometheus metrics |
| `/status` | GET | Full system status |
| `/rules` | GET | Governance rules (MANDATORY read) |
| `/banned` | GET | List all banned agents |
| `/check/:id` | GET | Check agent status |
| `/audit` | GET | Audit log (last 50 entries) |
| `/register` | POST | Register new agent |
| `/authorize` | POST | Authorization gate |
| `/ban` | POST | Manual ban |
| `/error` | POST | Report agent error |
| `/report-violation` | POST | Report violation + auto-ban |

### **Plugin Endpoints**

| Endpoint | Method | Description | Plugin |
|----------|--------|-------------|--------|
| `/ai/analyze` | GET | AI behavior analysis | ai-analyzer |

---

## 🔌 Plugin System

**Create custom plugins to extend functionality:**

```javascript
// plugins/my-plugin.js
module.exports = {
  name: "my-plugin",
  version: "1.0.0",

  hooks: {
    onAgentBan: async (agentId, reason, source, context) => {
      console.log("Agent banned:", agentId);
      // Send Slack notification
      // Log to external system
      // Trigger AI analysis
    }
  },

  endpoints: {
    "/custom-endpoint": {
      method: "GET",
      handler: async (req, res, context) => {
        res.end("Custom response");
      }
    }
  }
};
```

**Available Hooks:**
- `onServerStart` - Server initialization
- `onAgentRegister` - Agent registration
- `onAgentBan` - Agent banned
- `onRulesRead` - Rules read by agent
- `onAuthorize` - Authorization attempt
- `onError` - Error tracked
- `onViolation` - Violation reported

**See:** [PLUGIN_ARCHITECTURE.md](PLUGIN_ARCHITECTURE.md)

---

## 📈 Monitoring

### **Dashboard**
Access the real-time dashboard:
```
http://YOUR_SERVER_IP:3010/dashboard
```

**Features:**
- 📊 Live statistics (uptime, agents, bans)
- 🚫 Banned agents table
- 📡 API endpoints reference
- 🔄 Auto-refresh every 30 seconds

### **Metrics**
Prometheus-compatible metrics:
```
http://YOUR_SERVER_IP:3010/metrics
```

**Tracked Metrics:**
- Request counts (total, by endpoint, by method)
- Response times (average, P95)
- Agents (total, banned, registered)
- Server uptime

---

## 🚫 Ban Rules

**Automatic Bans:**
1. **2 errors + 1 help request** = PERMANENT BAN
2. **2 violations** of working without reading rules = BAN
3. **Non-whitelisted agent ID** = INSTANT BAN
4. **Old admin ID** "ai-agent-206-tools-1992" = INSTANT BAN

**All bans are PERMANENT. No appeals. No unbans.**

---

## 📦 Project Structure

```
root-agent/
├── index.js                    # Main server (1,000+ lines)
├── package.json                # Node.js dependencies
├── docker-compose.yml          # Docker configuration
├── .env                        # Environment variables (GITIGNORED)
├── .gitignore                  # Security (protects .env, keys)
├── .editorconfig               # Code formatting
├── .eslintrc.json              # Linting rules
├── rules.md                    # Agent governance rules (918 lines)
├── rules.json                  # Project structure
├── claude.md                   # Project documentation (748 lines)
├── statusline.sh               # Status integration
├── data/                       # Runtime data (GITIGNORED)
│   ├── banned-agents.json      # Banned list
│   ├── agent-registry.json     # Registered agents
│   └── audit.log               # Audit trail
├── plugins/                    # Plugin directory
│   └── ai-analyzer.js          # AI behavior analyzer
├── PLUGIN_ARCHITECTURE.md      # Plugin documentation
└── README.md                   # This file
```

---

## 🔒 Security

**Protected by .gitignore:**
- ✅ `.env` - API keys never committed
- ✅ `data/` - Runtime data excluded
- ✅ `.claude/settings.local.json` - Local config only
- ✅ Logs, backups, keys

**Environment Validation:**
- ✅ Validates `ANTHROPIC_API_KEY` on startup
- ✅ Checks required files exist
- ✅ Tests data directory writable
- ✅ Fails fast with clear errors

---

## 📊 Stats

**Current Production Status:**
- ✅ 8 agents banned
- ✅ 4 agents registered
- ✅ 1 active agent ("Ai-tool7890")
- ✅ 20+ hours uptime
- ✅ 1 plugin active (ai-analyzer)

**Project:**
- 📁 1,000+ lines of core code
- 📁 292 lines of plugin system
- 📁 3 git commits
- 📁 206 AI tools managed (MarketingTool.pro)

---

## 🧪 Testing

```bash
# Test all endpoints
curl http://localhost:3010/health
curl http://localhost:3010/status
curl http://localhost:3010/dashboard
curl http://localhost:3010/metrics
curl http://localhost:3010/ai/analyze

# Test agent registration
curl -X POST http://localhost:3010/register \
  -H "Content-Type: application/json" \
  -d '{"agentId":"test-agent","purpose":"testing"}'

# Check agent status
curl http://localhost:3010/check/test-agent
```

---

## 📚 Documentation

- **[PLUGIN_ARCHITECTURE.md](PLUGIN_ARCHITECTURE.md)** - Plugin system guide
- **[rules.md](rules.md)** - Agent governance rules
- **[claude.md](claude.md)** - Project documentation

---

## 🎯 MarketingTool.pro Integration

**Platform Overview:**
- 📊 206 AI marketing tools
- 🔧 Google Ads tools: 56
- 📱 Facebook tools: 61
- 🛒 Shopify/Website tools: 77

**Pricing Plans:**
- Starter: 1 category (~20 tools)
- Professional: 1 platform (56-77 tools)
- Lifetime: All 206 tools
- Free trial: 7 days, all tools

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 22+
- **Container:** Docker (node:22-alpine)
- **API:** REST (vanilla Node.js http module)
- **Storage:** JSON files (simple, fast, no DB needed)
- **Monitoring:** Prometheus metrics
- **AI:** Claude API (Anthropic)

---

## 📝 License

**PROPRIETARY** - MarketingTool.pro

---

## 🤝 Contributing

This is a private project. Contact the repository owner for access.

---

## 🔗 Links

- **Live Dashboard:** http://31.220.107.19:3010/dashboard
- **Repository:** https://github.com/Lokeninfinitypoint/root-admin-full-ssh-poject
- **MarketingTool.pro:** https://app.marketingtool.pro

---

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review audit logs: `docker logs root-server-admin`
3. Access dashboard: http://YOUR_SERVER_IP:3010/dashboard
4. Check metrics: http://YOUR_SERVER_IP:3010/metrics

---

**Built with Claude Opus 4.5** 🤖
