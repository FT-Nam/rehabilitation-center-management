package com.hinova.rehabilitation_center_management.modules.rehabprofile.service;

import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationCreationRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationUpdateRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.response.CitizenInformationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CitizenInformationService {
    Page<CitizenInformationResponse> getAllCitizenInformation(Pageable pageable);

    CitizenInformationResponse getCitizenInformation(String citizenId);

    CitizenInformationResponse createCitizenInformation(CitizenInformationCreationRequest request);

    CitizenInformationResponse updateCitizenInformation(String citizenId, CitizenInformationUpdateRequest request);
}
