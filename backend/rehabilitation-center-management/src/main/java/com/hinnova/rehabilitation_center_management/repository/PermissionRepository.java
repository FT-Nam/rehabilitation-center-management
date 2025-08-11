package com.hinnova.rehabilitation_center_management.repository;

import com.hinnova.rehabilitation_center_management.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {

    Optional<Permission> findByName(String name);

    Boolean existsByName(String name);
}