package com.hinnova.rehabilitation_center_management.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // User-related errors
    USER_NOT_FOUND(1001, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    USERNAME_EXISTS(1002, "Tên đăng nhập đã tồn tại", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTS(1003, "Email đã tồn tại", HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1004, "Sai tài khoản hoặc mật khẩu", HttpStatus.UNAUTHORIZED),

    // Permission-related errors
    PERMISSION_DENIED(2001, "Không có quyền truy cập", HttpStatus.FORBIDDEN),

    // Token-related errors
    INVALID_TOKEN(3001, "Token không hợp lệ", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(3002, "Token đã hết hạn", HttpStatus.UNAUTHORIZED),

    // Generic errors
    INTERNAL_ERROR(9000, "Lỗi hệ thống", HttpStatus.INTERNAL_SERVER_ERROR);

    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
