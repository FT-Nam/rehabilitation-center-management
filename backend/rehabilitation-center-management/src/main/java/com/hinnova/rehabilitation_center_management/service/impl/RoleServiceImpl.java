package com.hinnova.rehabilitation_center_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hinnova.rehabilitation_center_management.dto.RoleDto;
import com.hinnova.rehabilitation_center_management.entity.Role;
import com.hinnova.rehabilitation_center_management.repository.RoleRepository;
import com.hinnova.rehabilitation_center_management.service.RoleService;

import java.util.List;
import java.util.UUID;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public RoleDto create(RoleDto dto) {
        Role role = Role.builder()
                .id(UUID.randomUUID().toString())
                .name(dto.name())
                .description(dto.description())
                .build();
        roleRepository.save(role);
        return mapToDto(role);
    }

    @Override
    public RoleDto update(String id, RoleDto dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        role.setName(dto.name());
        role.setDescription(dto.description());
        roleRepository.save(role);
        return mapToDto(role);
    }

    @Override
    public void delete(String id) {
        roleRepository.deleteById(id);
    }

    @Override
    public RoleDto getById(String id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        return mapToDto(role);
    }

    @Override
    public List<RoleDto> getAll() {
        return roleRepository.findAll().stream().map(this::mapToDto).toList();
    }

    private RoleDto mapToDto(Role role) {
        return new RoleDto(role.getId(), role.getName(), role.getDescription());
    }
}