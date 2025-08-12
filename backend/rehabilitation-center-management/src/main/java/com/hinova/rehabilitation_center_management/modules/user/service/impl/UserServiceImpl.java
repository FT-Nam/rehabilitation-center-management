package com.hinova.rehabilitation_center_management.modules.user.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import com.hinova.rehabilitation_center_management.modules.user.dto.UserDto;
import com.hinova.rehabilitation_center_management.modules.auth.entity.Role;
import com.hinova.rehabilitation_center_management.modules.user.entity.User;
import com.hinova.rehabilitation_center_management.modules.auth.repository.RoleRepository;
import com.hinova.rehabilitation_center_management.modules.user.repository.UserRepository;
import com.hinova.rehabilitation_center_management.modules.user.service.UserService;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;


    @Override
    public UserDto create(UserDto dto) {
        Set<Role> roles = roleRepository.findAllById(dto.roleIds())
                .stream().collect(Collectors.toSet());

        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .username(dto.username())
                .fullName(dto.fullName())
                .email(dto.email())
                .phoneNumber(dto.phoneNumber())
                .description(dto.description())
                .statusUser(dto.statusUser())
                .roles(roles)
                .build();
        userRepository.save(user);
        return mapToDto(user);
    }

    @Override
    public UserDto update(String id, UserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Set<Role> roles = roleRepository.findAllById(dto.roleIds())
                .stream().collect(Collectors.toSet());

        user.setUsername(dto.username());
        user.setFullName(dto.fullName());
        user.setEmail(dto.email());
        user.setPhoneNumber(dto.phoneNumber());
        user.setDescription(dto.description());
        user.setStatusUser(dto.statusUser());
        user.setRoles(roles);

        userRepository.save(user);
        return mapToDto(user);
    }

    @Override
    public void delete(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDto getById(String id) {
        return userRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Override
    public List<UserDto> getAll() {
        return userRepository.findAll().stream().map(this::mapToDto).toList();
    }

    private UserDto mapToDto(User u) {
        Set<String> roleIds = u.getRoles() != null
                ? u.getRoles().stream().map(Role::getId).collect(Collectors.toSet())
                : Set.of();

        return new UserDto(
                u.getId(),
                u.getUsername(),
                u.getFullName(),
                u.getEmail(),
                u.getPhoneNumber(),
                u.getDescription(),
                u.getStatusUser(),
                roleIds);
    }
}