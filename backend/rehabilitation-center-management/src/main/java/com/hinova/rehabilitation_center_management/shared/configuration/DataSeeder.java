package com.hinova.rehabilitation_center_management.shared.configuration;

import com.hinova.rehabilitation_center_management.modules.auth.entity.Permission;
import com.hinova.rehabilitation_center_management.modules.auth.entity.Role;
import com.hinova.rehabilitation_center_management.modules.user.entity.User;
import com.hinova.rehabilitation_center_management.modules.auth.repository.PermissionRepository;
import com.hinova.rehabilitation_center_management.modules.auth.repository.RoleRepository;
import com.hinova.rehabilitation_center_management.modules.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(RoleRepository roleRepository,
            PermissionRepository permissionRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            seedRolesAndPermissions();
        }
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedRolesAndPermissions() {
        String[] modules = {
                "HOSO_CAI_NGHIEN", "QUAN_TRANG", "TIEN_LUU_KY",
                "DIEU_TRI_CAI_NGHIEN", "GIAO_DUC_TU_VAN", "DAO_TAO_NGHE",
                "LAO_DONG_TRI_LIEU", "THAM_GAP", "NHAN_SU", "BAO_CAO", "CAI_DAT"
        };
        String[] actions = { "CREATE", "READ", "UPDATE", "DELETE" };

        // Tạo permissions nếu chưa tồn tại
        for (String module : modules) {
            for (String action : actions) {
                String permissionName = module + ":" + action;
                if (!permissionRepository.existsByName(permissionName)) {
                    permissionRepository.save(Permission.builder()
                            .id(UUID.randomUUID().toString())
                            .name(permissionName)
                            .module(module)
                            .action(action)
                            .createdBy("SYSTEM")
                            .build());
                }
            }
        }

        List<Permission> allPermissions = permissionRepository.findAll();

        // Tạo roles nếu chưa tồn tại
        createRoleIfNotExists("SYSTEM_ADMIN", Set.copyOf(allPermissions));
        createRoleIfNotExists("CENTER_MANAGER", Set.copyOf(allPermissions));

        createRoleIfNotExists("DEPARTMENT_HEAD",
                allPermissions.stream()
                        .filter(p -> p.getName().endsWith(":READ") || p.getName().endsWith(":UPDATE"))
                        .collect(java.util.stream.Collectors.toSet()));

        createRoleIfNotExists("STAFF",
                allPermissions.stream()
                        .filter(p -> p.getName().endsWith(":READ"))
                        .collect(java.util.stream.Collectors.toSet()));
    }

    private void createRoleIfNotExists(String roleName, Set<Permission> permissions) {
        if (!roleRepository.findByName(roleName).isPresent()) {
            Role role = Role.builder()
                    .id(UUID.randomUUID().toString())
                    .name(roleName)
                    .permissions(permissions)
                    .build();
            roleRepository.save(role);
        }
    }

    private void seedUsers() {
        if (userRepository.existsByUsername("admin") &&
                userRepository.existsByUsername("manager") &&
                userRepository.existsByUsername("head") &&
                userRepository.existsByUsername("staff")) {
            return; // Đã có user rồi, không tạo nữa
        }

        Role systemAdmin = roleRepository.findByName("SYSTEM_ADMIN").orElseThrow();
        Role centerManager = roleRepository.findByName("CENTER_MANAGER").orElseThrow();
        Role departmentHead = roleRepository.findByName("DEPARTMENT_HEAD").orElseThrow();
        Role staff = roleRepository.findByName("STAFF").orElseThrow();

        createUserIfNotExists("admin", "admin@example.com", "System Admin", "123456", Set.of(systemAdmin));
        createUserIfNotExists("manager", "manager@example.com", "Center Manager", "123456", Set.of(centerManager));
        createUserIfNotExists("head", "head@example.com", "Department Head", "123456", Set.of(departmentHead));
        createUserIfNotExists("staff", "staff@example.com", "Staff User", "123456", Set.of(staff));
    }

    private void createUserIfNotExists(String username, String email, String fullName, String password,
            Set<Role> roles) {
        if (!userRepository.existsByUsername(username)) {
            userRepository.save(User.builder()
                    .id(UUID.randomUUID().toString())
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .email(email)
                    .fullName(fullName)
                    .roles(roles)
                    .build());
        }
    }
}
