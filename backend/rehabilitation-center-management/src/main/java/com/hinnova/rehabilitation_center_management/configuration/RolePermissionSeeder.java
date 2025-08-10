package com.hinnova.rehabilitation_center_management.configuration;

import com.hinnova.rehabilitation_center_management.entity.Permission;
import com.hinnova.rehabilitation_center_management.entity.Role;
import com.hinnova.rehabilitation_center_management.repository.PermissionRepository;
import com.hinnova.rehabilitation_center_management.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RolePermissionSeeder {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public RolePermissionSeeder(RoleRepository roleRepository,
            PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    @PostConstruct
    public void seedData() {
        if (roleRepository.count() == 0 && permissionRepository.count() == 0) {
            // 1. Danh sách permissions
            List<Permission> permissions = Arrays.asList(
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("View Users").module("USER").action("READ").description("Xem danh sách người dùng")
                            .build(),
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("Create User").module("USER").action("CREATE").description("Tạo người dùng mới")
                            .build(),
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("Update User").module("USER").action("UPDATE").description("Cập nhật người dùng")
                            .build(),
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("Delete User").module("USER").action("DELETE").description("Xoá người dùng").build(),

                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("View Roles").module("ROLE").action("READ").description("Xem danh sách vai trò")
                            .build(),
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("Manage Roles").module("ROLE").action("MANAGE").description("Quản lý vai trò")
                            .build(),

                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("View Permissions").module("PERMISSION").action("READ")
                            .description("Xem danh sách quyền").build(),
                    Permission.builder().id(UUID.randomUUID().toString())
                            .name("Manage Permissions").module("PERMISSION").action("MANAGE")
                            .description("Quản lý quyền").build());

            permissionRepository.saveAll(permissions);

            // 2. Danh sách roles
            Role systemAdmin = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("SYSTEM_ADMIN")
                    .description("Quản trị hệ thống, toàn quyền")
                    .permissions(new HashSet<>(permissions)) // full quyền
                    .build();

            Role centerManager = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("CENTER_MANAGER")
                    .description("Quản lý toàn bộ nghiệp vụ trong trung tâm")
                    .permissions(new HashSet<>(permissions)) // cũng có full quyền
                    .build();

            Role departmentHead = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("DEPARTMENT_HEAD")
                    .description("Quản lý module phòng ban phụ trách")
                    .permissions(new HashSet<>(Arrays.asList(
                            permissions.get(0), // View Users
                            permissions.get(2), // Update User
                            permissions.get(4) // View Roles
                    )))
                    .build();

            Role staff = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("STAFF")
                    .description("Nhân viên nghiệp vụ, quyền giới hạn")
                    .permissions(new HashSet<>(Collections.singletonList(
                            permissions.get(0) // View Users
                    )))
                    .build();

            roleRepository.saveAll(Arrays.asList(systemAdmin, centerManager, departmentHead, staff));

            System.out.println("✅ Seed data Roles & Permissions completed.");
        }
    }
}
