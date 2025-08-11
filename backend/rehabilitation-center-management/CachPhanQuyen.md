POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}

Trả về :

{
  "code": 200,
  "message": "Đăng nhập thành công",
  "value": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "admin",
    "permissions": [
      "HOSO_CAI_NGHIEN:CREATE",
      "HOSO_CAI_NGHIEN:READ",
      ...
    ]
  }
}



@RequiredPermission("HOSO_CAI_NGHIEN:CREATE")
@PostMapping("/hoso")
public ResponseEntity<ApiResponse<?>> createHoso(@RequestBody HosoRequest request) {
    return ResponseEntity.ok(ApiResponse.success("Tạo hồ sơ thành công"));
}


admin → full quyền → test được tất cả API.
manager → full quyền như admin.
head → chỉ được READ và UPDATE → test API CREATE hoặc DELETE sẽ bị 403.
staff → chỉ được READ → test API CREATE, UPDATE, DELETE sẽ bị 403.

Mỗi lần gọi API cần truyền header:
Authorization: Bearer {token}