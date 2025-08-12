package com.hinova.rehabilitation_center_management.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record PermissionDto(
        String id,
        @NotBlank(message = "Permission name is required") String name,
        @NotBlank(message = "Module is required") String module,
        @NotBlank(message = "Action is required") String action,
        String description) {
}