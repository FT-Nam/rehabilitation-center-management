package com.hinnova.rehabilitation_center_management.exception;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppException extends RuntimeException{
    ErrorCode errorCode;
}
