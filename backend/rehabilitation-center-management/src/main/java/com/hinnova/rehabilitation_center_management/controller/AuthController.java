package com.hinnova.rehabilitation_center_management.controller;

import com.hinnova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.dto.response.LoginResponse;
import com.hinnova.rehabilitation_center_management.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.<LoginResponse>builder()
                        .code(200)
                        .message("Đăng nhập thành công")
                        .value(response)
                        .build());
    }
}
