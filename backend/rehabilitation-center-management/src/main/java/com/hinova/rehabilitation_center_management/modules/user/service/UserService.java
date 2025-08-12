package com.hinova.rehabilitation_center_management.modules.user.service;

import java.util.List;

import com.hinova.rehabilitation_center_management.modules.user.dto.UserDto;

public interface UserService {
    UserDto create(UserDto dto);

    UserDto update(String id, UserDto dto);

    void delete(String id);

    UserDto getById(String id);

    List<UserDto> getAll();
}