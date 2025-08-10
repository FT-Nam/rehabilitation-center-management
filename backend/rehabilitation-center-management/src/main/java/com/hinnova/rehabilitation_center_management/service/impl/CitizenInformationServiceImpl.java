package com.hinnova.rehabilitation_center_management.service.impl;

import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationCreationRequest;
import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationUpdateRequest;
import com.hinnova.rehabilitation_center_management.dto.response.CitizenInformationResponse;
import com.hinnova.rehabilitation_center_management.entity.CitizenInformation;
import com.hinnova.rehabilitation_center_management.exception.AppException;
import com.hinnova.rehabilitation_center_management.exception.ErrorCode;
import com.hinnova.rehabilitation_center_management.mapper.CitizenInformationMapper;
import com.hinnova.rehabilitation_center_management.repository.CitizenInformationRepository;
import com.hinnova.rehabilitation_center_management.service.CitizenInformationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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
