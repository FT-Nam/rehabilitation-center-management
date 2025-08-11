package com.hinnova.rehabilitation_center_management.configuration;

import com.hinnova.rehabilitation_center_management.entity.Permission;
import com.hinnova.rehabilitation_center_management.entity.Role;
import com.hinnova.rehabilitation_center_management.repository.PermissionRepository;
import com.hinnova.rehabilitation_center_management.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PermissionSeeder {

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;

    public PermissionSeeder(PermissionRepository permissionRepository,
            RoleRepository roleRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void seedPermissionsAndRoles() {
        if (permissionRepository.count() == 0 && roleRepository.count() == 0) {
            // 1. Danh sách module
            List<String> modules = Arrays.asList(
                    "HOSO_CAI_NGHIEN",
                    "QUAN_TRANG",
                    "TIEN_LUU_KY",
                    "DIEU_TRI",
                    "GIAO_DUC_TU_VAN",
                    "DAO_TAO_NGHE",
                    "LAO_DONG_TRI_LIEU",
                    "THAM_GAP",
                    "USER",
                    "ROLE",
                    "PERMISSION");

            List<String> actions = Arrays.asList("CREATE", "READ", "UPDATE", "DELETE");

            // 2. Tạo full CRUD permission cho tất cả module
            List<Permission> allPermissions = new ArrayList<>();
            for (String module : modules) {
                for (String action : actions) {
                    allPermissions.add(
                            Permission.builder()
                                    .id(UUID.randomUUID().toString())
                                    .module(module)
                                    .action(action)
                                    .createdBy("SYSTEM")
                                    .name(module + ":" + action)
                                    .description("Quyền " + action + " cho module " + module)
                                    .build());
                }
            }
            permissionRepository.saveAll(allPermissions);

            // 3. Helper để lấy permission theo module & action
            Map<String, Permission> permissionMap = new HashMap<>();
            for (Permission p : allPermissions) {
                permissionMap.put(p.getModule() + ":" + p.getAction(), p);
            }

            // 4. Gán quyền cho từng role theo ma trận
            Role systemAdmin = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("SYSTEM_ADMIN")
                    .description("Quản trị hệ thống, toàn quyền")
                    .createdBy("SYSTEM")
                    .permissions(new HashSet<>(allPermissions))
                    .build();

            Role centerManager = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("CENTER_MANAGER")
                    .description("Quản lý toàn bộ nghiệp vụ trong trung tâm")
                    .createdBy("SYSTEM")
                    .permissions(new HashSet<>(allPermissions))
                    .build();

            Role departmentHead = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("DEPARTMENT_HEAD")
                    .description("Quản lý module phòng ban mình phụ trách")
                    .createdBy("SYSTEM")
                    .permissions(new HashSet<>())
                    .build();

            Role staff = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name("STAFF")
                    .description("Nhân viên nghiệp vụ, quyền giới hạn")
                    .createdBy("SYSTEM")
                    .permissions(new HashSet<>())
                    .build();

            // DEPARTMENT_HEAD → CRU cho tất cả module, trừ ROLE & PERMISSION → chỉ READ
            for (String module : modules) {
                if (module.equals("ROLE") || module.equals("PERMISSION")) {
                    departmentHead.getPermissions().add(permissionMap.get(module + ":READ"));
                } else {
                    departmentHead.getPermissions().add(permissionMap.get(module + ":CREATE"));
                    departmentHead.getPermissions().add(permissionMap.get(module + ":READ"));
                    departmentHead.getPermissions().add(permissionMap.get(module + ":UPDATE"));
                }
            }

            // STAFF → READ cho tất cả module, trừ ROLE & PERMISSION → không có quyền
            for (String module : modules) {
                if (!module.equals("ROLE") && !module.equals("PERMISSION")) {
                    staff.getPermissions().add(permissionMap.get(module + ":READ"));
                }
            }

            // 5. Lưu roles
            roleRepository.saveAll(Arrays.asList(systemAdmin, centerManager, departmentHead, staff));

            System.out.println("✅ Seed dữ liệu Roles & Permissions hoàn tất.");
        }
    }
}
