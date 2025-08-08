# Oracle Database Setup for Rehabilitation Center

## Quick Start

### Lần Đầu Setup

1. **Khởi động database**:
   ```bash
   ./start-db.sh
   ```

2. **Tạo user database**:
   ```bash
   ./setup-user.sh
   ```

3. **Chạy Spring Boot**:
   ```bash
   cd ../rehabilitation-center-management
   mvn spring-boot:run
   ```

### Hàng Ngày

1. **Khởi động database**:
   ```bash
   ./start-db.sh
   ```

2. **Chạy Spring Boot**:
   ```bash
   cd ../rehabilitation-center-management
   mvn spring-boot:run
   ```

## Scripts Available

- `start-db.sh` - Khởi động Oracle Database
- `stop-db.sh` - Dừng Oracle Database
- `check-db.sh` - Kiểm tra trạng thái database
- `setup-user.sh` - Tạo user database (chỉ cần chạy 1 lần)

## Connection Details

- **Host**: localhost
- **Port**: 1521
- **SID**: XE
- **Username**: rehab_center
- **Password**: RehabCenter123!

## Troubleshooting

### Database không khởi động
```bash
# Kiểm tra logs
docker-compose logs oracle-db

# Restart container
docker-compose restart oracle-db
```

### User không tồn tại
```bash
# Tạo lại user
./setup-user.sh
```

### Reset hoàn toàn
```bash
# Dừng và xóa data
docker-compose down -v

# Khởi động lại
./start-db.sh
./setup-user.sh
``` 