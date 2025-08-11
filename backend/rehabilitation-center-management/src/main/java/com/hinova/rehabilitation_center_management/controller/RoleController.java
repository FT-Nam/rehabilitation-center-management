package com.hinova.rehabilitation_center_management.controller;

import com.hinova.rehabilitation_center_management.dto.RoleDto;
import com.hinova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinova.rehabilitation_center_management.service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RoleController {
    RoleService roleService;

    @PostMapping
    ApiResponse<RoleDto> createRole(@RequestBody @Valid RoleDto dto) {
        return ApiResponse.<RoleDto>builder()
                .message("Create role has been successfully")
                .value(roleService.create(dto))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<RoleDto> updateRole(@PathVariable String id, @RequestBody @Valid RoleDto dto) {
        return ApiResponse.<RoleDto>builder()
                .message("Update role has been successfully")
                .value(roleService.update(id, dto))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<RoleDto> getRoleById(@PathVariable String id) {
        return ApiResponse.<RoleDto>builder()
                .value(roleService.getById(id))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoleDto>> getAllRoles() {
        return ApiResponse.<List<RoleDto>>builder()
                .value(roleService.getAll())
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteRole(@PathVariable String id) {
        roleService.delete(id);
        return ApiResponse.<Void>builder()
                .message("Delete role has been successfully")
                .build();
    }
}