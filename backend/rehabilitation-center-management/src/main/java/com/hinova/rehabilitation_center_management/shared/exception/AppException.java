package com.hinova.rehabilitation_center_management.shared.exception;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppException extends RuntimeException {
    ErrorCode errorCode;
}
