package com.hinova.rehabilitation_center_management.modules.rehabprofile.repository;

import com.hinova.rehabilitation_center_management.modules.rehabprofile.entity.CitizenInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitizenInformationRepository extends JpaRepository<CitizenInformation, String> {
}
