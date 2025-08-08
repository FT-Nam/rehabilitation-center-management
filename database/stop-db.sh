#!/bin/bash

echo "🛑 Stopping Oracle Database..."

cd "$(dirname "$0")"
docker-compose down

echo "✅ Database stopped!" 