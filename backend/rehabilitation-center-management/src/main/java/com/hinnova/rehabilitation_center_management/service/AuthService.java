package com.hinnova.rehabilitation_center_management.service;

import com.hinnova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinnova.rehabilitation_center_management.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
