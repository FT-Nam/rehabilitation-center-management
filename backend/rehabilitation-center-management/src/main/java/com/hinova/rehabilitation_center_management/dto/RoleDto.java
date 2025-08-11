package com.hinova.rehabilitation_center_management.dto;

import jakarta.validation.constraints.NotBlank;

public record RoleDto(
        String id,
        @NotBlank(message = "Role name is required") String name,
        String description) {
}