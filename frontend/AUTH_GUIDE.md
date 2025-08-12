# Hướng dẫn hệ thống Authentication

## Tổng quan

Hệ thống authentication đã được tích hợp với mock data để có thể test mà không cần backend. Khi backend hoàn thành, chỉ cần thay đổi `USE_MOCK_DATA` trong config.

## Tài khoản demo

### 1. Admin (Quản trị viên)
- **Username:** `admin`
- **Password:** `admin123`
- **Quyền:** Tất cả quyền (read, write, delete, admin)
- **Chức năng:** Quản lý toàn bộ hệ thống, quản lý user

### 2. Manager (Quản lý)
- **Username:** `manager`
- **Password:** `manager123`
- **Quyền:** read, write, delete
- **Chức năng:** Quản lý dữ liệu, không thể quản lý user

### 3. User (Người dùng thường)
- **Username:** `user`
- **Password:** `user123`
- **Quyền:** read, write
- **Chức năng:** Xem và tạo/sửa dữ liệu, không thể xóa

## Cách sử dụng

### 1. Đăng nhập
- Truy cập `/login`
- Nhập username và password
- Hoặc click vào các nút demo để đăng nhập nhanh

### 2. Đăng xuất
- Click vào nút "Đăng xuất" ở header
- Hoặc xóa localStorage và refresh trang

### 3. Bảo vệ route
```jsx
// Bảo vệ route cần authentication
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Bảo vệ route cần quyền cụ thể
<ProtectedRoute requiredPermissions={['admin']}>
  <AdminComponent />
</ProtectedRoute>

// Bảo vệ route cần role cụ thể
<ProtectedRoute requiredRoles={['admin', 'manager']}>
  <ManagerComponent />
</ProtectedRoute>
```

## Cấu trúc dữ liệu

### User Object
```javascript
{
  id: 1,
  username: 'admin',
  password: 'admin123', // Không trả về trong API
  email: 'admin@rehabcenter.com',
  fullName: 'Administrator',
  role: 'admin',
  permissions: ['read', 'write', 'delete', 'admin'],
  avatar: null,
  isActive: true,
  lastLogin: '2023-12-01T10:00:00Z',
  createdAt: '2023-01-01T00:00:00Z'
}
```

### Token
- JWT-like token được lưu trong localStorage
- Tự động refresh khi cần
- Tự động logout khi token hết hạn

## API Endpoints (Mock)

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/logout` - Đăng xuất
- `POST /auth/refresh` - Refresh token
- `POST /auth/change-password` - Đổi mật khẩu

### User Management (Admin only)
- `GET /auth/users` - Lấy danh sách user
- `POST /auth/users` - Tạo user mới
- `PUT /auth/users/:id` - Cập nhật user
- `DELETE /auth/users/:id` - Xóa user

## Chuyển sang Production

### 1. Cập nhật config
```javascript
// src/config/config.js
export const config = {
  USE_MOCK_DATA: false, // Chuyển sang false
  API_BASE_URL: 'https://your-backend-api.com',
  // ... other config
};
```

### 2. Cập nhật authService
- Thay thế mock logic bằng real API calls
- Sử dụng JWT token thật từ backend
- Implement refresh token logic

### 3. Cập nhật API endpoints
- Đảm bảo backend có các endpoint tương ứng
- Cập nhật URL trong authService

## Tính năng bảo mật

### 1. Token Management
- Token được lưu trong localStorage
- Tự động validate token khi load app
- Tự động logout khi token invalid

### 2. Permission System
- Role-based access control
- Permission-based access control
- Automatic redirect khi không có quyền

### 3. Route Protection
- Tất cả route được bảo vệ
- Redirect to login khi chưa đăng nhập
- Redirect to unauthorized khi không có quyền

## Troubleshooting

### 1. Không đăng nhập được
- Kiểm tra username/password
- Kiểm tra console để xem lỗi
- Thử đăng nhập với tài khoản demo

### 2. Không truy cập được trang
- Kiểm tra quyền của user
- Kiểm tra role requirements
- Liên hệ admin để được cấp quyền

### 3. Token expired
- Tự động logout và redirect to login
- Đăng nhập lại để lấy token mới

## Lưu ý

- Đây là hệ thống demo với dữ liệu giả
- Dữ liệu sẽ mất khi refresh trang (trừ user đã login)
- Khi backend hoàn thành, dữ liệu thật sẽ thay thế dữ liệu demo
- Không cần thay đổi frontend code khi chuyển sang production
