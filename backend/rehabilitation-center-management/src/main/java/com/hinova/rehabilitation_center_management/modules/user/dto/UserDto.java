package com.hinova.rehabilitation_center_management.modules.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

public record UserDto(
        String id,
        @NotBlank(message = "Username is required") String username,
        String fullName,
        @Email(message = "Invalid email") String email,
        String phoneNumber,
        String description,
        String statusUser,
        Set<String> roleIds) {
}