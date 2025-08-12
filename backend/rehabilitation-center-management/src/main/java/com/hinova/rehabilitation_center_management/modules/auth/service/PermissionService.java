package com.hinova.rehabilitation_center_management.modules.auth.service;

import java.util.List;

import com.hinova.rehabilitation_center_management.modules.auth.dto.PermissionDto;

public interface PermissionService {
    PermissionDto create(PermissionDto dto);

    PermissionDto update(String id, PermissionDto dto);

    void delete(String id);

    PermissionDto getById(String id);

    List<PermissionDto> getAll();
}
