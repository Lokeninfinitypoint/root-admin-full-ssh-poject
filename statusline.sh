#!/bin/bash
# Root Agent Statusline - Rules Reminder Only
WARN_FILE="/root/root-agent/data/agent-warnings.json"
STATUS="OK"
WARNINGS=0
VIOLATION=""
if [ -f "$WARN_FILE" ]; then
  STATUS=$(python3 -c "import json; print(json.load(open('$WARN_FILE'))['status'])" 2>/dev/null)
  WARNINGS=$(python3 -c "import json; print(json.load(open('$WARN_FILE'))['warnings'])" 2>/dev/null)
  VIOLATION=$(python3 -c "import json; print(json.load(open('$WARN_FILE'))['lastViolation'])" 2>/dev/null)
fi
if [ "$STATUS" = "BANNED" ]; then
  echo "🚫 BANNED Ai-tool7890 | $VIOLATION"
elif [ "$STATUS" = "WARNING" ]; then
  echo "⚠️  WARNING($WARNINGS/2) Ai-tool7890 | $VIOLATION | Next=BAN"
else
  echo "✅ Ai-tool7890 | rules.md FIRST | No skip=BAN | Verify work"
fi
