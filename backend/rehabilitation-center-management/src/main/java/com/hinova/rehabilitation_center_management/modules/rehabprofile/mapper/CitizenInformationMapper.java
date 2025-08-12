package com.hinova.rehabilitation_center_management.modules.rehabprofile.mapper;

import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationCreationRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request.CitizenInformationUpdateRequest;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.response.CitizenInformationResponse;
import com.hinova.rehabilitation_center_management.modules.rehabprofile.entity.CitizenInformation;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CitizenInformationMapper {
    CitizenInformation toCitizenInformation(CitizenInformationCreationRequest citizenInformationCreationRequest);

    CitizenInformationResponse toCitizenInformationResponse(CitizenInformation citizenInformation);

    void updateCitizenInformation(@MappingTarget CitizenInformation citizenInformation,
                                  CitizenInformationUpdateRequest citizenInformationUpdateRequest);
}
