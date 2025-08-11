package com.hinnova.rehabilitation_center_management.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // User-related errors
    USER_NOT_FOUND(1001, "User not found", HttpStatus.NOT_FOUND),
    USERNAME_EXISTS(1002, "Username already exists", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTS(1003, "Email already exists", HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1004, "Invalid username or password", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1005, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    CITIZEN_NOT_EXISTED(1006, "Citizen not existed", HttpStatus.NOT_FOUND),
  
    // Permission-related errors
    PERMISSION_DENIED(2001, "Permission denied", HttpStatus.FORBIDDEN),

    // Token-related errors
    INVALID_TOKEN(3001, "Invalid token", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(3002, "Token expired", HttpStatus.UNAUTHORIZED),

    // Generic errors
    INTERNAL_ERROR(9000, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);

    private final int code;
    private final String message;
    private final HttpStatus httpStatus;
}
