package com.hinova.rehabilitation_center_management.modules.auth.service;

import com.hinova.rehabilitation_center_management.modules.auth.dto.request.LoginRequest;
import com.hinova.rehabilitation_center_management.modules.auth.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
