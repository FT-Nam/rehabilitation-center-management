package com.hinnova.rehabilitation_center_management.service.impl;

import com.hinnova.rehabilitation_center_management.dto.request.LoginRequest;
import com.hinnova.rehabilitation_center_management.dto.response.LoginResponse;
import com.hinnova.rehabilitation_center_management.entity.Permission;
import com.hinnova.rehabilitation_center_management.entity.Role;
import com.hinnova.rehabilitation_center_management.entity.User;
import com.hinnova.rehabilitation_center_management.exception.AppException;
import com.hinnova.rehabilitation_center_management.exception.ErrorCode;
import com.hinnova.rehabilitation_center_management.repository.UserRepository;
import com.hinnova.rehabilitation_center_management.service.AuthService;
import com.hinnova.rehabilitation_center_management.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

        private final AuthenticationManager authenticationManager;
        private final UserRepository userRepository;
        private final JwtUtil jwtUtil;

        public AuthServiceImpl(
                        AuthenticationManager authenticationManager,
                        UserRepository userRepository,
                        JwtUtil jwtUtil) {
                this.authenticationManager = authenticationManager;
                this.userRepository = userRepository;
                this.jwtUtil = jwtUtil;
        }

        @Override
        public LoginResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

                User user = userRepository.findByUsername(request.username())
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

                List<String> roles = user.getRoles().stream()
                                .map(Role::getName)
                                .distinct()
                                .toList();

                List<String> permissions = user.getRoles().stream()
                                .flatMap(role -> role.getPermissions().stream())
                                .map(Permission::getName)
                                .distinct()
                                .toList();

                String token = jwtUtil.generateToken(user.getUsername(), roles, permissions);

                return new LoginResponse(token, user.getUsername(), roles, permissions);
        }
}
