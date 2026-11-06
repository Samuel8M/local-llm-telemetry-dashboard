#!/bin/bash
# Runs the whole demo from this checkout: the Lab Helper serves the website from this laptop and opens it.
# Press Ctrl+C to stop. Nothing is published anywhere.
cd -- "$(dirname -- "$0")/.." || exit 1
PY="agent/.venv/bin/python"
if [ ! -x "$PY" ]; then
  python3 -m venv agent/.venv && "$PY" -m pip install --quiet -r agent/requirements.txt || { echo "Setup failed: this needs Python 3.11 or newer."; exit 1; }
fi
cd agent && exec ../"$PY" -m telemetry_agent.helper
