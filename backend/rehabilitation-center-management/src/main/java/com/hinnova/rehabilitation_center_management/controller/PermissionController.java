package com.hinnova.rehabilitation_center_management.controller;

import com.hinnova.rehabilitation_center_management.dto.PermissionDto;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.service.PermissionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/permissions")
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionDto> createPermission(@RequestBody @Valid PermissionDto dto) {
        return ApiResponse.<PermissionDto>builder()
                .message("Create permission has been successfully")
                .value(permissionService.create(dto))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<PermissionDto> updatePermission(@PathVariable String id, @RequestBody @Valid PermissionDto dto) {
        return ApiResponse.<PermissionDto>builder()
                .message("Update permission has been successfully")
                .value(permissionService.update(id, dto))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<PermissionDto> getPermissionById(@PathVariable String id) {
        return ApiResponse.<PermissionDto>builder()
                .value(permissionService.getById(id))
                .build();
    }

    @GetMapping
    ApiResponse<List<PermissionDto>> getAllPermissions() {
        return ApiResponse.<List<PermissionDto>>builder()
                .value(permissionService.getAll())
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deletePermission(@PathVariable String id) {
        permissionService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete permission has been successfully")
                .build();
    }
}
