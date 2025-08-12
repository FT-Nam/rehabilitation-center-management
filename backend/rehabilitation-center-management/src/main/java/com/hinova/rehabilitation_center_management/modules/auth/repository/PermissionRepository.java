package com.hinova.rehabilitation_center_management.modules.auth.repository;

import com.hinova.rehabilitation_center_management.modules.auth.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {

    Optional<Permission> findByName(String name);

    Boolean existsByName(String name);
}