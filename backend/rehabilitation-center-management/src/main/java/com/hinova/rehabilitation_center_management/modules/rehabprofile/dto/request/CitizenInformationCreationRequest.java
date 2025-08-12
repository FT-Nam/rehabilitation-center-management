package com.hinova.rehabilitation_center_management.modules.rehabprofile.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CitizenInformationCreationRequest {
    @NotBlank(message = "Citizen id cannot be blank")
    @Pattern(regexp = "\\d{12}", message = "Citizen id must be exactly 12 digits")
    String citizenId;

    @NotBlank(message = "Full name cannot be blank")
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    String fullName;

    @Size(max = 100, message = "Alias name cannot exceed 100 characters")
    String aliasName;

    @NotNull(message = "Date of birth cannot be null")
    @Past(message = "Date of birth must be in the past")
    LocalDate dateOfBirth;

    @NotBlank(message = "Gender cannot be blank")
    @Pattern(regexp = "Male|Female|Other", message = "Gender must be Male, Female, or Other")
    String gender;

    @Size(max = 200, message = "Place of birth cannot exceed 200 characters")
    String placeOfBirth;

    @Size(max = 200, message = "Birth registration place cannot exceed 200 characters")
    String birthRegistrationPlace;

    @Size(max = 200, message = "Home town cannot exceed 200 characters")
    String homeTown;

    @Size(max = 50, message = "Ethnicity cannot exceed 50 characters")
    String ethnicity;

    @Size(max = 50, message = "Religion cannot exceed 50 characters")
    String religion;

    @Size(max = 50, message = "Nationality cannot exceed 50 characters")
    String nationality;

    @Size(max = 10, message = "Blood type cannot exceed 10 characters")
    String bloodType;

    @NotNull(message = "Citizen ID issue date cannot be null")
    @Past(message = "Citizen ID issue date must be in the past")
    Date citizenIdIssueDate;

    @Size(max = 200, message = "Citizen ID issue place cannot exceed 200 characters")
    String citizenIdIssuePlace;

    @NotNull(message = "Citizen ID expiry date cannot be null")
    @Past(message = "Citizen ID expiry date must be in the past")
    Date citizenIdExpiryDate;

    @Size(max = 200, message = "Permanent address cannot exceed 200 characters")
    String permanentAddress;

    @Size(max = 200, message = "Temporary address cannot exceed 200 characters")
    String temporaryAddress;

    @Size(max = 200, message = "Current address cannot exceed 200 characters")
    String currentAddress;

    @Size(max = 20, message = "Marital status cannot exceed 20 characters")
    String maritalStatus;

    @Size(max = 9, message = "9-digits citizen id cannot exceed 9 characters")
    String oldCitizenId;

}
