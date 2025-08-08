#!/bin/bash

echo "🔍 Checking Oracle Database status..."

cd "$(dirname "$0")"

# Kiểm tra container
if docker ps | grep -q rehab-oracle; then
    echo "✅ Container is running"
    
    # Kiểm tra database
    docker exec -it rehab-oracle sqlplus sys/RehabCenter123!@//localhost:1521/XE AS SYSDBA <<EOF
    SELECT status FROM v\$instance;
    EXIT;
EOF
else
    echo "❌ Container is not running"
fi 