#!/bin/bash

# AXIS XYZ-SIGMA | MASTER RECOVERY SCRIPT
# Version: 1.3.0-SIGMA
# Purpose: One-shot environment restoration and server launch.

set -e # Exit on error

echo -e "\033[1;35m[SIGMA-MASTER]\033[0m Initializing Axis XYZ-Sigma Recovery Protocol..."

# 1. PORT CLEARANCE
echo -e "\033[1;34m[SIGMA-MASTER]\033[0m Step 1: Force-clearing port 3000..."
sudo fuser -k 3000/tcp 2>/dev/null || true
lsof -t -i:3000 | xargs kill -9 2>/dev/null || true

# 2. DEEP PURGE (Optional but recommended if issues persist)
if [ "$1" == "--deep" ]; then
    echo -e "\033[1;33m[SIGMA-MASTER]\033[0m Performing Deep Purge (node_modules, cache, dist)..."
    rm -rf node_modules package-lock.json .vite dist
fi

# 3. DEPENDENCY CHECK
if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
    echo -e "\033[1;34m[SIGMA-MASTER]\033[0m Environment incomplete. Running fresh installation..."
    npm install --legacy-peer-deps
else
    echo -e "\033[1;32m[SIGMA-MASTER]\033[0m node_modules found. Skipping install (use --deep for full reset)."
fi

# 4. HANDOVER TO INTEGRITY ENGINE
echo -e "\033[1;34m[SIGMA-MASTER]\033[0m Step 3: Launching Integrity Engine..."
# Ensure npx is available and run the TS script
npx tsx scripts/integrity.ts || {
    echo -e "\033[1;31m[SIGMA-MASTER]\033[0m TS Integrity Engine failed. Forcing manual launch..."
    npx vite --host 0.0.0.0 --port 3000 --strictPort --force
}
