package com.hinova.rehabilitation_center_management.modules.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permission {

    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name; // e.g. INMATE_MANAGEMENT_READ

    @Column(name = "module", nullable = false, length = 100)
    private String module; // e.g. INMATE_MANAGEMENT

    @Column(name = "action", nullable = false, length = 50)
    private String action; // READ, CREATE, UPDATE, DELETE, EXPORT

    @Column(name = "description", length = 255)
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "created_by", nullable = false, length = 255)
    private String createdBy = "SYSTEM";

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @PrePersist
    public void prePersist() {
        if (this.id == null || this.id.isBlank()) {
            this.id = UUID.randomUUID().toString();
        }
    }
}