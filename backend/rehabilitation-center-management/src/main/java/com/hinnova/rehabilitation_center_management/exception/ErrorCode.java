package com.hinnova.rehabilitation_center_management.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.NOT_FOUND);

    int code;
    String message;
    HttpStatus httpStatus;
}
