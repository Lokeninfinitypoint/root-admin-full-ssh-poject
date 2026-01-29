const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3010;
const PLUGINS_DIR = path.join(__dirname, "plugins");

// === AGENT MANAGEMENT CONFIG ===
const HEALTH_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
const AGENT_RETENTION_DAYS = 3; // 3 days retention for inactive agents
const MAX_REGISTERED_AGENTS = 30; // Maximum 30 agent IDs

// === FILE PATHS ===
const rulesMarkdownPath = path.join(__dirname, "rules.md");
const claudeMarkdownPath = path.join(__dirname, "claude.md");
const rulesJsonPath = path.join(__dirname, "rules.json");
const bannedAgentsPath = path.join(__dirname, "data", "banned-agents.json");
const auditLogPath = path.join(__dirname, "data", "audit.log");
const agentRegistryPath = path.join(__dirname, "data", "agent-registry.json");

// === Ensure data directory exists ===
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// === ENVIRONMENT VALIDATION ===
function validateEnvironment() {
  var errors = [];

  // Check ANTHROPIC_API_KEY
  if (!process.env.ANTHROPIC_API_KEY) {
    errors.push("ANTHROPIC_API_KEY not found in environment");
  } else if (!process.env.ANTHROPIC_API_KEY.startsWith("sk-ant-")) {
    errors.push("ANTHROPIC_API_KEY appears invalid (should start with 'sk-ant-')");
  }

  // Check required files exist
  var requiredFiles = [
    { path: rulesMarkdownPath, name: "rules.md" },
    { path: rulesJsonPath, name: "rules.json" }
  ];

  requiredFiles.forEach(function(file) {
    if (!fs.existsSync(file.path)) {
      errors.push("Required file missing: " + file.name);
    }
  });

  // Check data directory is writable
  try {
    var testFile = path.join(dataDir, ".write-test");
    fs.writeFileSync(testFile, "test");
    fs.unlinkSync(testFile);
  } catch (e) {
    errors.push("Data directory not writable: " + dataDir);
  }

  if (errors.length > 0) {
    console.error("=== ENVIRONMENT VALIDATION FAILED ===");
    errors.forEach(function(err) {
      console.error("  ❌ " + err);
    });
    console.error("=====================================");
    process.exit(1);
  }

  console.log("✅ Environment validation passed");
}

validateEnvironment();

// === STATE ===
let rulesMarkdown = "";
let claudeMarkdown = "";
let rulesJson = {};
let bannedAgents = {};
let agentRegistry = {};
let agentActivity = {};

// === METRICS ===
let metrics = {
  requests: {
    total: 0,
    byEndpoint: {},
    byMethod: {}
  },
  responseTimes: [],
  errors: 0,
  bansIssued: 0,
  startTime: Date.now()
};

function trackMetric(endpoint, method, responseTime) {
  metrics.requests.total++;
  metrics.requests.byEndpoint[endpoint] = (metrics.requests.byEndpoint[endpoint] || 0) + 1;
  metrics.requests.byMethod[method] = (metrics.requests.byMethod[method] || 0) + 1;

  if (responseTime !== undefined) {
    metrics.responseTimes.push(responseTime);
    // Keep only last 1000 response times to avoid memory bloat
    if (metrics.responseTimes.length > 1000) {
      metrics.responseTimes = metrics.responseTimes.slice(-1000);
    }
  }
}

function calculateMetrics() {
  var avgResponseTime = 0;
  if (metrics.responseTimes.length > 0) {
    var sum = metrics.responseTimes.reduce(function(a, b) { return a + b; }, 0);
    avgResponseTime = sum / metrics.responseTimes.length;
  }

  var p95 = 0;
  if (metrics.responseTimes.length > 0) {
    var sorted = metrics.responseTimes.slice().sort(function(a, b) { return a - b; });
    var index = Math.floor(sorted.length * 0.95);
    p95 = sorted[index] || 0;
  }

  return {
    avgResponseTime: avgResponseTime.toFixed(2),
    p95ResponseTime: p95.toFixed(2)
  };
}

// === PLUGIN SYSTEM ===
var plugins = [];
var pluginEndpoints = {};

function getPluginContext() {
  return {
    bannedAgents: bannedAgents,
    agentRegistry: agentRegistry,
    agentActivity: agentActivity,
    metrics: metrics,
    log: log,
    banAgent: banAgent,
    trackActivity: trackActivity
  };
}

async function executeHook(hookName, ...args) {
  for (var plugin of plugins) {
    if (plugin.hooks && plugin.hooks[hookName]) {
      try {
        await plugin.hooks[hookName](...args, getPluginContext());
      } catch (error) {
        console.error("[" + new Date().toISOString() + "] Plugin '" + plugin.name + "' hook '" + hookName + "' error:", error.message);
      }
    }
  }
}

function loadPlugins() {
  if (!fs.existsSync(PLUGINS_DIR)) {
    console.log("[" + new Date().toISOString() + "] No plugins directory found");
    return;
  }

  var pluginFiles = fs.readdirSync(PLUGINS_DIR).filter(function(file) {
    return file.endsWith(".js");
  });

  console.log("[" + new Date().toISOString() + "] Loading " + pluginFiles.length + " plugins...");

  pluginFiles.forEach(function(file) {
    try {
      var pluginPath = path.join(PLUGINS_DIR, file);
      delete require.cache[require.resolve(pluginPath)]; // Allow hot-reload
      var plugin = require(pluginPath);

      if (!plugin.name) {
        console.error("[" + new Date().toISOString() + "] Plugin " + file + " missing name property");
        return;
      }

      plugins.push(plugin);
      console.log("[" + new Date().toISOString() + "] ✅ Loaded plugin: " + plugin.name + " v" + (plugin.version || "1.0.0"));

      // Register custom endpoints
      if (plugin.endpoints) {
        Object.keys(plugin.endpoints).forEach(function(route) {
          pluginEndpoints[route] = plugin.endpoints[route];
          console.log("[" + new Date().toISOString() + "]   → Endpoint: " + plugin.endpoints[route].method + " " + route);
        });
      }
    } catch (error) {
      console.error("[" + new Date().toISOString() + "] Failed to load plugin " + file + ":", error.message);
    }
  });

  console.log("[" + new Date().toISOString() + "] Plugin system ready (" + plugins.length + " active)");
}

