package com.hinova.rehabilitation_center_management.repository;

import com.hinova.rehabilitation_center_management.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    Optional<Role> findByName(String name);

    boolean existsByName(String name);

    @Query("SELECT COUNT(u) > 0 FROM User u JOIN u.roles r WHERE r.id = :roleId AND u.statusUser = 'ACTIVE'")
    boolean hasActiveUsers(@Param("roleId") String roleId);

}