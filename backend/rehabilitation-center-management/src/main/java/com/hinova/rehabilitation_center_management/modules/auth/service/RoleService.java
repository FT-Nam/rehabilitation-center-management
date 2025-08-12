package com.hinova.rehabilitation_center_management.modules.auth.service;

import java.util.List;

import com.hinova.rehabilitation_center_management.modules.auth.dto.RoleDto;

public interface RoleService {
    RoleDto create(RoleDto dto);

    RoleDto update(String id, RoleDto dto);

    void delete(String id);

    RoleDto getById(String id);

    List<RoleDto> getAll();
}