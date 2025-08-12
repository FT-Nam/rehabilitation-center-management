package com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CitizenInformationResponse {
    String citizenId;
    String fullName;
    String aliasName;
    Date dateOfBirth;
    String gender;
    String placeOfBirth;
    String birthRegistrationPlace;
    String homeTown;
    String ethnicity;
    String religion;
    String nationality;
    String bloodType;
    String citizenIdIssueDate;
    String citizenIdIssuePlace;
    String citizenIdExpiryDate;
    String permanentAddress;
    String temporaryAddress;
    String currentAddress;
    String maritalStatus;
    String oldCitizenId;
    LocalDateTime createdDate;
    LocalDateTime updatedDate;
}
