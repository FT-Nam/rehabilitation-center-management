package com.hinova.rehabilitation_center_management.modules.auth.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import com.hinova.rehabilitation_center_management.modules.auth.dto.PermissionDto;
import com.hinova.rehabilitation_center_management.modules.auth.entity.Permission;
import com.hinova.rehabilitation_center_management.modules.auth.repository.PermissionRepository;
import com.hinova.rehabilitation_center_management.modules.auth.service.PermissionService;

import java.util.List;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    PermissionRepository permissionRepository;

    @Override
    public PermissionDto create(PermissionDto dto) {
        Permission permission = Permission.builder()
                .id(UUID.randomUUID().toString())
                .name(dto.name())
                .module(dto.module())
                .action(dto.action())
                .description(dto.description())
                .build();
        permissionRepository.save(permission);
        return mapToDto(permission);
    }

    @Override
    public PermissionDto update(String id, PermissionDto dto) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found"));
        permission.setName(dto.name());
        permission.setModule(dto.module());
        permission.setAction(dto.action());
        permission.setDescription(dto.description());
        permissionRepository.save(permission);
        return mapToDto(permission);
    }

    @Override
    public void delete(String id) {
        permissionRepository.deleteById(id);
    }

    @Override
    public PermissionDto getById(String id) {
        return permissionRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found"));
    }

    @Override
    public List<PermissionDto> getAll() {
        return permissionRepository.findAll().stream().map(this::mapToDto).toList();
    }

    private PermissionDto mapToDto(Permission p) {
        return new PermissionDto(p.getId(), p.getName(), p.getModule(), p.getAction(), p.getDescription());
    }
}