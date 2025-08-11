package com.hinnova.rehabilitation_center_management.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Component
public class PermissionInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    public PermissionInterceptor(JwtUtil jwtUtil, ObjectMapper objectMapper) {
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        RequiredPermission requiredPermission = handlerMethod.getMethodAnnotation(RequiredPermission.class);
        if (requiredPermission == null) {
            return true;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendError(response, HttpStatus.UNAUTHORIZED.value(), "Thiếu hoặc sai token");
            return false;
        }

        String token = authHeader.substring(7);
        List<String> permissions;
        try {
            permissions = jwtUtil.extractPermissions(token);
        } catch (Exception e) {
            sendError(response, HttpStatus.UNAUTHORIZED.value(), "Token không hợp lệ");
            return false;
        }

        if (permissions == null || !permissions.contains(requiredPermission.value())) {
            sendError(response, HttpStatus.FORBIDDEN.value(), "Không đủ quyền truy cập");
            return false;
        }

        return true;
    }

    private void sendError(HttpServletResponse response, int status, String message) throws Exception {
        response.setStatus(status);
        response.setContentType("application/json");
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(status)
                .message(message)
                .build();
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
    }
}
