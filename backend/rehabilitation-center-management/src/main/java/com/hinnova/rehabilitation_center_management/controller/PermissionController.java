package com.hinnova.rehabilitation_center_management.controller;

import com.hinnova.rehabilitation_center_management.dto.PermissionDto;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.service.PermissionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PermissionDto>> create(@Valid @RequestBody PermissionDto dto) {
        PermissionDto created = permissionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Permission created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PermissionDto>> update(@PathVariable String id,
            @Valid @RequestBody PermissionDto dto) {
        PermissionDto updated = permissionService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Permission updated successfully", updated));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PermissionDto>> getById(@PathVariable String id) {
        PermissionDto permission = permissionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Permission fetched successfully", permission));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Permissions fetched successfully", permissionService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        permissionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
