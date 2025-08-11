package com.hinnova.rehabilitation_center_management.service;

import java.util.List;

import com.hinnova.rehabilitation_center_management.dto.RoleDto;

public interface RoleService {
    RoleDto create(RoleDto dto);

    RoleDto update(String id, RoleDto dto);

    void delete(String id);

    RoleDto getById(String id);

    List<RoleDto> getAll();
}