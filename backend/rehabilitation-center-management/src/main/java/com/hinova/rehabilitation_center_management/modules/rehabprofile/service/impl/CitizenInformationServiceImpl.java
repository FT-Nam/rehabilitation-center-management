package com.hinova.rehabilitation_center_management.modules.rehabprofile.service.impl;

import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationCreationRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationUpdateRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.response.CitizenInformationResponse;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.entity.CitizenInformation;
import com.hinova.rehabilitation_center_management.shared.exception.AppException;
import com.hinova.rehabilitation_center_management.shared.exception.ErrorCode;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.mapper.CitizenInformationMapper;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.repository.CitizenInformationRepository;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.service.CitizenInformationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CitizenInformationServiceImpl implements CitizenInformationService {
    CitizenInformationRepository citizenInformationRepository;
    CitizenInformationMapper citizenInformationMapper;

    @Override
    public Page<CitizenInformationResponse> getAllCitizenInformation(Pageable pageable) {
        return citizenInformationRepository.findAll(pageable)
                .map(citizenInformationMapper::toCitizenInformationResponse);
    }

    @Override
    public CitizenInformationResponse getCitizenInformation(String citizenId) {
        CitizenInformation citizenInformation = citizenInformationRepository.findById(citizenId)
                .orElseThrow(()-> new AppException(ErrorCode.CITIZEN_NOT_EXISTED));
        return citizenInformationMapper.toCitizenInformationResponse(citizenInformation);
    }

    @Override
    public CitizenInformationResponse createCitizenInformation(CitizenInformationCreationRequest request) {
        CitizenInformation citizenInformation = citizenInformationMapper
                .toCitizenInformation(request);

        return citizenInformationMapper.toCitizenInformationResponse(citizenInformationRepository
                .save(citizenInformation));
    }

    @Override
    public CitizenInformationResponse updateCitizenInformation(String citizenId,
                                                               CitizenInformationUpdateRequest request) {
        CitizenInformation citizenInformation = citizenInformationRepository
                .findById(citizenId).orElseThrow(() -> new AppException(ErrorCode.CITIZEN_NOT_EXISTED));

        citizenInformationMapper.updateCitizenInformation(citizenInformation, request);
        return citizenInformationMapper.toCitizenInformationResponse(citizenInformationRepository
                .save(citizenInformation));
    }


}
