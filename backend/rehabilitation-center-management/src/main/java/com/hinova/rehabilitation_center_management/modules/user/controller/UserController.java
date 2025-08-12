package com.hinova.rehabilitation_center_management.modules.user.controller;

import com.hinova.rehabilitation_center_management.modules.user.dto.UserDto;
import com.hinova.rehabilitation_center_management.shared.dto.ApiResponse;
import com.hinova.rehabilitation_center_management.modules.user.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    UserService userService;

    @PreAuthorize("hasAuthority('USER:CREATE')")
    @PostMapping
    ApiResponse<UserDto> createUser(@RequestBody @Valid UserDto userDto) {
        return ApiResponse.<UserDto>builder()
                .message("Create user has been successfully")
                .value(userService.create(userDto))
                .build();
    }

    @PreAuthorize("hasAuthority('USER:READ')")
    @GetMapping
    ApiResponse<List<UserDto>> getAllUsers() {
        return ApiResponse.<List<UserDto>>builder()
                .message("Get users has been successfully")
                .value(userService.getAll())
                .build();
    }

    @PreAuthorize("hasAuthority('USER:READ')")
    @GetMapping("/{id}")
    ApiResponse<UserDto> getUserById(@PathVariable String id) {
        return ApiResponse.<UserDto>builder()
                .value(userService.getById(id))
                .build();
    }

    @PreAuthorize("hasAuthority('USER:UPDATE')")
    @PutMapping("/{id}")
    ApiResponse<UserDto> updateUser(@PathVariable String id, @RequestBody @Valid UserDto userDto) {
        return ApiResponse.<UserDto>builder()
                .message("Update user has been successfully")
                .value(userService.update(id, userDto))
                .build();
    }

    @PreAuthorize("hasAuthority('USER:DELETE')")
    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete user has been successfully")
                .build();
    }
}
