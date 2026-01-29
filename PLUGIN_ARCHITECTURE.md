# 🔌 Root Admin Plugin Architecture

## Overview
The Root Admin plugin system allows extending functionality with AI-based modules without modifying core code.

## Plugin Structure

```javascript
module.exports = {
  name: "plugin-name",
  version: "1.0.0",
  description: "What this plugin does",

  // Plugin lifecycle hooks
  hooks: {
    onServerStart: async (context) => {},
    onAgentRegister: async (agentId, context) => {},
    onAgentBan: async (agentId, reason, context) => {},
    onRulesRead: async (agentId, context) => {},
    onAuthorize: async (agentId, action, context) => {},
    onError: async (agentId, error, context) => {},
    onViolation: async (agentId, violation, context) => {}
  },

  // Custom API endpoints
  endpoints: {
    "/plugin-route": {
      method: "GET",
      handler: async (req, res, context) => {}
    }
  },

  // Cleanup on shutdown
  onShutdown: async () => {}
};
```

## Context Object
Plugins receive a context object with access to:
```javascript
{
  bannedAgents: {},      // Current banned agents
  agentRegistry: {},     // Registered agents
  agentActivity: {},     // Agent activity tracking
  metrics: {},           // Performance metrics
  log: function(action, details) {},  // Logging function
  banAgent: function(id, reason, source) {},
  trackActivity: function(id, action) {}
}
```

## Plugin Types

### 1. AI Analysis Plugins
- Analyze agent behavior patterns
- Detect anomalies using ML
- Provide intelligent recommendations
- Auto-tune enforcement thresholds

### 2. Integration Plugins
- Connect to external systems (Slack, Discord, Email)
- Send alerts on critical events
- Sync with other monitoring tools

### 3. Enhancement Plugins
- Add custom validation rules
- Implement advanced access control
- Create custom dashboards
- Add rate limiting

### 4. AI Model Plugins
- Use Claude API for intelligent decisions
- GPT-based content analysis
- Custom ML models for predictions
- Natural language rule queries

## Installation

1. Create plugin file in `plugins/` directory
2. Export plugin object with hooks
3. Plugin auto-loads on server start
4. Access via custom endpoints or hooks

## Example: AI Behavior Analyzer

```javascript
// plugins/ai-analyzer.js
const { Anthropic } = require('@anthropic-ai/sdk');

module.exports = {
  name: "ai-behavior-analyzer",
  version: "1.0.0",

  hooks: {
    onAgentBan: async (agentId, reason, context) => {
      // Use Claude to analyze why agent was banned
      const analysis = await analyzeWithAI(agentId, reason, context);
      console.log(`AI Analysis: ${analysis}`);
    }
  }
};
```

## Security

- Plugins run in same process (full access)
- Only install trusted plugins
- Review plugin code before loading
- Plugins can modify server behavior
- Use environment variables for API keys

## Built-in Plugins

1. **ai-analyzer** - Claude-powered behavior analysis
2. **slack-notifier** - Send alerts to Slack
3. **rate-limiter** - Advanced rate limiting
4. **audit-reporter** - Enhanced audit reports
