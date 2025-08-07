package com.hinnova.rehabilitation_center_management.exception;

import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(exception = AppException.class)
    public ResponseEntity<ApiResponse> handlingAppException(AppException exception){
        ApiResponse apiResponse = ApiResponse.builder()
                .code(exception.errorCode.getCode())
                .message(exception.errorCode.getMessage())
                .build();

        return ResponseEntity.status(exception.errorCode.getHttpStatus()).body(apiResponse);
    }
}
