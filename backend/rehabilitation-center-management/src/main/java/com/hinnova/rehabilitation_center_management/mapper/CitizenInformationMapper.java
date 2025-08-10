package com.hinnova.rehabilitation_center_management.mapper;

import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationCreationRequest;
import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationUpdateRequest;
import com.hinnova.rehabilitation_center_management.dto.response.CitizenInformationResponse;
import com.hinnova.rehabilitation_center_management.entity.CitizenInformation;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CitizenInformationMapper {
    CitizenInformation toCitizenInformation(CitizenInformationCreationRequest citizenInformationCreationRequest);

    CitizenInformationResponse toCitizenInformationResponse(CitizenInformation citizenInformation);

    void updateCitizenInformation(@MappingTarget CitizenInformation citizenInformation,
                                  CitizenInformationUpdateRequest citizenInformationUpdateRequest);
}
