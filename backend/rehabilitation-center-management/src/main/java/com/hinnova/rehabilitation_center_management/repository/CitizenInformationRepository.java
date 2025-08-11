package com.hinnova.rehabilitation_center_management.repository;

import com.hinnova.rehabilitation_center_management.entity.CitizenInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CitizenInformationRepository extends JpaRepository<CitizenInformation, String> {
}
