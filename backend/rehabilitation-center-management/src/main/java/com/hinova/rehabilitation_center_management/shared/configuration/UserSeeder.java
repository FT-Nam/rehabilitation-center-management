package com.hinova.rehabilitation_center_management.shared.configuration;

import com.hinova.rehabilitation_center_management.modules.auth.entity.Role;
import com.hinova.rehabilitation_center_management.modules.user.entity.User;
import com.hinova.rehabilitation_center_management.modules.auth.repository.RoleRepository;
import com.hinova.rehabilitation_center_management.modules.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class UserSeeder {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostConstruct
    public void seedUsers() {
        // Seed admin
        if (userRepository.findByUsername("admin").isEmpty()) {
            Optional<Role> adminRole = roleRepository.findByName("SYSTEM_ADMIN");
            adminRole.ifPresent(role -> {
                User admin = User.builder()
                        .id(UUID.randomUUID().toString())
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .email("admin@example.com")
                        .phoneNumber("0900000000")
                        .statusUser("ACTIVE")
                        .description("Administrator account")
                        .createdBy("SYSTEM")
                        .createdAt(Instant.now())
                        .roles(Set.of(role))
                        .build();
                userRepository.save(admin);
            });
        }

        // Seed manager
        if (userRepository.findByUsername("manager").isEmpty()) {
            Optional<Role> managerRole = roleRepository.findByName("CENTER_MANAGER");
            managerRole.ifPresent(role -> {
                User manager = User.builder()
                        .id(UUID.randomUUID().toString())
                        .username("manager")
                        .password(passwordEncoder.encode("manager123"))
                        .email("manager@example.com")
                        .phoneNumber("0911111111")
                        .statusUser("ACTIVE")
                        .description("Center manager account")
                        .createdBy("SYSTEM")
                        .createdAt(Instant.now())
                        .roles(Set.of(role))
                        .build();
                userRepository.save(manager);
            });
        }
    }
}
