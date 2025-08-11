package com.hinova.rehabilitation_center_management.controller;

import com.hinova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinova.rehabilitation_center_management.dto.response.LoginResponse;
import com.hinova.rehabilitation_center_management.service.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return ApiResponse.<LoginResponse>builder()
                .message("Login has been successfully")
                .value(authService.login(request))
                .build();
    }
}
