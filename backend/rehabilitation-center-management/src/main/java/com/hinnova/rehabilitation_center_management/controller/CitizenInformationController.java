package com.hinnova.rehabilitation_center_management.controller;

import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationCreationRequest;
import com.hinnova.rehabilitation_center_management.dto.request.CitizenInformationUpdateRequest;
import com.hinnova.rehabilitation_center_management.dto.response.ApiResponse;
import com.hinnova.rehabilitation_center_management.dto.response.CitizenInformationResponse;
import com.hinnova.rehabilitation_center_management.dto.response.PaginationInfo;
import com.hinnova.rehabilitation_center_management.service.impl.CitizenInformationServiceImpl;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/citizens")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CitizenInformationController {
    CitizenInformationServiceImpl citizenInformationService;

    @PostMapping
    ApiResponse<CitizenInformationResponse> createCitizenInformation(@RequestBody @Valid
                                                                     CitizenInformationCreationRequest request){
        return ApiResponse.<CitizenInformationResponse>builder()
                .message("Create citizen information has been successfully")
                .value(citizenInformationService.createCitizenInformation(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CitizenInformationResponse>> getAllCitizenInformation(Pageable pageable){
        Page<CitizenInformationResponse> userResponses = citizenInformationService.getAllCitizenInformation(pageable);
        return ApiResponse.<List<CitizenInformationResponse>>builder()
                .value(userResponses.getContent())
                .paginationInfo(PaginationInfo.builder()
                        .page(userResponses.getNumber())
                        .size(userResponses.getSize())
                        .totalElements(userResponses.getTotalElements())
                        .build())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<CitizenInformationResponse> getCitizenInformation(@PathVariable String id){
        return ApiResponse.<CitizenInformationResponse>builder()
                .value(citizenInformationService.getCitizenInformation(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<CitizenInformationResponse> updateCitizenInformation(@PathVariable String id,
                                                       @RequestBody @Valid CitizenInformationUpdateRequest request){
        return ApiResponse.<CitizenInformationResponse>builder()
                .message("Update citizen information has been successfully")
                .value(citizenInformationService.updateCitizenInformation(id,request))
                .build();
    }
}
