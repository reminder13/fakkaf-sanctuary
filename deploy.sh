#!/bin/bash

# FAKKAF.COM - MASTER DEPLOYMENT PROTOCOL
# Target: 72.62.43.119

echo "🚀 Initiating Sanctuary Sync..."

# 1. Pull latest code
echo "📦 Pulling latest changes from main..."
git pull origin main

# 2. Build and restart containers
echo "🛠️ Building Encrypted Core & Hardening Containers..."
docker compose up -d --build

# 3. Clean up dangling images
echo "🧹 Pruning legacy artifacts..."
docker image prune -f

# 4. Health Check
echo "🔍 Performing System Integrity Check..."
sleep 5
if docker ps | grep -q "fakkaf-sanctuary"; then
    echo "✅ DEPLOYMENT SUCCESSFUL: Sanctuary is Online at 72.62.43.119"
else
    echo "❌ DEPLOYMENT FAILED: Check logs with 'docker compose logs'"
    exit 1
fi