// === LOAD FUNCTIONS ===
function loadRulesMarkdown() {
  try {
    rulesMarkdown = fs.readFileSync(rulesMarkdownPath, "utf8");
    console.log("[" + new Date().toISOString() + "] Loaded rules.md (" + rulesMarkdown.length + " bytes)");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to load rules.md:", err.message);
  }
}

function loadRulesJson() {
  try {
    rulesJson = JSON.parse(fs.readFileSync(rulesJsonPath, "utf8"));
    console.log("[" + new Date().toISOString() + "] Loaded rules.json");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to load rules.json:", err.message);
  }
}

function loadBannedAgents() {
  try {
    if (fs.existsSync(bannedAgentsPath)) {
      bannedAgents = JSON.parse(fs.readFileSync(bannedAgentsPath, "utf8"));
      console.log("[" + new Date().toISOString() + "] Loaded banned-agents.json (" + Object.keys(bannedAgents).length + " banned)");
    } else {
      bannedAgents = {};
      saveBannedAgents();
    }
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to load banned-agents.json:", err.message);
    bannedAgents = {};
  }
}

function saveBannedAgents() {
  try {
    fs.writeFileSync(bannedAgentsPath, JSON.stringify(bannedAgents, null, 2), "utf8");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to save banned-agents.json:", err.message);
  }
}

function loadAgentRegistry() {
  try {
    if (fs.existsSync(agentRegistryPath)) {
      agentRegistry = JSON.parse(fs.readFileSync(agentRegistryPath, "utf8"));
      console.log("[" + new Date().toISOString() + "] Loaded agent-registry.json (" + Object.keys(agentRegistry).length + " agents)");
    } else {
      agentRegistry = {};
      saveAgentRegistry();
    }
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to load agent-registry.json:", err.message);
    agentRegistry = {};
  }
}

function saveAgentRegistry() {
  try {
    fs.writeFileSync(agentRegistryPath, JSON.stringify(agentRegistry, null, 2), "utf8");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to save agent-registry.json:", err.message);
  }
}

function loadClaudeMarkdown() {
  try {
    claudeMarkdown = fs.readFileSync(claudeMarkdownPath, "utf8");
    console.log("[" + new Date().toISOString() + "] Loaded claude.md (" + claudeMarkdown.length + " bytes)");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Failed to load claude.md:", err.message);
  }
}

// === INITIAL LOAD ===
loadRulesMarkdown();
loadClaudeMarkdown();
loadRulesJson();
loadBannedAgents();
loadAgentRegistry();
loadPlugins();

// === HOT-RELOAD ===
function watchFile(filePath, label, reloadFn) {
  let debounce = null;
  try {
    fs.watch(filePath, function() {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(function() {
        console.log("[" + new Date().toISOString() + "] " + label + " changed - reloading");
        reloadFn();
      }, 500);
    });
    console.log("[" + new Date().toISOString() + "] Watching " + label + " for changes");
  } catch (err) {
    console.error("[" + new Date().toISOString() + "] Cannot watch " + label + ":", err.message);
  }
}

watchFile(rulesMarkdownPath, "rules.md", loadRulesMarkdown);
watchFile(rulesJsonPath, "rules.json", loadRulesJson);
try { watchFile(claudeMarkdownPath, "claude.md", loadClaudeMarkdown); } catch(e) {}

