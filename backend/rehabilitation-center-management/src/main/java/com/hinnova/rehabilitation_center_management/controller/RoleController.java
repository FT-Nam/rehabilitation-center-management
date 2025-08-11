package com.hinnova.rehabilitation_center_management.controller;

import com.hinnova.rehabilitation_center_management.dto.RoleDto;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoleDto>> create(@Valid @RequestBody RoleDto dto) {
        RoleDto created = roleService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Role created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleDto>> update(@PathVariable String id,
            @Valid @RequestBody RoleDto dto) {
        RoleDto updated = roleService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Role updated successfully", updated));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleDto>> getById(@PathVariable String id) {
        RoleDto role = roleService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Role fetched successfully", role));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Roles fetched successfully", roleService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        roleService.delete(id);
        return ResponseEntity.noContent().build(); // 204, không trả body
    }
}