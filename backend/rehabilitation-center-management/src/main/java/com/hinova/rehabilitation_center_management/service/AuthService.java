package com.hinova.rehabilitation_center_management.service;

import com.hinova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinova.rehabilitation_center_management.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