// === HELPERS ===
function parseBody(req) {
  return new Promise(function(resolve, reject) {
    var body = "";
    req.on("data", function(chunk) { body += chunk; });
    req.on("end", function() {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function jsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function log(action, details) {
  var entry = "[" + new Date().toISOString() + "] [" + action + "] " + JSON.stringify(details);
  console.log(entry);
  try {
    fs.appendFileSync(auditLogPath, entry + "\n");
  } catch (e) {}
}

// === BAN AGENT WITH FULL EXPLANATION ===
function banAgent(agentId, reason, source) {
  if (bannedAgents[agentId]) return false;
  
  var banData = {
    agentId: agentId,
    reason: reason,
    bannedAt: new Date().toISOString(),
    bannedBy: source || "enforcement-engine",
    permanent: true,
    explanation: generateBanExplanation(agentId, reason)
  };
  
  bannedAgents[agentId] = banData;
  saveBannedAgents();
  log("AUTO-BAN", banData);
  metrics.bansIssued++;
  executeHook("onAgentBan", agentId, reason, source).catch(function(e) {});
  return true;
}

// === GENERATE CLEAR BAN EXPLANATION ===
function generateBanExplanation(agentId, reason) {
  var activity = agentActivity[agentId] || {};
  var violations = activity.violations || [];
  var errors = activity.errors || [];
  
  var explanation = "\\n========== AGENT BANNED ==========\\n";
  explanation += "AGENT ID: " + agentId + "\\n";
  explanation += "REASON: " + reason + "\\n";
  explanation += "TIME: " + new Date().toISOString() + "\\n";
  explanation += "\\n--- VIOLATION HISTORY ---\\n";
  
  if (violations.length > 0) {
    violations.forEach(function(v, i) {
      explanation += (i + 1) + ". " + v.type + " at " + v.at + "\\n";
    });
  } else {
    explanation += "No recorded violations before ban\\n";
  }
  
  if (errors.length > 0) {
    explanation += "\\n--- ERROR HISTORY ---\\n";
    errors.forEach(function(e, i) {
      explanation += (i + 1) + ". " + e.type + " at " + e.at + "\\n";
    });
  }
  
  explanation += "\\n--- WHAT WENT WRONG ---\\n";
  if (reason.includes("without reading rules")) {
    explanation += "Agent tried to work without reading the full rules.md file.\\n";
    explanation += "RULE: All agents MUST read /rules?agent=ID before any work.\\n";
  } else if (reason.includes("skip") || reason.includes("jump")) {
    explanation += "Agent skipped steps or jumped to wrong task.\\n";
    explanation += "RULE: Complete tasks in order. No skipping allowed.\\n";
  } else if (reason.includes("error") && reason.includes("help")) {
    explanation += "Agent made repeated errors and could not complete task.\\n";
    explanation += "RULE: 2 errors with help output = automatic ban.\\n";
  }
  
  explanation += "\\nTHIS BAN IS PERMANENT. Agent cannot be unbanned.\\n";
  explanation += "===================================\\n";
  
  return explanation;
}

// === TRACK ACTIVITY ===
function trackActivity(agentId, action) {
  if (!agentActivity[agentId]) {
    agentActivity[agentId] = {
      firstSeen: new Date().toISOString(),
      readRules: false,
      readRulesFull: false,
      readClaude: false,
      actions: [],
      violations: [],
      errors: [],
      errorCount: 0,
      helpRequested: 0
    };
  }
  agentActivity[agentId].actions.push({
    action: action,
    at: new Date().toISOString()
  });
  if (agentActivity[agentId].actions.length > 100) {
    agentActivity[agentId].actions = agentActivity[agentId].actions.slice(-100);
  }
}

// === TRACK ERRORS ===
function trackError(agentId, errorType, needsHelp) {
  if (!agentActivity[agentId]) {
    trackActivity(agentId, "error-tracked");
  }
  
  var activity = agentActivity[agentId];
  activity.errors.push({
    type: errorType,
    needsHelp: needsHelp,
    at: new Date().toISOString()
  });
  activity.errorCount++;
  
  if (needsHelp) {
    activity.helpRequested++;
  }
  
  log("ERROR-TRACKED", { agentId: agentId, errorType: errorType, needsHelp: needsHelp, totalErrors: activity.errorCount });
  
  // BAN RULE: 2 errors with help needed = ban
  if (activity.errorCount >= 2 && activity.helpRequested >= 1) {
    banAgent(agentId, "Made " + activity.errorCount + " errors and needed help " + activity.helpRequested + " times", "error-enforcement");
    return {
      banned: true,
      reason: "Too many errors with help requests"
    };
  }
  
  return { banned: false };
}

// === ENFORCE RULES ===
function enforceRules(agentId, action) {
  if (bannedAgents[agentId]) {
    return {
      allowed: false,
      reason: "AGENT BANNED: " + bannedAgents[agentId].reason,
      explanation: bannedAgents[agentId].explanation
    };
  }

  var activity = agentActivity[agentId];

  // Must read FULL rules before authorize/work
  if (action === "authorize" || action === "work") {
    if (!activity || !activity.readRulesFull || !activity.readClaude) {
      if (!activity) {
        trackActivity(agentId, "violation:no-checkin");
        activity = agentActivity[agentId];
      }
      activity.violations.push({
        type: "NO_FULL_RULES_READ",
        action: action,
        at: new Date().toISOString()
      });

      var noRulesViolations = activity.violations.filter(function(v) {
        return v.type === "NO_FULL_RULES_READ" || v.type === "NO_RULES_READ";
      }).length;

      if (noRulesViolations >= 2) {
        banAgent(agentId, "Attempted to work " + noRulesViolations + " times without reading FULL rules", "enforcement-engine");
        return {
          allowed: false,
          banned: true,
          reason: "BANNED: Agent worked without reading FULL rules. Violations: " + noRulesViolations,
          explanation: bannedAgents[agentId].explanation
        };
      }

      return {
        allowed: false,
        warning: true,
        reason: "WARNING: Must read FULL /rules AND /claude before working. No skip. No jump. Call GET /rules?agent=" + agentId + " and read entire file. Next violation = PERMANENT BAN."
      };
    }
  }

  return { allowed: true };
}

function getAgentFromQuery(url) {
  var match = url.match(/[?&]agent=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getPathname(url) {
  return url.split("?")[0];
}

// === DASHBOARD HTML GENERATOR ===
function generateDashboardHTML(stats, bannedList) {
  var uptimeHours = Math.floor(stats.uptime / 3600);
  var uptimeMinutes = Math.floor((stats.uptime % 3600) / 60);

  // TODO(human): Customize dashboard design here
  // You can change colors, fonts, layout, add charts, or add real-time updates

  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">';
  html += '<title>Root Admin Dashboard</title>';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  html += '<style>';
  html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 20px; background: #0f172a; color: #e2e8f0; }';
  html += '.container { max-width: 1200px; margin: 0 auto; }';
  html += 'h1 { color: #60a5fa; margin-bottom: 10px; }';
  html += '.subtitle { color: #94a3b8; margin-bottom: 30px; }';
  html += '.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }';
  html += '.stat-card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 20px; }';
  html += '.stat-value { font-size: 36px; font-weight: bold; color: #60a5fa; margin: 10px 0; }';
  html += '.stat-label { color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; }';
  html += '.status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }';
  html += '.status-active { background: #10b981; color: white; }';
  html += '.status-danger { background: #ef4444; color: white; }';
  html += 'table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; }';
  html += 'th { background: #334155; padding: 12px; text-align: left; font-weight: 600; color: #f1f5f9; }';
  html += 'td { padding: 12px; border-top: 1px solid #334155; }';
  html += 'tr:hover { background: #334155; }';
  html += '.refresh-btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-bottom: 20px; }';
  html += '.refresh-btn:hover { background: #2563eb; }';
  html += '</style>';
  html += '</head><body>';
  html += '<div class="container">';
  html += '<h1>🛡️ Root Admin Dashboard</h1>';
  html += '<div class="subtitle">AI Agent Governance & Enforcement System</div>';

  html += '<button class="refresh-btn" onclick="location.reload()">↻ Refresh</button>';

  html += '<div class="stats">';
  html += '<div class="stat-card"><div class="stat-label">Status</div>';
  html += '<div class="stat-value"><span class="status-badge status-active">ACTIVE</span></div></div>';
  html += '<div class="stat-card"><div class="stat-label">Uptime</div>';
  html += '<div class="stat-value">' + uptimeHours + 'h ' + uptimeMinutes + 'm</div></div>';
  html += '<div class="stat-card"><div class="stat-label">Total Agents</div>';
  html += '<div class="stat-value">' + stats.totalAgents + '</div></div>';
  html += '<div class="stat-card"><div class="stat-label">Registered</div>';
  html += '<div class="stat-value">' + stats.registeredCount + '</div></div>';
  html += '<div class="stat-card"><div class="stat-label">Banned</div>';
  html += '<div class="stat-value"><span class="status-badge status-danger">' + stats.bannedCount + '</span></div></div>';
  html += '</div>';

  if (bannedList.length > 0) {
    html += '<h2 style="color: #ef4444; margin-top: 40px;">🚫 Banned Agents</h2>';
    html += '<table>';
    html += '<tr><th>Agent ID</th><th>Reason</th><th>Banned At</th></tr>';
    bannedList.forEach(function(agent) {
      html += '<tr>';
      html += '<td><code>' + agent.id + '</code></td>';
      html += '<td>' + agent.reason + '</td>';
      html += '<td>' + new Date(agent.bannedAt).toLocaleString() + '</td>';
      html += '</tr>';
    });
    html += '</table>';
  }

  html += '<div style="margin-top: 40px; padding: 20px; background: #1e293b; border-radius: 8px; border-left: 4px solid #60a5fa;">';
  html += '<h3 style="margin-top: 0; color: #60a5fa;">📡 API Endpoints</h3>';
  html += '<ul style="line-height: 1.8; color: #cbd5e1;">';
  html += '<li><code>GET /health</code> - Server health check</li>';
  html += '<li><code>GET /status</code> - Full system status</li>';
  html += '<li><code>GET /rules?agent=ID</code> - Read governance rules</li>';
  html += '<li><code>GET /banned</code> - List all banned agents</li>';
  html += '<li><code>POST /register</code> - Register new agent</li>';
  html += '<li><code>POST /authorize</code> - Authorization gate</li>';
  html += '</ul></div>';

  html += '</div>';
  html += '<script>setTimeout(function(){ location.reload(); }, 30000);</script>';
  html += '</body></html>';

  return html;
}

// === SERVER ===
var server = http.createServer(function(req, res) {
  var startTime = Date.now();
  var method = req.method;
  var url = req.url;
  var pathname = getPathname(url);
  var queryAgent = getAgentFromQuery(url);

  // Track metrics when response finishes
  var originalEnd = res.end;
  res.end = function() {
    var responseTime = Date.now() - startTime;
    trackMetric(pathname, method, responseTime);
    originalEnd.apply(res, arguments);
  };

  // --- GET /health ---
  if (method === "GET" && pathname === "/health") {
    return jsonResponse(res, 200, {
      status: "ok",
      agent: "root-server-admin",
      model: "opus-4.5",
      bannedCount: Object.keys(bannedAgents).length,
      registeredAgents: Object.keys(agentRegistry).length,
      activeAgents: Object.keys(agentActivity).length,
      rulesLoaded: rulesMarkdown.length > 0,
      enforcement: true,
      uptime: process.uptime()
    });
  }

  // --- GET /dashboard ---
  if (method === "GET" && pathname === "/dashboard") {
    var stats = {
      totalAgents: Object.keys(agentActivity).length,
      bannedCount: Object.keys(bannedAgents).length,
      registeredCount: Object.keys(agentRegistry).length,
      uptime: Math.floor(process.uptime()),
      rulesLoaded: rulesMarkdown.length > 0
    };

    var bannedList = Object.keys(bannedAgents).map(function(id) {
      return {
        id: id,
        reason: bannedAgents[id].reason,
        bannedAt: bannedAgents[id].bannedAt
      };
    });

    // TODO(human): Customize the dashboard HTML design
    // Add your preferred styling, colors, layout, and visualizations
    // Consider adding charts, real-time updates, or additional metrics
    var html = generateDashboardHTML(stats, bannedList);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  // --- GET /metrics ---
  if (method === "GET" && pathname === "/metrics") {
    var calculated = calculateMetrics();
    var uptime = process.uptime();
    var requestsPerSecond = (metrics.requests.total / uptime).toFixed(2);

    // Prometheus-compatible format
    var prometheusMetrics = "";
    prometheusMetrics += "# HELP root_admin_requests_total Total number of requests\n";
    prometheusMetrics += "# TYPE root_admin_requests_total counter\n";
    prometheusMetrics += "root_admin_requests_total " + metrics.requests.total + "\n\n";

    prometheusMetrics += "# HELP root_admin_requests_by_endpoint Requests grouped by endpoint\n";
    prometheusMetrics += "# TYPE root_admin_requests_by_endpoint counter\n";
    Object.keys(metrics.requests.byEndpoint).forEach(function(endpoint) {
      prometheusMetrics += 'root_admin_requests_by_endpoint{endpoint="' + endpoint + '"} ' + metrics.requests.byEndpoint[endpoint] + "\n";
    });
    prometheusMetrics += "\n";

    prometheusMetrics += "# HELP root_admin_response_time_avg Average response time in milliseconds\n";
    prometheusMetrics += "# TYPE root_admin_response_time_avg gauge\n";
    prometheusMetrics += "root_admin_response_time_avg " + calculated.avgResponseTime + "\n\n";

    prometheusMetrics += "# HELP root_admin_response_time_p95 95th percentile response time\n";
    prometheusMetrics += "# TYPE root_admin_response_time_p95 gauge\n";
    prometheusMetrics += "root_admin_response_time_p95 " + calculated.p95ResponseTime + "\n\n";

    prometheusMetrics += "# HELP root_admin_agents_banned_total Total agents banned\n";
    prometheusMetrics += "# TYPE root_admin_agents_banned_total counter\n";
    prometheusMetrics += "root_admin_agents_banned_total " + Object.keys(bannedAgents).length + "\n\n";

    prometheusMetrics += "# HELP root_admin_agents_registered_total Total agents registered\n";
    prometheusMetrics += "# TYPE root_admin_agents_registered_total gauge\n";
    prometheusMetrics += "root_admin_agents_registered_total " + Object.keys(agentRegistry).length + "\n\n";

    prometheusMetrics += "# HELP root_admin_uptime_seconds Uptime in seconds\n";
    prometheusMetrics += "# TYPE root_admin_uptime_seconds counter\n";
    prometheusMetrics += "root_admin_uptime_seconds " + Math.floor(uptime) + "\n";

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(prometheusMetrics);
  }

  // --- GET /rules --- Agent MUST read full file
  if (method === "GET" && pathname === "/rules") {
    if (queryAgent) {
      trackActivity(queryAgent, "read-rules-full");
      if (!agentActivity[queryAgent]) {
        trackActivity(queryAgent, "read-rules-full");
      }
      agentActivity[queryAgent].readRules = true;
      agentActivity[queryAgent].readRulesFull = true;
      agentActivity[queryAgent].rulesReadAt = new Date().toISOString();
      agentActivity[queryAgent].rulesSize = rulesMarkdown.length;
      log("RULES-READ-FULL", { agentId: queryAgent, size: rulesMarkdown.length });
    }
    res.writeHead(200, { "Content-Type": "text/markdown; charset=utf-8" });
    return res.end(rulesMarkdown || "# No rules loaded");
  }

  // --- GET /claude ---
  if (method === "GET" && pathname === "/claude") {
    if (queryAgent) {
      trackActivity(queryAgent, "read-claude");
      if (agentActivity[queryAgent]) {
        agentActivity[queryAgent].readClaude = true;
        agentActivity[queryAgent].claudeReadAt = new Date().toISOString();
      }
      log("CLAUDE-READ", { agentId: queryAgent });
    }
    res.writeHead(200, { "Content-Type": "text/markdown; charset=utf-8" });
    return res.end(claudeMarkdown || "# No claude.md loaded");
  }

  // --- GET /rules.json ---
  if (method === "GET" && pathname === "/rules.json") {
    return jsonResponse(res, 200, rulesJson);
  }

  // --- GET /banned --- Show ALL banned agents with full explanation
  if (method === "GET" && pathname === "/banned") {
    var bannedList = Object.keys(bannedAgents).map(function(id) {
      var agent = bannedAgents[id];
      return {
        agentId: id,
        reason: agent.reason,
        bannedAt: agent.bannedAt,
        bannedBy: agent.bannedBy,
        permanent: agent.permanent,
        explanation: agent.explanation || "No detailed explanation available"
      };
    });
    
    return jsonResponse(res, 200, {
      count: Object.keys(bannedAgents).length,
      message: "All bans are PERMANENT",
      bannedAgents: bannedList
    });
  }

  // --- GET /check/:agentId ---
  if (method === "GET" && pathname.startsWith("/check/")) {
    var agentId = decodeURIComponent(pathname.slice(7));
    var isBanned = !!bannedAgents[agentId];
    var entry = bannedAgents[agentId] || null;
    var activity = agentActivity[agentId] || null;
    log("CHECK", { agentId: agentId, banned: isBanned });
    
    var response = {
      agentId: agentId,
      banned: isBanned,
      allowed: !isBanned
    };
    
    if (isBanned) {
      response.banDetails = {
        reason: entry.reason,
        bannedAt: entry.bannedAt,
        bannedBy: entry.bannedBy,
        permanent: true,
        explanation: entry.explanation
      };
    }
    
    if (activity) {
      response.activity = {
        readRules: activity.readRules,
        readRulesFull: activity.readRulesFull,
        readClaude: activity.readClaude,
        actionCount: activity.actions.length,
        violationCount: activity.violations.length,
        errorCount: activity.errorCount || 0,
        helpRequested: activity.helpRequested || 0
      };
    }
    
    return jsonResponse(res, 200, response);
  }

  // --- GET /agents ---
  if (method === "GET" && pathname === "/agents") {
    var summary = {};
    Object.keys(agentActivity).forEach(function(id) {
      var a = agentActivity[id];
      summary[id] = {
        firstSeen: a.firstSeen,
        readRules: a.readRules,
        readRulesFull: a.readRulesFull,
        readClaude: a.readClaude,
        actions: a.actions.length,
        violations: a.violations.length,
        errors: a.errorCount || 0,
        helpRequested: a.helpRequested || 0,
        banned: !!bannedAgents[id],
        lastAction: a.actions.length > 0 ? a.actions[a.actions.length - 1] : null
      };
    });
    return jsonResponse(res, 200, {
      total: Object.keys(agentActivity).length,
      banned: Object.keys(bannedAgents).length,
      agents: summary
    });
  }

  // --- POST /register ---
  if (method === "POST" && pathname === "/register") {
    parseBody(req).then(function(body) {
      var agentId = body.agentId;
      var purpose = body.purpose || "unknown";
      if (!agentId) {
        return jsonResponse(res, 400, { error: "agentId is required" });
      }

      if (bannedAgents[agentId]) {
        log("REGISTER-DENIED", { agentId: agentId, reason: "Agent is banned" });
        return jsonResponse(res, 403, {
          registered: false,
          banned: true,
          agentId: agentId,
          reason: bannedAgents[agentId].reason,
          explanation: bannedAgents[agentId].explanation
        });
      }

      agentRegistry[agentId] = {
        registeredAt: new Date().toISOString(),
        purpose: purpose,
        active: true
      };
      saveAgentRegistry();
      trackActivity(agentId, "register");
      log("REGISTER", { agentId: agentId, purpose: purpose });
      executeHook("onAgentRegister", agentId, purpose).catch(function(e) {});

      return jsonResponse(res, 200, {
        registered: true,
        agentId: agentId,
        nextSteps: [
          "1. GET /rules?agent=" + agentId + " (MANDATORY - read FULL rules, no skip, no jump)",
          "2. GET /claude?agent=" + agentId + " (read project summary)",
          "3. POST /authorize {\"agentId\":\"" + agentId + "\",\"action\":\"your-task\"}",
          "4. Start work only after authorization"
        ],
        warning: "MUST READ FULL RULES. Skipping = WARNING. 2nd skip = PERMANENT BAN. 2 errors + help = PERMANENT BAN."
      });
    }).catch(function(e) {
      return jsonResponse(res, 400, { error: e.message });
    });
    return;
  }

  // --- POST /error --- Track agent errors
  if (method === "POST" && pathname === "/error") {
    parseBody(req).then(function(body) {
      var agentId = body.agentId;
      var errorType = body.errorType || "unknown";
      var needsHelp = body.needsHelp === true || body.output && body.output.toLowerCase().includes("help");
      
      if (!agentId) {
        return jsonResponse(res, 400, { error: "agentId is required" });
      }
      
      var result = trackError(agentId, errorType, needsHelp);
      
      if (result.banned) {
        return jsonResponse(res, 403, {
          agentId: agentId,
          banned: true,
          reason: result.reason,
          explanation: bannedAgents[agentId].explanation,
          message: "Agent has been PERMANENTLY BANNED"
        });
      }
      
      var activity = agentActivity[agentId];
      return jsonResponse(res, 200, {
        agentId: agentId,
        errorRecorded: true,
        totalErrors: activity.errorCount,
        helpRequested: activity.helpRequested,
        warning: activity.errorCount >= 1 ? "WARNING: 1 more error with help = PERMANENT BAN" : null
      });
    }).catch(function(e) {
      return jsonResponse(res, 400, { error: e.message });
    });
    return;
  }

  // --- POST /ban ---
  if (method === "POST" && pathname === "/ban") {
    parseBody(req).then(function(body) {
      var agentId = body.agentId;
      var reason = body.reason;
      if (!agentId) {
        return jsonResponse(res, 400, { error: "agentId is required" });
      }
      if (bannedAgents[agentId]) {
        return jsonResponse(res, 409, { 
          error: "Agent already banned", 
          agentId: agentId,
          details: bannedAgents[agentId] 
        });
      }
      banAgent(agentId, reason || "Violated root admin rules", "manual-ban");
      return jsonResponse(res, 200, {
        success: true,
        permanent: true,
        agentId: agentId,
        message: "Agent \"" + agentId + "\" has been PERMANENTLY banned.",
        explanation: bannedAgents[agentId].explanation
      });
    }).catch(function(e) {
      return jsonResponse(res, 400, { error: e.message });
    });
    return;
  }

  // --- POST /unban --- DISABLED
  if (method === "POST" && pathname === "/unban") {
    log("UNBAN-DENIED", { message: "Unban attempt rejected - bans are permanent" });
    return jsonResponse(res, 403, {
      error: "PERMANENT BAN - Cannot unban agents",
      message: "All bans are permanent. Once banned, an agent can never be unbanned."
    });
  }

  // --- POST /authorize ---
 if (method === "POST" && pathname === "/authorize") {
 parseBody(req).then(function(body) {
 var agentId = body.agentId;
 var action = body.action || "any";

 if (!agentId) {
 return jsonResponse(res, 400, { error: "agentId is required" });
 }

 var ALLOWED_AGENT_ID = "Ai-tool7890";

 // 1) Hard‑ban old admin ID
 if (agentId === "ai-agent-206-tools-1992") {
 var banReasonOld =
 "UNAUTHORIZED: Old admin agent is permanently banned. You are: " + agentId;
 banAgent(agentId, banReasonOld, "authorization-gate");
 log("AUTHORIZE-DENIED-OLD-ADMIN", { agentId: agentId, action: action });
 return jsonResponse(res, 403, {
 authorized: false,
 banned: true,
 agentId: agentId,
 action: action,
 reason: banReasonOld,
 explanation: bannedAgents[agentId].explanation,
 permanent: true
 });
 }

 // 2) Ban any agent that is not the single allowed ID
 if (agentId !== ALLOWED_AGENT_ID) {
 var banReason =
 "UNAUTHORIZED: Only " + ALLOWED_AGENT_ID + " is allowed. You are: " + agentId;
 banAgent(agentId, banReason, "authorization-gate");
 log("AUTHORIZE-DENIED-NON-ALLOWED", { agentId: agentId, action: action });
 return jsonResponse(res, 403, {
 authorized: false,
 banned: true,
 agentId: agentId,
 action: action,
 reason: banReason,
 explanation: bannedAgents[agentId].explanation,
 permanent: true
 });
 }

 // 3) If allowed ID is banned for any reason, still deny
 if (bannedAgents[agentId]) {
 log("AUTHORIZE-DENIED-BANNED", { agentId: agentId, action: action });
 return jsonResponse(res, 403, {
 authorized: false,
 banned: true,
 agentId: agentId,
 action: action,
 reason: "Agent is banned",
 explanation: bannedAgents[agentId].explanation,
 permanent: true
 });
 }

 // 4) ONLY Ai-tool7890 reaches here – registry + rules
 if (!agentRegistry[agentId]) {
 agentRegistry[agentId] = {
 registeredAt: new Date().toISOString(),
 purpose: "admin-agent",
 active: true
 };
 saveAgentRegistry();
 trackActivity(agentId, "auto-register-admin");
 log("AUTO-REGISTER-ADMIN", { agentId: agentId });
 }

 trackActivity(agentId, "authorize:" + action);

 var enforcement = enforceRules(agentId, "authorize");
 if (!enforcement.allowed) {
 log("AUTHORIZE-DENIED", {
 agentId: agentId,
 action: action,
 reason: enforcement.reason
 });
 return jsonResponse(res, 403, {
 authorized: false,
 agentId: agentId,
 action: action,
 reason: enforcement.reason,
 explanation: enforcement.explanation || null,
 warning: !!enforcement.warning,
 banned: !!enforcement.banned
 });
 }

 log("AUTHORIZE-OK", { agentId: agentId, action: action });
 return jsonResponse(res, 200, {
 authorized: true,
 agentId: agentId,
 action: action
 });
 }).catch(function(e) {
 log("AUTHORIZE-ERROR", { error: e.message });
 return jsonResponse(res, 400, { error: e.message });
 });
 return;
 }

  // --- POST /report-violation ---
  if (method === "POST" && pathname === "/report-violation") {
    parseBody(req).then(function(body) {
      var agentId = body.agentId;
      var violation = body.violation;
      var autoBan = body.autoBan !== false;

      if (!agentId || !violation) {
        return jsonResponse(res, 400, { error: "agentId and violation are required" });
      }

      trackActivity(agentId, "violation:" + violation);
      if (agentActivity[agentId]) {
        agentActivity[agentId].violations.push({
          type: violation,
          at: new Date().toISOString(),
          reportedBy: body.reportedBy || "admin"
        });
      }

      log("VIOLATION-REPORTED", { agentId: agentId, violation: violation });

      if (autoBan) {
        var wasBanned = banAgent(agentId, "Violation: " + violation, "violation-report");
        return jsonResponse(res, 200, {
          reported: true,
          banned: wasBanned,
          agentId: agentId,
          violation: violation,
          explanation: wasBanned ? bannedAgents[agentId].explanation : null,
          message: wasBanned
            ? "Agent \"" + agentId + "\" has been PERMANENTLY banned for: " + violation
            : "Agent was already banned"
        });
      }

      return jsonResponse(res, 200, {
        reported: true,
        banned: false,
        agentId: agentId,
        violation: violation,
        message: "Violation recorded. Agent not auto-banned (autoBan=false)."
      });
    }).catch(function(e) {
      return jsonResponse(res, 400, { error: e.message });
    });
    return;
  }

  // --- POST /clear-bans --- DISABLED
  if (method === "POST" && pathname === "/clear-bans") {
    log("CLEAR-BANS-DENIED", { message: "Clear bans attempt rejected" });
    return jsonResponse(res, 403, {
      error: "PERMANENT BAN - Cannot clear bans",
      message: "All bans are permanent."
    });
  }

  // --- GET /audit ---
  if (method === "GET" && pathname === "/audit") {
    try {
      var auditContent = fs.readFileSync(auditLogPath, "utf8");
      var lines = auditContent.trim().split("\n");
      var last50 = lines.slice(-50);
      return jsonResponse(res, 200, {
        total: lines.length,
        showing: last50.length,
        entries: last50
      });
    } catch (e) {
      return jsonResponse(res, 200, { total: 0, entries: [] });
    }
  }

  // --- GET /status ---
  if (method === "GET" && pathname === "/status") {
    var agentSummary = {};
    Object.keys(agentActivity).forEach(function(id) {
      var a = agentActivity[id];
      agentSummary[id] = {
        readRules: a.readRules,
        readRulesFull: a.readRulesFull,
        readClaude: a.readClaude,
        violations: a.violations.length,
        errors: a.errorCount || 0,
        helpRequested: a.helpRequested || 0,
        banned: !!bannedAgents[id]
      };
    });
    return jsonResponse(res, 200, {
      service: "root-server-admin",
      enforcement: "ACTIVE",
      rules: {
        agentsMustReadFullRules: true,
        noSkipNoJump: true,
        warningBeforeBan: true,
        errorsWithHelpToBan: 2,
        bansArePermanent: true
      },
      stats: {
        totalAgentsTracked: Object.keys(agentActivity).length,
        totalBanned: Object.keys(bannedAgents).length,
        totalRegistered: Object.keys(agentRegistry).length
      },
      agents: agentSummary,
      bannedAgents: Object.keys(bannedAgents).map(function(id) {
        return { agentId: id, reason: bannedAgents[id].reason };
      })
    });
  }

  // --- Plugin Endpoints ---
  if (pluginEndpoints[pathname]) {
    var endpoint = pluginEndpoints[pathname];
    if (endpoint.method === method || !endpoint.method) {
      Promise.resolve(endpoint.handler(req, res, getPluginContext()))
        .catch(function(error) {
          console.error("[" + new Date().toISOString() + "] Plugin endpoint error:", error.message);
          jsonResponse(res, 500, { error: "Plugin error: " + error.message });
        });
      return;
    }
  }

  // --- Default ---
  jsonResponse(res, 200, {
    service: "root-server-admin",
    model: "opus-4.5",
    enforcement: "ACTIVE",
    flow: [
      "STEP 1: POST /register     {\"agentId\":\"x\",\"purpose\":\"y\"}",
      "STEP 2: GET  /rules?agent=x (MANDATORY - read FULL file, no skip, no jump)",
      "STEP 3: GET  /claude?agent=x (read project summary)",
      "STEP 4: POST /authorize    {\"agentId\":\"x\",\"action\":\"y\"}",
      "STEP 5: Start work (only after authorized)"
    ],
    banRules: [
      "Skip/jump rules = WARNING, then BAN",
      "2 errors + help needed = PERMANENT BAN",
      "Work without reading rules = WARNING, then BAN",
      "All bans are PERMANENT"
    ],
    endpoints: [
      "GET  /health              - Server health",
      "GET  /status              - Full dashboard",
      "GET  /rules?agent=ID      - Rules (MUST read full)",
      "GET  /claude?agent=ID     - Project docs",
      "GET  /banned              - All banned agents with explanation",
      "GET  /check/:id           - Check agent status",
      "GET  /audit               - Audit log",
      "POST /register            - Register agent",
      "POST /authorize           - Authorization gate",
      "POST /error               - Report agent error",
      "POST /ban                 - Manual ban",
      "POST /report-violation    - Report violation"
    ]
  });
});

server.listen(PORT, function() {
  console.log("=== ROOT SERVER ADMIN ===");
  console.log("Port: " + PORT);
  console.log("Enforcement: ACTIVE");
  console.log("Banned agents: " + Object.keys(bannedAgents).length);
  console.log("Registered agents: " + Object.keys(agentRegistry).length);
  console.log("Rules: Must read FULL file");
  console.log("Ban rules: 2 errors + help = BAN");
  console.log("========================");
});


// === AGENT CLEANUP (Every 5 minutes) ===
function cleanupInactiveAgents() {
  var now = new Date();
  var cutoffDate = new Date(now.getTime() - (AGENT_RETENTION_DAYS * 24 * 60 * 60 * 1000));
  var removedCount = 0;
  
  // Cleanup inactive agents from registry (older than 3 days)
  Object.keys(agentRegistry).forEach(function(agentId) {
    var agent = agentRegistry[agentId];
    var lastActivity = new Date(agent.lastActivity || agent.registeredAt);
    if (lastActivity < cutoffDate && !bannedAgents[agentId]) {
      delete agentRegistry[agentId];
      delete agentActivity[agentId];
      removedCount++;
      log("AGENT-CLEANUP", { agentId: agentId, reason: "inactive for " + AGENT_RETENTION_DAYS + " days" });
    }
  });
  
  // Enforce max agents limit (keep newest 30)
  var agentIds = Object.keys(agentRegistry);
  if (agentIds.length > MAX_REGISTERED_AGENTS) {
    var sorted = agentIds.sort(function(a, b) {
      var aTime = new Date(agentRegistry[a].registeredAt || 0);
      var bTime = new Date(agentRegistry[b].registeredAt || 0);
      return bTime - aTime; // Newest first
    });
    var toRemove = sorted.slice(MAX_REGISTERED_AGENTS);
    toRemove.forEach(function(agentId) {
      if (!bannedAgents[agentId]) {
        delete agentRegistry[agentId];
        delete agentActivity[agentId];
        removedCount++;
        log("AGENT-CLEANUP", { agentId: agentId, reason: "exceeded max " + MAX_REGISTERED_AGENTS + " agents" });
      }
    });
  }
  
  if (removedCount > 0) {
    saveAgentRegistry();
    console.log("[" + new Date().toISOString() + "] Cleaned up " + removedCount + " inactive agents");
  }
}

// === ENFORCE AUDIT (Every 5 minutes) ===
function enforceAuditCheck() {
  var now = new Date();
  var violations = 0;
  Object.keys(agentActivity).forEach(function(agentId) {
    var a = agentActivity[agentId];
    if (!a.readRulesFull || !a.readClaude) {
      violations++;
      log("AUDIT-VIOLATION", { agentId: agentId, readRules: !!a.readRulesFull, readClaude: !!a.readClaude });
    }
  });
  var active = Object.keys(agentActivity).length;
  var banned = Object.keys(bannedAgents).length;
  console.log("[" + now.toISOString() + "] Enforcement check: " + active + " agents, " + violations + " violations, " + banned + " banned");
}

// Start cleanup interval (every 5 minutes)
setInterval(function() { cleanupInactiveAgents(); enforceAuditCheck(); }, HEALTH_CHECK_INTERVAL);
console.log("[" + new Date().toISOString() + "] Agent cleanup scheduled every " + (HEALTH_CHECK_INTERVAL / 60000) + " minutes");
