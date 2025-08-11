package com.hinnova.rehabilitation_center_management.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hinnova.rehabilitation_center_management.security.PermissionInterceptor;
import com.hinnova.rehabilitation_center_management.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PermissionInterceptorConfig implements WebMvcConfigurer {

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    public PermissionInterceptorConfig(JwtUtil jwtUtil, ObjectMapper objectMapper) {
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
    }

    @Bean
    public PermissionInterceptor permissionInterceptor() {
        return new PermissionInterceptor(jwtUtil, objectMapper);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] whiteList = {
                "/", "/api/auth/**"
        };

        registry.addInterceptor(permissionInterceptor())
                .excludePathPatterns(whiteList);
    }
}
