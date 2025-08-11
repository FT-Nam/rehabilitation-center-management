package com.hinova.rehabilitation_center_management.mapper;

import com.hinova.rehabilitation_center_management.dto.request.CitizenInformationCreationRequest;
import com.hinova.rehabilitation_center_management.dto.request.CitizenInformationUpdateRequest;
import com.hinova.rehabilitation_center_management.dto.response.CitizenInformationResponse;
import com.hinova.rehabilitation_center_management.entity.CitizenInformation;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CitizenInformationMapper {
    CitizenInformation toCitizenInformation(CitizenInformationCreationRequest citizenInformationCreationRequest);

    CitizenInformationResponse toCitizenInformationResponse(CitizenInformation citizenInformation);

    void updateCitizenInformation(@MappingTarget CitizenInformation citizenInformation,
                                  CitizenInformationUpdateRequest citizenInformationUpdateRequest);
}
