#!/bin/bash

# Ngăn bash mở rộng dấu `!` trong mật khẩu
set +H

echo "🔧 Setting up Oracle Database user..."

cd "$(dirname "$0")"

# Kiểm tra container đang chạy
if ! docker ps | grep -q rehab-oracle; then
    echo "❌ Oracle container is not running. Please start it first with ./start-db.sh"
    exit 1
fi

# Tạo user rehab_center
echo "📝 Creating rehab_center user..."

# Dùng '...' để tránh lỗi khi mật khẩu có ký tự đặc biệt như !
docker exec -i rehab-oracle bash -c "sqlplus 'sys/RehabCenter123!@//localhost:1521/XEPDB1 AS SYSDBA'" <<'EOF'
-- Chuyển sang PDB
ALTER SESSION SET CONTAINER = XEPDB1;

-- Drop user nếu tồn tại
BEGIN
   EXECUTE IMMEDIATE 'DROP USER rehab_center CASCADE';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -1918 THEN
         RAISE;
      END IF;
END;
/

-- Tạo user
CREATE USER rehab_center IDENTIFIED BY "RehabCenter123!";

-- Cấp quyền
GRANT CONNECT, RESOURCE TO rehab_center;
GRANT CREATE SESSION TO rehab_center;
GRANT CREATE TABLE TO rehab_center;
GRANT CREATE VIEW TO rehab_center;
GRANT CREATE SEQUENCE TO rehab_center;
GRANT UNLIMITED TABLESPACE TO rehab_center;

-- Kiểm tra user
COLUMN USERNAME FORMAT A20
COLUMN ACCOUNT_STATUS FORMAT A20
SELECT USERNAME, ACCOUNT_STATUS FROM DBA_USERS WHERE USERNAME = 'REHAB_CENTER';

EXIT;
EOF

echo "✅ User setup completed!"
echo ""
echo "🔗 Test connection:"
echo "    docker exec -it rehab-oracle bash -c \"sqlplus 'rehab_center/RehabCenter123!@//localhost:1521/XEPDB1'\""
echo ""

read -n 1 -s -r -p "👉 Press any key to exit..."
echo
