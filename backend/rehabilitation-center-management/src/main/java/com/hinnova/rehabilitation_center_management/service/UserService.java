package com.hinnova.rehabilitation_center_management.service;

import java.util.List;

import com.hinnova.rehabilitation_center_management.dto.UserDto;

public interface UserService {
    UserDto create(UserDto dto);

    UserDto update(String id, UserDto dto);

    void delete(String id);

    UserDto getById(String id);

    List<UserDto> getAll();
}