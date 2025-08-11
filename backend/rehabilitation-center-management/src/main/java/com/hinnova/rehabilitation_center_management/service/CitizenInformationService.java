package com.hinnova.rehabilitation_center_management.service;

import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationCreationRequest;
import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationUpdateRequest;
import com.hinnova.rehabilitation_center_management.dto.response.CitizenInformationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CitizenInformationService {
    Page<CitizenInformationResponse> getAllCitizenInformation(Pageable pageable);

    CitizenInformationResponse getCitizenInformation(String citizenId);

    CitizenInformationResponse createCitizenInformation(CitizenInformationCreationRequest request);

    CitizenInformationResponse updateCitizenInformation(String citizenId, CitizenInformationUpdateRequest request);
}
