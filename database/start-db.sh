#!/bin/bash

echo "🚀 Starting Oracle Database..."

# Di chuyển vào thư mục database
cd "$(dirname "$0")"

# Khởi động container
docker-compose up -d

# Đợi database sẵn sàng
echo "⏳ Waiting for database to be ready..."
sleep 30

# Kiểm tra database
echo "🔍 Checking database status..."
docker exec -it rehab-oracle sqlplus sys/RehabCenter123!@//localhost:1521/XE AS SYSDBA <<EOF
SELECT status FROM v\$instance;
EXIT;
EOF

echo "✅ Database is ready!" 