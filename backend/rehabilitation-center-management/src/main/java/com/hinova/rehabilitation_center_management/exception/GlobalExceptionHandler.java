package com.hinova.rehabilitation_center_management.exception;

import com.hinova.rehabilitation_center_management.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    // Bắt lỗi user không tồn tại khi loadUserByUsername
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUsernameNotFound(UsernameNotFoundException exception) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.USER_NOT_FOUND.getCode())
                .message(ErrorCode.USER_NOT_FOUND.getMessage())
                .build();

        return ResponseEntity.status(ErrorCode.USER_NOT_FOUND.getHttpStatus()).body(apiResponse);
    }

    // Bắt lỗi sai tài khoản mật khẩu
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentials(BadCredentialsException exception) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.INVALID_CREDENTIALS.getCode())
                .message(ErrorCode.INVALID_CREDENTIALS.getMessage())
                .build();

        return ResponseEntity.status(ErrorCode.INVALID_CREDENTIALS.getHttpStatus()).body(apiResponse);
    }

    // Bắt các lỗi khác chưa được định nghĩa rõ
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleUnexpectedException(Exception exception) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(ErrorCode.INTERNAL_ERROR.getCode())
                .message(ErrorCode.INTERNAL_ERROR.getMessage())
                .build();

        return ResponseEntity.status(ErrorCode.INTERNAL_ERROR.getHttpStatus()).body(apiResponse);
    }
}
